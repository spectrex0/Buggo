import type { CommandInteraction } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { Discord, Slash }  from "discordx";

@Discord()
export class PingCommand {
  @Slash({ description: "Ping the bot to check if it's online" })
  async ping(interaction: CommandInteraction): Promise<void> {
    const start = Date.now();
    
    await interaction.deferReply();
    
    const botLatency = Date.now() - interaction.createdTimestamp;
    const apiLatency = Date.now() - start;
    const wsLatency = interaction.client.ws.ping;

    const pingEmbed = new EmbedBuilder()
      .setTitle("Pong!")
      .setColor("Orange")
      .addFields({
        name: "Bot Latency",
        value: `\`${botLatency}ms\``,
        inline: true
      },
      {
        name: "API Latency",
        value: `\`${apiLatency}ms\``,
        inline: true
      },
      {
        name: "WebSocket Ping",
        value: `\`${wsLatency}ms\``,
        inline: true
      }
    )
      .setFooter({
        text: `Requested By ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL()
      })
      .setTimestamp();

    await interaction.editReply({ embeds: [pingEmbed] });
  }
}
