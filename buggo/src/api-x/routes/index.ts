import Elysia from 'elysia'
import getGuild from './bot/getGuilds'
const routes = new Elysia()

routes.use(getGuild)


export default routes