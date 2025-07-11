import Elysia from 'elysia'
import getGuilds from './bot/getGuilds.ts'
import botInfo from './bot/botInfo.ts'
import leave from './bot/controls/leave.ts'
const routes = new Elysia()

routes.use(getGuilds)
routes.use(botInfo)
routes.use(leave)


export default routes