import {
  ApplicationCommandOptionType,
  CommandInteraction,
  GuildMember,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
export class BanCommand {
  @Slash({
    name: "ban",
    description: "Bans a member from the server",
    defaultMemberPermissions: ["BanMembers"],
  })
  async ban(
    @SlashOption({
      name: "member",
      description: "Member to ban (ID or tag)",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    memberInput: string,
    interaction: CommandInteraction
  ): Promise<void> {
    if (!interaction.guild) {
      await interaction.reply({ content: "This command can only be used in a server.", ephemeral: true });
      return;
    }

    await interaction.deferReply({ ephemeral: true });

    const member = interaction.guild.members.cache.find(
      (m) => m.user.tag === memberInput || m.id === memberInput
    );

    if (!member) {
      await interaction.editReply({ content: "Member not found." });
      return;
    }

    if (member.id === interaction.guild.ownerId) {
      await interaction.editReply({ content: "You cannot ban the server owner." });
      return;
    }

    if (member.id === interaction.user.id) {
      await interaction.editReply({ content: "You cannot ban yourself." });
      return;
    }

    try {
      await member.ban();
      await interaction.editReply({ content: `✅ ${member.user.tag} has been banned.` });
    } catch (error) {
      console.error("Error banning member:", error);
      await interaction.editReply({ content: "❌ Could not ban this member." });
    }
  }
}