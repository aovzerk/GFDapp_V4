import { ExtendClient } from "./src/Client";
import { mainConfig } from "./configs/mainConfig";
const client = new ExtendClient({
	"intents": mainConfig.intents,
	"mongoUrl": mainConfig.mongoUrl,
	"prefix": mainConfig.prefix
});
client.init(mainConfig.discordToken);