import Elysia from "elysia";
import cors from "@elysiajs/cors";
import { log } from "console";

export const server = new Elysia()
  .use(cors())
  .get("/bump", () => ({ status: "Bumped ✔" }));
  log(`[🐱‍👤] Server Running`)
export default {
  fetch: server.fetch
};

