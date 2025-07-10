import type { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()

export class serverInfo {
  @Slash({description: "Get info about the server"})
  async info(interaction: CommandInteraction): Promise<void>{
    const Members = interaction.guild?.memberCount
    const GuildRoles = interaction.guild?.roles
    const ServerOwner = interaction.guild?.fetchOwner
    await interaction.reply(` 
      we have: ${Members} members
      Server roles: ${GuildRoles}
      Owner: ${ServerOwner}
      `)
  }
}

