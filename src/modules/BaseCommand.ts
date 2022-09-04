import { Message } from "discord.js";
import { ExtendClient } from "../Client";
export interface CommandDescription {
    name: string;
    load: boolean;
}
export interface CommandArgs {
    clinet: ExtendClient;
    message: Message;
    args: string[];
}
export interface BaseCommand {
    run(params: CommandArgs): Promise<CommandResponse>;
    description: CommandDescription;
}
export enum CommandState {
    "OK" = 0,
    "ERROR" = 1
}
export interface CommandResponse {
    state: CommandState;
    message: any;
    error?: any
}