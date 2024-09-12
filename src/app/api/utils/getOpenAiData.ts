import OpenAI from 'openai'
import { sleep } from './sleep'

const FETCH_FROM_OPEN_AI = false

type Completion = OpenAI.Chat.Completions.ChatCompletion

export const getOpenAiData = async (
  defaultCompletion: Completion,
  openai: OpenAI,
  prompt: string
): Promise<Completion> => {
  let completion: Completion

  if (FETCH_FROM_OPEN_AI) {
    completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: prompt,
        },
      ],
    })
  } else {
    completion = defaultCompletion
    await sleep(2000)
  }
  console.info(JSON.stringify(completion, null, 2))

  return completion
}
