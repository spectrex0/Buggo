import type { ArgsOf, Client } from "discordx";
import { Discord, On } from "discordx";
import { EmbedBuilder, TextChannel } from "discord.js";

@Discord()
export class MessageDeleteHandler {
  @On()
  async messageDelete([message]: ArgsOf<"messageDelete">, client: Client): Promise<void> {
    if (message.author?.bot || !message.content) return;

    console.log("Message Deleted", client.user?.username, message.content);

    const logEmbed = new EmbedBuilder()
      .setTitle("Message Deleted")
      .setColor("#FF0000")
      .setDescription(`Content: ${message.content}`)
      .addFields(
        { name: "Author", value: `${message.author?.tag || "Unknown"}`, inline: true },
        { name: "Channel", value: `${(message.channel as TextChannel).name || "DM"}`, inline: true },
        { name: "Message ID", value: message.id, inline: true }
      )
      .setTimestamp();

    // Enviar log a un canal en especifico
    const logChannelId = "TU_CANAL_DE_LOGS_ID";
    const logChannel = client.channels.cache.get(logChannelId) as TextChannel;
    
    if (logChannel) {
      logChannel.send({ embeds: [logEmbed] });
    }
  }
}
// seria bacano agregar una db para guardar las settings,
// asi cada server tiene sus settings pero tampoco es para que lo use todo el mundo ([])
// si