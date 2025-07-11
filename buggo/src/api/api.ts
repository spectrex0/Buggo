import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import node from "@elysiajs/node";
import routes from "./routes/index.ts";


const api = new Elysia({adapter: node()});

api.use(cors());

api.use(
  swagger({
    documentation: {
      info: {
        title: "Guggy Bot API",
        description: "Official documentation of Buggo bot, Created and managed by tokyo",
        version: "1.0.0"
      }
    },
    path: "/api"
  })
);

api.use(routes)
api.listen(4200, () => {
  console.log("[API] RUNNING");
});


export default api