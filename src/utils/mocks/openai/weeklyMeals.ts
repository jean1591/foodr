export const completionNoBreakfast = {
  id: 'chatcmpl-9xFpgICg8eWcQwTi9Dx65sXi45vrH',
  object: 'chat.completion',
  created: 1723909240,
  model: 'gpt-4o-mini-2024-07-18',
  choices: [
    {
      index: 0,
      message: {
        role: 'assistant',
        content:
          '```json\n{\n  "monday": {\n    "lunch": {\n      "name": "Chicken Caesar Salad",\n      "calories": 450,\n      "icon": "🥗",\n      "color": "green-500"\n    },\n    "dinner": {\n      "name": "Spaghetti Bolognese",\n      "calories": 600,\n      "icon": "🍝",\n      "color": "red-600"\n    }\n  },\n  "tuesday": {\n    "lunch": {\n      "name": "Spaghetti Bolognese",\n      "calories": 600,\n      "icon": "🍝",\n      "color": "red-600"\n    },\n    "dinner": {\n      "name": "Grilled Salmon with Asparagus",\n      "calories": 500,\n      "icon": "🐟",\n      "color": "blue-400"\n    }\n  },\n  "wednesday": {\n    "lunch": {\n      "name": "Grilled Salmon with Asparagus",\n      "calories": 500,\n      "icon": "🐟",\n      "color": "blue-400"\n    },\n    "dinner": {\n      "name": "Vegetable Stir-Fry with Tofu",\n      "calories": 350,\n      "icon": "🥦",\n      "color": "yellow-500"\n    }\n  },\n  "thursday": {\n    "lunch": {\n      "name": "Vegetable Stir-Fry with Tofu",\n      "calories": 350,\n      "icon": "🥦",\n      "color": "yellow-500"\n    },\n    "dinner": {\n      "name": "Beef Tacos",\n      "calories": 700,\n      "icon": "🌮",\n      "color": "orange-500"\n    }\n  },\n  "friday": {\n    "lunch": {\n      "name": "Beef Tacos",\n      "calories": 700,\n      "icon": "🌮",\n      "color": "orange-500"\n    },\n    "dinner": {\n      "name": "Margherita Pizza",\n      "calories": 800,\n      "icon": "🍕",\n      "color": "red-400"\n    }\n  },\n  "saturday": {\n    "lunch": {\n      "name": "Margherita Pizza",\n      "calories": 800,\n      "icon": "🍕",\n      "color": "red-400"\n    },\n    "dinner": {\n      "name": "Chicken Curry with Rice",\n      "calories": 550,\n      "icon": "🍛",\n      "color": "teal-500"\n    }\n  },\n  "sunday": {\n    "lunch": {\n      "name": "Chicken Curry with Rice",\n      "calories": 550,\n      "icon": "🍛",\n      "color": "teal-500"\n    },\n    "dinner": {\n      "name": "Quinoa Salad with Chickpeas",\n      "calories": 400,\n      "icon": "🥗",\n      "color": "green-400"\n    }\n  }\n}\n```',
        refusal: null,
      },
      logprobs: null,
      finish_reason: 'stop',
    },
  ],
  usage: {
    prompt_tokens: 88,
    completion_tokens: 683,
    total_tokens: 771,
  },
  system_fingerprint: 'fp_48196bc67a',
}

export const completionWithBreakfast = {
  id: 'chatcmpl-9xFqVl35Y7bbwLgblFlPiGJi1SIQP',
  object: 'chat.completion',
  created: 1723909291,
  model: 'gpt-4o-mini-2024-07-18',
  choices: [
    {
      index: 0,
      message: {
        role: 'assistant',
        content:
          '```json\n{\n  "monday": {\n    "breakfast": {\n      "name": "Oatmeal with Berries",\n      "calories": 250,\n      "icon": "🌾",\n      "color": "bg-blue-200"\n    },\n    "lunch": {\n      "name": "Grilled Chicken Salad",\n      "calories": 400,\n      "icon": "🥗",\n      "color": "bg-green-200"\n    },\n    "dinner": {\n      "name": "Spaghetti Aglio e Olio",\n      "calories": 600,\n      "icon": "🍝",\n      "color": "bg-yellow-200"\n    }\n  },\n  "tuesday": {\n    "breakfast": {\n      "name": "Smoothie Bowl",\n      "calories": 300,\n      "icon": "🥤",\n      "color": "bg-purple-200"\n    },\n    "lunch": {\n      "name": "Leftover Grilled Chicken Salad",\n      "calories": 400,\n      "icon": "🥗",\n      "color": "bg-green-200"\n    },\n    "dinner": {\n      "name": "Taco Night",\n      "calories": 500,\n      "icon": "🌮",\n      "color": "bg-red-200"\n    }\n  },\n  "wednesday": {\n    "breakfast": {\n      "name": "Greek Yogurt with Honey",\n      "calories": 200,\n      "icon": "🍯",\n      "color": "bg-orange-200"\n    },\n    "lunch": {\n      "name": "Tacos with Extra Veggies",\n      "calories": 550,\n      "icon": "🌮",\n      "color": "bg-red-200"\n    },\n    "dinner": {\n      "name": "Stir-Fried Tofu with Veggies",\n      "calories": 450,\n      "icon": "🥡",\n      "color": "bg-indigo-200"\n    }\n  },\n  "thursday": {\n    "breakfast": {\n      "name": "Egg Avocado Toast",\n      "calories": 350,\n      "icon": "🍞",\n      "color": "bg-green-300"\n    },\n    "lunch": {\n      "name": "Quinoa Bowl with Chickpeas",\n      "calories": 500,\n      "icon": "🥗",\n      "color": "bg-yellow-300"\n    },\n    "dinner": {\n      "name": "Baked Salmon with Asparagus",\n      "calories": 700,\n      "icon": "🐟",\n      "color": "bg-blue-300"\n    }\n  },\n  "friday": {\n    "breakfast": {\n      "name": "Banana Pancakes",\n      "calories": 400,\n      "icon": "🥞",\n      "color": "bg-orange-300"\n    },\n    "lunch": {\n      "name": "Baked Salmon with Asparagus",\n      "calories": 700,\n      "icon": "🐟",\n      "color": "bg-blue-300"\n    },\n    "dinner": {\n      "name": "Pizza Night",\n      "calories": 600,\n      "icon": "🍕",\n      "color": "bg-red-300"\n    }\n  },\n  "saturday": {\n    "breakfast": {\n      "name": "Veggie Omelette",\n      "calories": 300,\n      "icon": "🍳",\n      "color": "bg-yellow-400"\n    },\n    "lunch": {\n      "name": "Grilled Veggie Wrap",\n      "calories": 450,\n      "icon": "🌯",\n      "color": "bg-green-400"\n    },\n    "dinner": {\n      "name": "BBQ Chicken with Corn",\n      "calories": 700,\n      "icon": "🍗",\n      "color": "bg-orange-400"\n    }\n  },\n  "sunday": {\n    "breakfast": {\n      "name": "French Toast",\n      "calories": 350,\n      "icon": "🍞",\n      "color": "bg-yellow-500"\n    },\n    "lunch": {\n      "name": "Leftover BBQ Chicken with Corn",\n      "calories": 700,\n      "icon": "🍗",\n      "color": "bg-orange-400"\n    },\n    "dinner": {\n      "name": "Stuffed Bell Peppers",\n      "calories": 550,\n      "icon": "🌶️",\n      "color": "bg-red-400"\n    }\n  }\n}\n```',
        refusal: null,
      },
      logprobs: null,
      finish_reason: 'stop',
    },
  ],
  usage: {
    prompt_tokens: 90,
    completion_tokens: 1008,
    total_tokens: 1098,
  },
  system_fingerprint: 'fp_48196bc67a',
}
