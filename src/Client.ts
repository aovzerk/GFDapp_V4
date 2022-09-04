import { Client, ClientOptions } from "discord.js";
import { MongoClient } from "mongodb";
import { ChatCommands } from "./modules/ChatCommands";
interface ExtendClientOptions extends ClientOptions{
    mongoUrl: string;
	prefix: string;
}
export class ExtendClient extends Client {
	mongoClient: MongoClient;
	chatCommands: ChatCommands;
	prefix: string;
	constructor(options: ExtendClientOptions) {
		super(options);
		this.mongoClient = new MongoClient(options.mongoUrl);
		this.prefix = options.prefix;
		this.chatCommands = new ChatCommands(this);
	}
	/**
	 * Запустить бота
	 * init
	 */
	public init(token: string): void {
		this.chatCommands.init();
		this.login(token);
		console.log("Bot Loggined");
	}
}