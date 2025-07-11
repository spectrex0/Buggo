import { dirname, importx } from "@discordx/importer";
import type { Interaction, Message } from "discord.js";
import { GatewayIntentBits } from "discord.js";
import { Client } from "discordx";
import 'dotenv/config';
import { server } from "./server.ts";
import api from "./api/api.ts";

const bot = new Client({
  intents: [
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
  ],

 
  silent: false,
  // simpleCommand: {
  //   prefix: "-",
  // },
});

bot.once("ready", () => {

  void bot.initApplicationCommands();

  bot.clearApplicationCommands(
      ...bot.guilds.cache.map((g) => g.id)
    );

  console.log("Bot started");
});

bot.on("interactionCreate", (interaction: Interaction) => {
  bot.executeInteraction(interaction);
});

bot.on("messageCreate", (message: Message) => {
  void bot.executeCommand(message);
});

async function run() {
   api
  await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);
  server
  if (!process.env.BOT_TOKEN) {
    throw Error("Could not find BOT_TOKEN in your environment");
  }

  await bot.login(process.env.BOT_TOKEN);
}

void run();

export default bot
