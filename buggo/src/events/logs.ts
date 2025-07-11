import { On } from "discordx";
import { Guild } from "discord.js";
import { fetch } from "undici";

export class GuildJoinEvent {
  @On()
  async guildCreate(guild: Guild): Promise<void> {
    const logMessage = `[GUILD JOIN] Bot joined server: ${guild.name} (${guild.id})`;

    try {
      await fetch("http://localhost:3000/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: logMessage }),
      });

      console.log(logMessage);
    } catch (err) {
      console.error("[❌] No se pudo enviar el log:", err);
    }
  }
}