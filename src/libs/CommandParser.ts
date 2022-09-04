/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommandInteraction, Message } from "discord.js";
import { ExtendClient } from "../Client";
import { BaseCommand, CommandArgs } from "../modules/BaseCommand";
interface CommandParsed{
    command: BaseCommand;
    args: CommandArgs;
}
export class ParserMsgCommand {
	client: ExtendClient;
	message: Message;
	constructor(client: ExtendClient, message: Message) {
		this.client = client;
		this.message = message;
	}
	public parse(): CommandParsed | undefined {
		const command = this.getCommand(this.client.prefix);
		if (command == undefined) return command;
		const args = this.getCommandArgs();
		return {
			"command": command,
			"args": {
				"args": args,
				"clinet": this.client,
				"message": this.message
			}
		};
	}
	public getCommandArgs(): string[] {
		const commandName = this.getCommandName();
		const args = this.message.content.split(" ").filter(arg => arg.trim() != "" && arg != commandName);
		return args;
	}
	private getCommand(prefix: string): BaseCommand | undefined {
		const commandName = this.getCommandName();
		if (commandName.startsWith(prefix)) {
			const command = this.client.chatCommands.commands.get(commandName.replace(prefix, "")) as BaseCommand;
			if (command == undefined) {
				return undefined;
			}
			return command;
		}
		return undefined;
	}
	private getCommandName() {
		const commandText = this.message.content.trim();
		return commandText.split(" ")[0];
	}
}
export class ParserInteractionCommand {
	client: ExtendClient;
	interaction: CommandInteraction;
	constructor(client: ExtendClient, interaction: CommandInteraction) {
		this.client = client;
		this.interaction = interaction;
	}
}
export class CommandParser {
	client: ExtendClient;
	constructor(client: ExtendClient) {
		this.client = client;
	}
	getParser(object: Message | CommandInteraction): ParserMsgCommand | ParserInteractionCommand | null {
		if (object instanceof Message) {
			return new ParserMsgCommand(this.client, object);
		}
		if (object instanceof CommandInteraction) {
			return new ParserInteractionCommand(this.client, object);
		}
		return null;
	}
}