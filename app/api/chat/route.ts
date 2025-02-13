import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { streamText } from 'ai'

export async function POST(req: Request) {
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  })

  const messages = await req.text()

  const result = await streamText({
    model: openrouter('google/gemini-2.0-pro-exp-02-05:free'),
    prompt: messages,
  })
  return result.toDataStreamResponse()
}
