import { IntentsBitField } from "discord.js";
const intetsBit = new IntentsBitField();
intetsBit.add(
	IntentsBitField.Flags.Guilds,
	IntentsBitField.Flags.GuildMembers,
	IntentsBitField.Flags.GuildBans,
	IntentsBitField.Flags.GuildEmojisAndStickers,
	IntentsBitField.Flags.GuildIntegrations,
	IntentsBitField.Flags.GuildWebhooks,
	IntentsBitField.Flags.GuildInvites,
	IntentsBitField.Flags.GuildVoiceStates,
	IntentsBitField.Flags.GuildMessages,
	IntentsBitField.Flags.GuildMessageReactions,
	IntentsBitField.Flags.GuildMessageTyping,
	IntentsBitField.Flags.DirectMessages,
	IntentsBitField.Flags.DirectMessageReactions,
	IntentsBitField.Flags.DirectMessageTyping,
	IntentsBitField.Flags.MessageContent
);
export const mainConfig = {
	"discordToken": "",
	"intents": intetsBit,
	"mongoUrl": "mongodb://localhost:27017",
	"prefix": "g!"
};