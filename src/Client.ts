import { Client, ClientOptions } from "discord.js";
import { MongoClient } from "mongodb";
import { Logger } from "./libs/Logger";
import { ChatCommands } from "./modules/ChatCommands";
interface ExtendClientOptions extends ClientOptions{
    mongoUrl: string;
	prefix: string;
}
export class ExtendClient extends Client {
	mongoClient: MongoClient;
	chatCommands: ChatCommands;
	prefix: string;
	logger: Logger;
	constructor(options: ExtendClientOptions) {
		super(options);
		this.mongoClient = new MongoClient(options.mongoUrl);
		this.prefix = options.prefix;
		this.chatCommands = new ChatCommands(this);
		this.logger = new Logger("./logs");
	}
	/**
	 * Запустить бота
	 * init
	 * @param {string} token токен бота
	 */
	public async init(token: string): Promise<void> {
		await this.logger.init();
		await this.chatCommands.init();
		await this.login(token);
		console.log(`Bot ${this.user?.username}#${this.user?.discriminator} logged in`);
	}
}