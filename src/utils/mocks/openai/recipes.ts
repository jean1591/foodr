import OpenAI from 'openai'

export const completionRecipes: OpenAI.Chat.Completions.ChatCompletion = {
  id: 'chatcmpl-A4px4TLtkR78hnb3XeovZpoRYtyFy',
  object: 'chat.completion',
  created: 1725716378,
  model: 'gpt-4o-mini-2024-07-18',
  choices: [
    {
      index: 0,
      message: {
        role: 'assistant',
        content:
          'Here is a JSON object of meal ideas following the provided format:\n\n```json\n{\n  "monday": [\n    {\n      "calories": 600,\n      "icon": "🍗",\n      "name": "Garlic Chicken with Rice",\n      "cookTime": 30,\n      "prepTime": 10,\n      "type": "lunch",\n      "description": "Juicy chicken thighs sautéed in garlic served over fluffy rice."\n    },\n    {\n      "calories": 450,\n      "icon": "🍳",\n      "name": "Egg Fried Rice",\n      "cookTime": 20,\n      "prepTime": 5,\n      "type": "dinner",\n      "description": "Stir-fried rice with eggs, veggies, and a hint of soy sauce."\n    }\n  ],\n  "tuesday": [\n    {\n      "calories": 500,\n      "icon": "🍚",\n      "name": "Chicken Stir-Fry",\n      "cookTime": 25,\n      "prepTime": 15,\n      "type": "lunch",\n      "description": "Sliced chicken breast stir-fried with garlic and mixed vegetables served with rice."\n    },\n    {\n      "calories": 400,\n      "icon": "🍳",\n      "name": "Oven-Baked Egg Muffins",\n      "cookTime": 25,\n      "prepTime": 10,\n      "type": "dinner",\n      "description": "Muffins made with beaten eggs, topped with herbs and cheese."\n    }\n  ],\n  "wednesday": [\n    {\n      "calories": 550,\n      "icon": "🍗",\n      "name": "Garlic Lemon Chicken",\n      "cookTime": 35,\n      "prepTime": 15,\n      "type": "lunch",\n      "description": "Marinated chicken baked with garlic and lemon juice, served with rice."\n    },\n    {\n      "calories": 350,\n      "icon": "🍚",\n      "name": "Rice and Beans Bowl",\n      "cookTime": 20,\n      "prepTime": 10,\n      "type": "dinner",\n      "description": "A wholesome bowl of rice with black beans, topped with spices."\n    }\n  ],\n  "thursday": [\n    {\n      "calories": 550,\n      "icon": "🍳",\n      "name": "Vegetable Omelette",\n      "cookTime": 15,\n      "prepTime": 5,\n      "type": "lunch",\n      "description": "Fluffy omelette filled with mixed vegetables and served with brown rice."\n    },\n    {\n      "calories": 600,\n      "icon": "🍗",\n      "name": "Spicy Chicken Tacos",\n      "cookTime": 30,\n      "prepTime": 10,\n      "type": "dinner",\n      "description": "Tacos filled with spicy shredded chicken, garnished with fresh garlic sauce."\n    }\n  ],\n  "friday": [\n    {\n      "calories": 450,\n      "icon": "🍚",\n      "name": "Chicken Rice Bowl",\n      "cookTime": 20,\n      "prepTime": 10,\n      "type": "lunch",\n      "description": "A wholesome bowl of rice topped with stir-fried chicken and garlic sauce."\n    },\n    {\n      "calories": 500,\n      "icon": "🍳",\n      "name": "Shakshuka",\n      "cookTime": 30,\n      "prepTime": 5,\n      "type": "dinner",\n      "description": "Poached eggs in a spicy tomato sauce, served with crusty bread and garlic."\n    }\n  ]\n}\n```\n\nThis JSON object contains a variety of meal ideas for each day of the week, respecting the specified ingredient constraints while offering different meals and using diverse ingredients.',
        refusal: null,
      },
      logprobs: null,
      finish_reason: 'stop',
    },
  ],
  usage: {
    prompt_tokens: 216,
    completion_tokens: 831,
    total_tokens: 1047,
  },
  system_fingerprint: 'fp_483d39d857',
}

export const completionRecipesMondayToSunday: OpenAI.Chat.Completions.ChatCompletion =
  {
    id: 'chatcmpl-A4qHmCAOTyBjwVjiy1jx4y8y9lB4z',
    object: 'chat.completion',
    created: 1725717662,
    model: 'gpt-4o-mini-2024-07-18',
    choices: [
      {
        index: 0,
        message: {
          role: 'assistant',
          content:
            'Here’s a JSON object with meal ideas for each day of the week, including breakfast, lunch, and dinner. Each meal comes with details like calories, icon, cook time, prep time, type, and a description.\n\n```json\n{\n  "monday": [\n    {\n      "calories": 300,\n      "icon": "🍳",\n      "name": "Avocado Toast",\n      "cookTime": 10,\n      "prepTime": 5,\n      "type": "breakfast",\n      "description": "Smashed avocado on whole-grain toast topped with cherry tomatoes and a sprinkle of salt."\n    },\n    {\n      "calories": 600,\n      "icon": "🥗",\n      "name": "Quinoa Salad with Chickpeas",\n      "cookTime": 20,\n      "prepTime": 15,\n      "type": "lunch",\n      "description": "A refreshing salad made with quinoa, chickpeas, cucumbers, and a lemon vinaigrette."\n    },\n    {\n      "calories": 700,\n      "icon": "🍝",\n      "name": "Spaghetti Bolognese",\n      "cookTime": 30,\n      "prepTime": 10,\n      "type": "dinner",\n      "description": "Classic spaghetti served with a rich ground beef and tomato sauce."\n    }\n  ],\n  "tuesday": [\n    {\n      "calories": 350,\n      "icon": "🥣",\n      "name": "Overnight Oats",\n      "cookTime": 0,\n      "prepTime": 5,\n      "type": "breakfast",\n      "description": "Rolled oats soaked overnight in almond milk with chia seeds and topped with fruits."\n    },\n    {\n      "calories": 550,\n      "icon": "🌯",\n      "name": "Chicken Wrap",\n      "cookTime": 15,\n      "prepTime": 10,\n      "type": "lunch",\n      "description": "Grilled chicken, lettuce, and salsa wrapped in a whole wheat tortilla."\n    },\n    {\n      "calories": 800,\n      "icon": "🐟",\n      "name": "Grilled Salmon with Asparagus",\n      "cookTime": 25,\n      "prepTime": 10,\n      "type": "dinner",\n      "description": "Juicy grilled salmon served with roasted asparagus and quinoa."\n    }\n  ],\n  "wednesday": [\n    {\n      "calories": 400,\n      "icon": "🥑",\n      "name": "Smoothie Bowl",\n      "cookTime": 0,\n      "prepTime": 10,\n      "type": "breakfast",\n      "description": "A thick smoothie topped with granola, nuts, and fresh fruit."\n    },\n    {\n      "calories": 500,\n      "icon": "🍱",\n      "name": "Turkey and Cheese Sandwich",\n      "cookTime": 5,\n      "prepTime": 5,\n      "type": "lunch",\n      "description": "Sliced turkey and cheese on whole grain bread, served with a side of mixed greens."\n    },\n    {\n      "calories": 600,\n      "icon": "🥘",\n      "name": "Vegetable Stir Fry",\n      "cookTime": 15,\n      "prepTime": 10,\n      "type": "dinner",\n      "description": "A colorful mix of stir-fried vegetables served with brown rice."\n    }\n  ],\n  "thursday": [\n    {\n      "calories": 300,\n      "icon": "🥞",\n      "name": "Pancakes with Maple Syrup",\n      "cookTime": 20,\n      "prepTime": 5,\n      "type": "breakfast",\n      "description": "Fluffy pancakes served with pure maple syrup and fresh berries."\n    },\n    {\n      "calories": 550,\n      "icon": "🥙",\n      "name": "Greek Salad with Feta",\n      "cookTime": 10,\n      "prepTime": 10,\n      "type": "lunch",\n      "description": "A traditional Greek salad with cucumbers, tomatoes, olives, and feta cheese."\n    },\n    {\n      "calories": 750,\n      "icon": "🍕",\n      "name": "Margherita Pizza",\n      "cookTime": 25,\n      "prepTime": 10,\n      "type": "dinner",\n      "description": "Thin crust pizza topped with tomatoes, mozzarella, and fresh basil."\n    }\n  ],\n  "friday": [\n    {\n      "calories": 350,\n      "icon": "🍏",\n      "name": "Fruit Parfait",\n      "cookTime": 0,\n      "prepTime": 10,\n      "type": "breakfast",\n      "description": "Layers of yogurt, granola, and assorted fresh fruits in a parfait glass."\n    },\n    {\n      "calories": 500,\n      "icon": "🍝",\n      "name": "Caprese Pasta",\n      "cookTime": 15,\n      "prepTime": 10,\n      "type": "lunch",\n      "description": "Pasta tossed with cherry tomatoes, basil, mozzarella, and olive oil."\n    },\n    {\n      "calories": 700,\n      "icon": "🍗",\n      "name": "Roast Chicken with Vegetables",\n      "cookTime": 40,\n      "prepTime": 15,\n      "type": "dinner",\n      "description": "Succulent roast chicken served with a medley of roasted seasonal vegetables."\n    }\n  ],\n  "saturday": [\n    {\n      "calories": 375,\n      "icon": "🥚",\n      "name": "Egg and Veggie Scramble",\n      "cookTime": 15,\n      "prepTime": 5,\n      "type": "breakfast",\n      "description": "Scrambled eggs mixed with bell peppers, onions, and spinach."\n    },\n    {\n      "calories": 600,\n      "icon": "🥩",\n      "name": "Beef Tacos",\n      "cookTime": 20,\n      "prepTime": 10,\n      "type": "lunch",\n      "description": "Soft corn tortillas filled with seasoned beef, lettuce, and cheese."\n    },\n    {\n      "calories": 800,\n      "icon": "🍱",\n      "name": "Shrimp Fried Rice",\n      "cookTime": 30,\n      "prepTime": 10,\n      "type": "dinner",\n      "description": "Stir-fried rice with shrimp, peas, carrots, and egg."\n    }\n  ],\n  "sunday": [\n    {\n      "calories": 400,\n      "icon": "🥘",\n      "name": "Breakfast Burrito",\n      "cookTime": 20,\n      "prepTime": 5,\n      "type": "breakfast",\n      "description": "A tortilla stuffed with scrambled eggs, cheese, and salsa."\n    },\n    {\n      "calories": 550,\n      "icon": "🍜",\n      "name": "Chicken Noodle Soup",\n      "cookTime": 30,\n      "prepTime": 15,\n      "type": "lunch",\n      "description": "Warm chicken soup with noodles, carrots, and celery."\n    },\n    {\n      "calories": 700,\n      "icon": "🥩",\n      "name": "Steak with Sweet Potatoes",\n      "cookTime": 25,\n      "prepTime": 10,\n      "type": "dinner",\n      "description": "Grilled steak served with roasted sweet potatoes and a side salad."\n    }\n  ]\n}\n```\n\nThis JSON object includes a variety of meals for each day of the week, ensuring diversity in ingredients and cooking styles.',
          refusal: null,
        },
        logprobs: null,
        finish_reason: 'stop',
      },
    ],
    usage: {
      prompt_tokens: 167,
      completion_tokens: 1680,
      total_tokens: 1847,
    },
    system_fingerprint: 'fp_483d39d857',
  }
