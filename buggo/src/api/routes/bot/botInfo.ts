import Elysia from "elysia";
import bot from "../../../main.ts";

const botInfo = new Elysia();

botInfo.get("/info", ({}) => {
  const botName = bot.user?.username;
  return {
    Name: botName,
  };
});

export default botInfo;
