import Elysia from 'elysia'
import {Discord} from 'discordx'

import bot from '../../../main'

const getGuild = new Elysia()

getGuild.get('/botInfo', ({}) => {
  const botName = bot.user?.username;
  return {
    Name: botName
  }
})

export default getGuild