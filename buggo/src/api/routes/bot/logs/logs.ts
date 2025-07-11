import { Elysia } from "elysia";

const logs = new Elysia();

logs.post("/logs", async ({ request }) => {
  const data = await request.json();
  const { message } = data;

  if (!message) {
    return new Response(JSON.stringify({ success: false, error: "No message provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Muestra el log en consola del servidor
  console.log(`[LOG RECIBIDO] ${message}`);

  return {
    success: true,
    receivedAt: new Date().toISOString(),
  };
});

export default logs;
