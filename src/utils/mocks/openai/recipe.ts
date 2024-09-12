import OpenAI from 'openai'

export const completionRecipe: OpenAI.Chat.Completions.ChatCompletion = {
  id: 'chatcmpl-A4jl52rLktARqlGhGOj1R5O1S3anJ',
  object: 'chat.completion',
  created: 1725692571,
  model: 'gpt-4o-mini-2024-07-18',
  choices: [
    {
      index: 0,
      message: {
        role: 'assistant',
        content:
          'Here is a JSON object for the recipe "Beef and Broccoli Stir-fry" as per your specifications:\n\n```json\n{\n  "label": "Beef and Broccoli Stir-fry",\n  "cookTime": 15,\n  "description": "A quick and tasty stir-fry dish featuring tender beef and fresh broccoli, perfect for a weeknight dinner.",\n  "ingredients": [\n    {\n      "icon": "🥩",\n      "name": "Beef sirloin",\n      "quantity": 300,\n      "unit": "grams"\n    },\n    {\n      "icon": "🥦",\n      "name": "Broccoli florets",\n      "quantity": 200,\n      "unit": "grams"\n    },\n    {\n      "icon": "🧄",\n      "name": "Garlic",\n      "quantity": 2,\n      "unit": "cloves"\n    },\n    {\n      "icon": "🧅",\n      "name": "Onion",\n      "quantity": 1,\n      "unit": "medium"\n    },\n    {\n      "icon": "🌶️",\n      "name": "Soy sauce",\n      "quantity": 60,\n      "unit": "milliliters"\n    },\n    {\n      "icon": "🌽",\n      "name": "Cornstarch",\n      "quantity": 15,\n      "unit": "grams"\n    },\n    {\n      "icon": "🧂",\n      "name": "Salt",\n      "quantity": 1,\n      "unit": "teaspoon"\n    },\n    {\n      "icon": "🥄",\n      "name": "Vegetable oil",\n      "quantity": 2,\n      "unit": "tablespoons"\n    },\n    {\n      "icon": "🌱",\n      "name": "Sesame seeds",\n      "quantity": 5,\n      "unit": "grams"\n    }\n  ],\n  "instructions": [\n    {\n      "instruction": "Slice the beef sirloin thinly against the grain.",\n      "stepNumber": 1\n    },\n    {\n      "instruction": "In a bowl, mix the sliced beef with soy sauce, cornstarch, and a pinch of salt. Let it marinate for 10 minutes.",\n      "stepNumber": 2\n    },\n    {\n      "instruction": "Heat the vegetable oil in a large pan or wok over medium-high heat.",\n      "stepNumber": 3\n    },\n    {\n      "instruction": "Add the marinated beef to the hot pan and stir-fry for about 5 minutes until browned.",\n      "stepNumber": 4\n    },\n    {\n      "instruction": "Add minced garlic and sliced onion to the pan, stir-frying for an additional 2 minutes.",\n      "stepNumber": 5\n    },\n    {\n      "instruction": "Add the broccoli florets to the pan and stir-fry for another 5-7 minutes until they are tender yet crisp.",\n      "stepNumber": 6\n    },\n    {\n      "instruction": "Garnish with sesame seeds and serve hot over rice or noodles.",\n      "stepNumber": 7\n    }\n  ],\n  "name": "Beef and Broccoli Stir-fry",\n  "prepTime": 10\n}\n```\n\nThis JSON object follows the structure you provided and includes a complete recipe for Beef and Broccoli Stir-fry, including ingredients and instructions.',
        refusal: null,
      },
      logprobs: null,
      finish_reason: 'stop',
    },
  ],
  usage: {
    prompt_tokens: 149,
    completion_tokens: 721,
    total_tokens: 870,
  },
  system_fingerprint: 'fp_483d39d857',
}
