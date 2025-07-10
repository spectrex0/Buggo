import Elysia from 'elysia'
import cors from '@elysiajs/cors'
import swagger from '@elysiajs/swagger'
import {log} from 'console'
import bot from '../main.ts'
// import routes from './routes/index'
const api = new Elysia() 
api.get('/botInfo', ({}) => {
  const botName = bot.user?.username;
  return {
    Name: botName
  }
})

  api.use(
  swagger({
    documentation: {
      info: {
        title: 'Guggy Bot API',
        description: 'Documentación oficial de la API de Buggy',
        version: '1.0.0',
        contact: {
          name: 'Guggy Staff',
          email: 'soporte@buggybot.xyz',
        },
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Local',
        },
      ],
      externalDocs: {
        description: '',
        url: '', 
      },
    },
    path: '/api',
  })
)

  api.use(cors())
  // api.use(routes)
  log('[✔] Api running')
  // api.listen(4200)
  api.get('/', ({}) => {
  return {
    message: "Welcome to the default route, please use /api/docs to see the documentation."
  }
})

  export default {
  fetch: api.fetch
};