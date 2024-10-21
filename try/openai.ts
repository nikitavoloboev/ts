import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
})

async function main() {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: "user", content: "What is capital of France?" }],
    model: "gpt-3.5-turbo",
  })
  const responseMessage = chatCompletion?.choices[0]?.message
  console.log(responseMessage?.content)
}

await main()
