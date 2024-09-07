import { isNil } from 'lodash'

export const openAiResponseToJsonFormatter = <T>(content: string): T => {
  const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/)

  const response: T | null = jsonMatch ? JSON.parse(jsonMatch[1]) : null

  if (response) {
    return response
  }

  const formattedContent: T = JSON.parse(content)
  if (!isNil(formattedContent)) {
    return formattedContent
  }

  console.error(content)
  throw new Error('An error occured during openAI response formatting')
}
