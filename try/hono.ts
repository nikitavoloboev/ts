import { Hono } from "hono"
const app = new Hono()

app.get("/", (c) => c.text("Hono!"))

app.post("/fetch-html", async (c) => {
  const body = await c.req.json()
  const { url } = body

  if (!url) {
    return c.json({ error: "URL is required" }, 400)
  }

  try {
    const response = await fetch(url)
    const html = await response.text()
    return c.html(html)
  } catch (error) {
    return c.json({ error: "Failed to fetch URL" }, 500)
  }
})

export default app
