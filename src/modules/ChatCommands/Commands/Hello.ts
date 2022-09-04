import { BaseCommand, CommandArgs, CommandDescription, CommandResponse, CommandState } from "../BaseCommand";
const descriptionCommand = {
	"name": "hello",
	"load": true
} as CommandDescription;
class Hello implements BaseCommand {
	description: CommandDescription;
	constructor(description: CommandDescription) {
		this.description = description;
	}
	/**
     * Запуск команды
     * run
     * @param {CommandArgs} params аргументы команды
    */
	public async run(params: CommandArgs): Promise<CommandResponse> {
		try {
			if (params.args.length == 0) {
				await params.message.reply("Введите сообщение =)");
			}
			const sendString = params.args.join(" ");
			await params.message.reply(sendString);
			return {
				"state": CommandState.OK,
				"message": `Команда ${this.description.name} ввыполнена успешно`
			};
		} catch (error) {
			return {
				"state": CommandState.ERROR,
				"message": `Команда ${this.description.name} звершилась с ошибкой`,
				"error": error
			};
		}

	}
}
module.exports = new Hello(descriptionCommand);