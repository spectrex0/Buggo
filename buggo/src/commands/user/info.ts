import type { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()

export class serverInfo {
  @Slash({description: "Get info about the server", name:"members"})
  async info(interaction: CommandInteraction): Promise<void>{
    const Members = interaction.guild?.memberCount
    await interaction.reply(` 
      we have: ${Members} members
      `)
  }
}

