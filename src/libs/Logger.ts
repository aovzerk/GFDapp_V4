import fs from "fs";
export interface IlogInfo {
    "guildId": string,
    "guildName": string,
    "data": string
}
export class Logger {
	logPath: string;
	fileName: string;
	constructor(logPath: string) {
		this.logPath = logPath;
		this.fileName = "";
	}
	public async init(): Promise<boolean> {
		const isDir = await this.checkDirOrFile(this.logPath);
		if (!isDir) {
			fs.mkdirSync(this.logPath);
			fs.writeFileSync(`${this.logPath}/log-0.txt`, "New File\n");
			this.fileName = "/log-0.txt";
			return true;
		}
		if (isDir) {
			const isFile = await this.checkDirOrFile(`${this.logPath}/log-0.txt`);
			if (!isFile) {
				fs.writeFileSync(`${this.logPath}/log-0.txt`, "New File\n");
				this.fileName = "/log-0.txt";
				return true;
			}
			const files = fs.readdirSync(this.logPath).filter((file) => file.endsWith(".txt"));
			let n = 0;
			for (const file of files) {
				const nFile = Number(file.replace(".txt", "").split("-")[1]);
				if (nFile > n) {
					n = nFile;
				}
			}
			n++;
			fs.writeFileSync(`${this.logPath}/log-${n}.txt`, "New File\n");
			this.fileName = `log-${n}.txt`;
			return true;

		}
		return false;
	}
	private async checkDirOrFile(path: string): Promise<boolean> {
		return new Promise((resolve) => {
			fs.access(path, (err) => {
				if (err != null) {
					resolve(false);
				}
				resolve(true);
			});
		});
	}
	public addLog(logInfo: IlogInfo): void {
		fs.appendFile(`${this.logPath}/${this.fileName}`, `\n${JSON.stringify(logInfo)}`, (err) => {
			if (err) console.log(err);
			return;
		});
	}
}