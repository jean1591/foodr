import OpenAI from 'openai'

export const completionRecipes: OpenAI.Chat.Completions.ChatCompletion = {
  id: 'chatcmpl-A4CCvwpTqvdamBZxLlEuvm3iocXxB',
  object: 'chat.completion',
  created: 1725563601,
  model: 'gpt-4o-mini-2024-07-18',
  choices: [
    {
      index: 0,
      message: {
        role: 'assistant',
        content:
          'Here\'s a JSON object with meal ideas for each day of the week, including lunch and dinner, while following your ingredient constraints:\n\n```json\n{\n    "monday": [\n        {\n            "calories": 600,\n            "icon": "🍗",\n            "label": "Grilled Chicken Salad",\n            "totalTime": 30,\n            "type": "lunch"\n        },\n        {\n            "calories": 750,\n            "icon": "🍝",\n            "label": "Creamy Mushroom Pasta",\n            "totalTime": 40,\n            "type": "dinner"\n        }\n    ],\n    "tuesday": [\n        {\n            "calories": 450,\n            "icon": "🥑",\n            "label": "Avocado Toast with Eggs",\n            "totalTime": 15,\n            "type": "lunch"\n        },\n        {\n            "calories": 800,\n            "icon": "🍅",\n            "label": "Tomato and Garlic Chicken with Rice",\n            "totalTime": 35,\n            "type": "dinner"\n        }\n    ],\n    "wednesday": [\n        {\n            "calories": 500,\n            "icon": "🍚",\n            "label": "Chicken and Rice Bowl with Avocado",\n            "totalTime": 25,\n            "type": "lunch"\n        },\n        {\n            "calories": 700,\n            "icon": "🍳",\n            "label": "Baked Eggs with Tomatoes and Garlic",\n            "totalTime": 40,\n            "type": "dinner"\n        }\n    ],\n    "thursday": [\n        {\n            "calories": 550,\n            "icon": "🍄",\n            "label": "Mushroom Risotto with Chicken",\n            "totalTime": 45,\n            "type": "lunch"\n        },\n        {\n            "calories": 650,\n            "icon": "🍗",\n            "label": "Garlic Roast Chicken with Veggies",\n            "totalTime": 50,\n            "type": "dinner"\n        }\n    ],\n    "friday": [\n        {\n            "calories": 400,\n            "icon": "🥑",\n            "label": "Avocado and Tomato Salad",\n            "totalTime": 10,\n            "type": "lunch"\n        },\n        {\n            "calories": 800,\n            "icon": "🍝",\n            "label": "Pasta with Chicken and Garlic Sauce",\n            "totalTime": 30,\n            "type": "dinner"\n        }\n    ]\n}\n```\n\nThis JSON structure provides meal ideas for lunch and dinner throughout the week while adhering to your ingredient constraints and variety requirements.',
        refusal: null,
      },
      logprobs: null,
      finish_reason: 'stop',
    },
  ],
  usage: {
    prompt_tokens: 214,
    completion_tokens: 575,
    total_tokens: 789,
  },
  system_fingerprint: 'fp_483d39d857',
}
