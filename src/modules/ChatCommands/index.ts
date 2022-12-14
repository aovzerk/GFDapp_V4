/* eslint-disable @typescript-eslint/no-explicit-any */
import { Message } from "discord.js";
import { ExtendClient } from "../../Client";
import { BaseModule, IBaseModule } from "../BaseModule";
import importFresh from "import-fresh";
import fs from "fs";
import { BaseCommand, CommandResponse } from "./BaseCommand";
import { CommandParser, ParserMsgCommand } from "../../libs/CommandParser";
export class ChatCommands extends BaseModule implements IBaseModule {
	commands: Map<string, BaseCommand>;
	parser: CommandParser;
	constructor(client: ExtendClient) {
		super(client);
		this.commands = new Map();
		this.parser = new CommandParser(this.client);
	}
	private loadComamnds(): void {
		const commandFiles = fs.readdirSync("./src/modules/ChatCommands/Commands").filter(file => file.endsWith(".ts"));
		console.log("Загрузка текстовых команд");
		for (const file of commandFiles) {
			const command = importFresh(`./Commands/${file}`) as BaseCommand;
			if (command.description.load) {
				this.commands.set(command.description.name, command);
				console.log(`${file} Загружен`);
			}

		}
		return;
	}
	public async init(): Promise<void> {
		this.loadComamnds();
		const callback = async (message: Message) => {
			if (this.client.user == null) {
				console.log("Предупреждение, user в client равен null");
			} else if (message.author.id == this.client.user.id) return;
			if (!message.content.startsWith(this.client.prefix)) return;
			const commandParser = this.parser.getParser(message) as ParserMsgCommand;
			if (commandParser == null) return;
			const commandParsed = commandParser.parse();
			if (commandParsed == undefined) {
				this.client.logger.addLog({
					"guildId": message.guild?.id,
					"guildName": message.guild?.name,
					"data": `Команда не найдена ${message.content}`
				});
				return;
			}
			const response = await commandParsed.command.run(commandParsed.args) as CommandResponse;
			this.client.logger.addLog({
				"guildId": message.guild?.id,
				"guildName": message.guild?.name,
				"data": JSON.stringify(response)
			});
		};
		this.regCallback("messageCreate", callback);
	}
}