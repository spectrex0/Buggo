import type { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
export class Slashes {
  @Slash({ description: "Ping the bot to check if it's online" })
  async ping(interaction: CommandInteraction): Promise<void> {
    const latency = Date.now() - interaction.createdTimestamp;
    await interaction.reply(`Pong! 🏓 Bot latency: ${latency}ms`);
  }
}