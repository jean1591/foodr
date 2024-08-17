import { NextRequest, NextResponse } from 'next/server'

import { WeeklyMeals } from '@/utils/interfaces/meals'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { filters }: { filters: string[] } = await request.json()

  const weeklyMeals: WeeklyMeals = {
    monday: {
      breakfast: {
        name: 'Oatmeal with Berries',
        calories: 250,
        icon: '🥣',
        color: 'blue',
      },
      lunch: {
        name: 'Grilled Chicken Salad',
        calories: 350,
        icon: '🥗',
        color: 'green',
      },
      dinner: {
        name: 'Spaghetti Bolognese',
        calories: 600,
        icon: '🍝',
        color: 'red',
      },
    },
    tuesday: {
      breakfast: {
        name: 'Greek Yogurt with Honey',
        calories: 200,
        icon: '🍯',
        color: 'yellow',
      },
      lunch: {
        name: 'Turkey Sandwich',
        calories: 400,
        icon: '🥪',
        color: 'gray',
      },
      dinner: {
        name: 'Baked Salmon with Veggies',
        calories: 500,
        icon: '🐟',
        color: 'teal',
      },
    },
    wednesday: {
      breakfast: {
        name: 'Avocado Toast',
        calories: 300,
        icon: '🍞',
        color: 'green',
      },
      lunch: {
        name: 'Veggie Stir-fry',
        calories: 300,
        icon: '🥦',
        color: 'green',
      },
      dinner: {
        name: 'Chicken Tacos',
        calories: 550,
        icon: '🌮',
        color: 'yellow',
      },
    },
    thursday: {
      breakfast: {
        name: 'Smoothie Bowl',
        calories: 350,
        icon: '🍌',
        color: 'purple',
      },
      lunch: {
        name: 'Quinoa and Avocado Bowl',
        calories: 400,
        icon: '🥑',
        color: 'green',
      },
      dinner: {
        name: 'Beef Stew',
        calories: 650,
        icon: '🥘',
        color: 'brown',
      },
    },
    friday: {
      breakfast: {
        name: 'Pancakes with Maple Syrup',
        calories: 400,
        icon: '🥞',
        color: 'yellow',
      },
      lunch: {
        name: 'Caprese Salad',
        calories: 350,
        icon: '🍅',
        color: 'red',
      },
      dinner: {
        name: 'Pizza Margherita',
        calories: 700,
        icon: '🍕',
        color: 'red',
      },
    },
    saturday: {
      breakfast: {
        name: 'Scrambled Eggs with Toast',
        calories: 300,
        icon: '🍳',
        color: 'yellow',
      },
      lunch: {
        name: 'Chicken Caesar Wrap',
        calories: 450,
        icon: '🌯',
        color: 'blue',
      },
      dinner: {
        name: 'Grilled Steak with Potatoes',
        calories: 750,
        icon: '🥩',
        color: 'gray',
      },
    },
    sunday: {
      breakfast: {
        name: 'Bagel with Cream Cheese',
        calories: 350,
        icon: '🥯',
        color: 'orange',
      },
      lunch: {
        name: 'Tomato Soup with Bread',
        calories: 300,
        icon: '🍲',
        color: 'red',
      },
      dinner: {
        name: 'Roast Chicken with Vegetables',
        calories: 600,
        icon: '🍗',
        color: 'yellow',
      },
    },
  }

  return NextResponse.json({ weeklyMeals })
}
