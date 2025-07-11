import Elysia from "elysia";
import bot from "../../../main.ts";

const getGuilds = new Elysia();

getGuilds.get("/guilds", ({}) => {
const guilds = bot.guilds.cache.map(guild => ({
  id: guild.id,
  name: guild.name,
  memberCount: guild.memberCount
}));
  return {
    guilds: guilds,
  };
});

export default getGuilds;
