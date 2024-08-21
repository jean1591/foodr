import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI()

export async function POST(request: Request) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content:
            "Propose dish names for every days of the week, one for noon, one for the evening. Some dishes can last for two meals. Return an array of { day: 'monday' | ... | 'sunday', [{meal: 'noon', name: string}, {meal: 'evening', name: string}]}",
        },
      ],
      model: 'gpt-4o-mini',
    })

    return NextResponse.json({ text: completion.choices[0] })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
