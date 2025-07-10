import { Elysia } from "elysia";
import { node } from "@elysiajs/node";

const api = new Elysia({ adapter: node() })
  .get("/", () => ({ hello: "Node.js👋" }))
  .listen(3000);

console.log(`Listening on http://localhost:3000`);

export default api