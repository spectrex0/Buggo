import { Elysia, t } from 'elysia';
import bot from '../../../../main';
const leave = new Elysia();

leave.post('/leave', ({ body }) => {
  const { serverID } = body;

  const guildId = String(serverID);

  if (!guildId) {
    return {
      success: false,
      error: 'Server ID is required.',
    };
  }

  const guild = bot.guilds.cache.get(guildId);

  if (!guild) {
    return {
      success: false,
      error: `Guild with ID ${guildId} not found.`,
    };
  }

  try {
   guild.leave();
    return {
      success: true,
      message: `✅ Left server: ${guild.name}`,
    };
  } catch (err) {
    console.error(`Error leaving guild ${guildId}:`, err);
    return {
      success: false,
      error: '[ERROR] Could not leave the server',
    };
  }
}, {
  body: t.Object({
    serverID: t.Number(), 
  }),
});

export default leave