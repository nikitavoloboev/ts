import { GoogleGenAI } from "@google/genai"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

await main()
console.log("✔️")

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: "Why is the sky blue?",
  })
  console.log(response.text)
}
