import { NextRequest, NextResponse } from 'next/server'

import OpenAI from 'openai'
import { WeeklyMeals } from '@/utils/interfaces/meals'

const openai = new OpenAI({ apiKey: process.env.OPENAPI_KEY })

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { filters }: { filters: string[] } = await request.json()

  /* const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      {
        role: 'user',
        content: basePrompt,
      },
    ],
  })

  const weeklyMeals = openAiResponseToJsonFormatter(
    completion.choices[0].message.content ?? '{}'
  )
  console.log('🚀 ~ POST ~ meals:', weeklyMeals) */

  await sleep(2000)

  return NextResponse.json({ weeklyMeals })
}

const openAiResponseToJsonFormatter = (content: string) => {
  const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/)

  return jsonMatch ? JSON.parse(jsonMatch[1]) : null
}

const basePrompt = `generate in JSON meals for the week using the following structure: {monday: {lunch: {name: string, calories: number, icon:string, color: tailwind base colors}}}. Do that for lunch and dinner of every day of the week. Some dishes can last up to 3 meals. Only generate color not the bg and -accent number, only generate the json. Use seasonal vegetables
`

const openAiResponse = {
  role: 'assistant',
  content:
    '```json\n' +
    '{\n' +
    '  "monday": {\n' +
    '    "breakfast": {\n' +
    '      "name": "Oatmeal with Berries",\n' +
    '      "calories": 300,\n' +
    '      "icon": "🌾",\n' +
    '      "color": "blue"\n' +
    '    },\n' +
    '    "lunch": {\n' +
    '      "name": "Grilled Chicken Salad",\n' +
    '      "calories": 450,\n' +
    '      "icon": "🥗",\n' +
    '      "color": "green"\n' +
    '    },\n' +
    '    "dinner": {\n' +
    '      "name": "Spaghetti Bolognese",\n' +
    '      "calories": 600,\n' +
    '      "icon": "🍝",\n' +
    '      "color": "red"\n' +
    '    }\n' +
    '  },\n' +
    '  "tuesday": {\n' +
    '    "breakfast": {\n' +
    '      "name": "Greek Yogurt with Honey",\n' +
    '      "calories": 250,\n' +
    '      "icon": "🍯",\n' +
    '      "color": "yellow"\n' +
    '    },\n' +
    '    "lunch": {\n' +
    '      "name": "Turkey and Avocado Wrap",\n' +
    '      "calories": 500,\n' +
    '      "icon": "🥙",\n' +
    '      "color": "teal"\n' +
    '    },\n' +
    '    "dinner": {\n' +
    '      "name": "Stir-Fried Tofu with Vegetables",\n' +
    '      "calories": 400,\n' +
    '      "icon": "🍽️",\n' +
    '      "color": "purple"\n' +
    '    }\n' +
    '  },\n' +
    '  "wednesday": {\n' +
    '    "breakfast": {\n' +
    '      "name": "Smoothie Bowl",\n' +
    '      "calories": 350,\n' +
    '      "icon": "🍓",\n' +
    '      "color": "pink"\n' +
    '    },\n' +
    '    "lunch": {\n' +
    '      "name": "Quinoa and Chickpea Salad",\n' +
    '      "calories": 450,\n' +
    '      "icon": "🥗",\n' +
    '      "color": "green"\n' +
    '    },\n' +
    '    "dinner": {\n' +
    '      "name": "Salmon with Asparagus",\n' +
    '      "calories": 550,\n' +
    '      "icon": "🐟",\n' +
    '      "color": "blue"\n' +
    '    }\n' +
    '  },\n' +
    '  "thursday": {\n' +
    '    "breakfast": {\n' +
    '      "name": "Scrambled Eggs on Toast",\n' +
    '      "calories": 300,\n' +
    '      "icon": "🍳",\n' +
    '      "color": "yellow"\n' +
    '    },\n' +
    '    "lunch": {\n' +
    '      "name": "Lentil Soup",\n' +
    '      "calories": 350,\n' +
    '      "icon": "🥣",\n' +
    '      "color": "amber"\n' +
    '    },\n' +
    '    "dinner": {\n' +
    '      "name": "Beef Stir-Fry with Rice",\n' +
    '      "calories": 700,\n' +
    '      "icon": "🥢",\n' +
    '      "color": "red"\n' +
    '    }\n' +
    '  },\n' +
    '  "friday": {\n' +
    '    "breakfast": {\n' +
    '      "name": "Chia Seed Pudding",\n' +
    '      "calories": 250,\n' +
    '      "icon": "🥭",\n' +
    '      "color": "purple"\n' +
    '    },\n' +
    '    "lunch": {\n' +
    '      "name": "Caesar Salad",\n' +
    '      "calories": 400,\n' +
    '      "icon": "🥗",\n' +
    '      "color": "green"\n' +
    '    },\n' +
    '    "dinner": {\n' +
    '      "name": "Pizza Margherita",\n' +
    '      "calories": 800,\n' +
    '      "icon": "🍕",\n' +
    '      "color": "red"\n' +
    '    }\n' +
    '  },\n' +
    '  "saturday": {\n' +
    '    "breakfast": {\n' +
    '      "name": "Pancakes with Maple Syrup",\n' +
    '      "calories": 500,\n' +
    '      "icon": "🥞",\n' +
    '      "color": "yellow"\n' +
    '    },\n' +
    '    "lunch": {\n' +
    '      "name": "Banh Mi Sandwich",\n' +
    '      "calories": 600,\n' +
    '      "icon": "🥪",\n' +
    '      "color": "teal"\n' +
    '    },\n' +
    '    "dinner": {\n' +
    '      "name": "Grilled Shrimp Tacos",\n' +
    '      "calories": 550,\n' +
    '      "icon": "🌮",\n' +
    '      "color": "green"\n' +
    '    }\n' +
    '  },\n' +
    '  "sunday": {\n' +
    '    "breakfast": {\n' +
    '      "name": "Fruit Salad",\n' +
    '      "calories": 200,\n' +
    '      "icon": "🍉",\n' +
    '      "color": "pink"\n' +
    '    },\n' +
    '    "lunch": {\n' +
    '      "name": "Stuffed Bell Peppers",\n' +
    '      "calories": 450,\n' +
    '      "icon": "🥘",\n' +
    '      "color": "orange"\n' +
    '    },\n' +
    '    "dinner": {\n' +
    '      "name": "Roast Chicken with Vegetables",\n' +
    '      "calories": 700,\n' +
    '      "icon": "🍗",\n' +
    '      "color": "brown"\n' +
    '    }\n' +
    '  }\n' +
    '}\n' +
    '```',
  refusal: null,
}

const weeklyMealsNoBreakfast: WeeklyMeals = {
  monday: {
    lunch: {
      name: 'Grilled Chicken Salad',
      calories: 400,
      icon: '🥗',
      color: 'green',
    },
    dinner: {
      name: 'Stuffed Bell Peppers',
      calories: 350,
      icon: '🌶️',
      color: 'red',
    },
  },
  tuesday: {
    lunch: {
      name: 'Quinoa and Black Bean Bowl',
      calories: 450,
      icon: '🥣',
      color: 'yellow',
    },
    dinner: {
      name: 'Salmon with Asparagus',
      calories: 500,
      icon: '🍣',
      color: 'green',
    },
  },
  wednesday: {
    lunch: {
      name: 'Chickpea Salad',
      calories: 400,
      icon: '🥗',
      color: 'orange',
    },
    dinner: {
      name: 'Beef Stir-Fry with Vegetables',
      calories: 550,
      icon: '🥩',
      color: 'red',
    },
  },
  thursday: {
    lunch: {
      name: 'Lentil Soup',
      calories: 350,
      icon: '🍲',
      color: 'amber',
    },
    dinner: {
      name: 'Zucchini Noodles with Marinara Sauce',
      calories: 400,
      icon: '🍝',
      color: 'red',
    },
  },
  friday: {
    lunch: {
      name: 'Turkey Wrap with Veggies',
      calories: 450,
      icon: '🌯',
      color: 'green',
    },
    dinner: {
      name: 'Cauliflower Fried Rice',
      calories: 400,
      icon: '🍚',
      color: 'green',
    },
  },
  saturday: {
    lunch: {
      name: 'Sweet Potato and Kale Salad',
      calories: 400,
      icon: '🥗',
      color: 'orange',
    },
    dinner: {
      name: 'Grilled Shrimp with Broccoli',
      calories: 450,
      icon: '🍤',
      color: 'green',
    },
  },
  sunday: {
    lunch: {
      name: 'Tofu Stir-Fry',
      calories: 400,
      icon: '🍲',
      color: 'yellow',
    },
    dinner: {
      name: 'Eggplant Parmesan',
      calories: 500,
      icon: '🍆',
      color: 'purple',
    },
  },
}

const weeklyMeals: WeeklyMeals = {
  monday: {
    breakfast: {
      name: 'Spinach and Mushroom Omelette',
      calories: 300,
      icon: '🍳',
      color: 'green',
    },
    lunch: {
      name: 'Grilled Chicken Salad',
      calories: 400,
      icon: '🥗',
      color: 'green',
    },
    dinner: {
      name: 'Stuffed Bell Peppers',
      calories: 350,
      icon: '🌶️',
      color: 'red',
    },
  },
  tuesday: {
    breakfast: {
      name: 'Greek Yogurt with Berries',
      calories: 250,
      icon: '🍓',
      color: 'blue',
    },
    lunch: {
      name: 'Quinoa and Black Bean Bowl',
      calories: 450,
      icon: '🥣',
      color: 'yellow',
    },
    dinner: {
      name: 'Salmon with Asparagus',
      calories: 500,
      icon: '🍣',
      color: 'green',
    },
  },
  wednesday: {
    breakfast: {
      name: 'Avocado Toast',
      calories: 280,
      icon: '🥑',
      color: 'green',
    },
    lunch: {
      name: 'Chickpea Salad',
      calories: 400,
      icon: '🥗',
      color: 'orange',
    },
    dinner: {
      name: 'Beef Stir-Fry with Vegetables',
      calories: 550,
      icon: '🥩',
      color: 'red',
    },
  },
  thursday: {
    breakfast: {
      name: 'Smoothie Bowl',
      calories: 300,
      icon: '🍓',
      color: 'purple',
    },
    lunch: {
      name: 'Lentil Soup',
      calories: 350,
      icon: '🍲',
      color: 'amber',
    },
    dinner: {
      name: 'Zucchini Noodles with Marinara Sauce',
      calories: 400,
      icon: '🍝',
      color: 'red',
    },
  },
  friday: {
    breakfast: {
      name: 'Berry Oatmeal',
      calories: 320,
      icon: '🍓',
      color: 'blue',
    },
    lunch: {
      name: 'Turkey Wrap with Veggies',
      calories: 450,
      icon: '🌯',
      color: 'green',
    },
    dinner: {
      name: 'Cauliflower Fried Rice',
      calories: 400,
      icon: '🍚',
      color: 'green',
    },
  },
  saturday: {
    breakfast: {
      name: 'Egg White Frittata',
      calories: 250,
      icon: '🍳',
      color: 'yellow',
    },
    lunch: {
      name: 'Sweet Potato and Kale Salad',
      calories: 400,
      icon: '🥗',
      color: 'orange',
    },
    dinner: {
      name: 'Grilled Shrimp with Broccoli',
      calories: 450,
      icon: '🍤',
      color: 'green',
    },
  },
  sunday: {
    breakfast: {
      name: 'Chia Seed Pudding',
      calories: 290,
      icon: '🍮',
      color: 'pink',
    },
    lunch: {
      name: 'Tofu Stir-Fry',
      calories: 400,
      icon: '🍲',
      color: 'yellow',
    },
    dinner: {
      name: 'Eggplant Parmesan',
      calories: 500,
      icon: '🍆',
      color: 'purple',
    },
  },
}
