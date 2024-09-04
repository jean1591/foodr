'use client'

import { RecipeItem } from '../../components/RecipeItems'
import { RecipeItem as RecipeItemType } from '@/utils/interfaces/recipes'

type DayOfTheWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

type WeeklyRecipes = Record<DayOfTheWeek, RecipeItemType[]>

export const WeeklyRecipes = () => {
  const weeklyRecipes: WeeklyRecipes = {
    monday: [
      { icon: '🍙', label: 'Rice', type: 'lunch' },
      { icon: '🍳', label: 'Eggs', type: 'dinner' },
    ],
    tuesday: [
      { icon: '🍙', label: 'Rice', type: 'lunch' },
      { icon: '🍳', label: 'Eggs', type: 'dinner' },
    ],
    wednesday: [
      { icon: '🍙', label: 'Rice', type: 'lunch' },
      { icon: '🍳', label: 'Eggs', type: 'dinner' },
    ],
    thursday: [
      { icon: '🍙', label: 'Rice', type: 'lunch' },
      { icon: '🍳', label: 'Eggs', type: 'dinner' },
    ],
    friday: [
      { icon: '🍙', label: 'Rice', type: 'lunch' },
      { icon: '🍳', label: 'Eggs', type: 'dinner' },
    ],
    saturday: [
      { icon: '🍙', label: 'Rice', type: 'lunch' },
      { icon: '🍳', label: 'Eggs', type: 'dinner' },
    ],
    sunday: [
      { icon: '🍙', label: 'Rice', type: 'lunch' },
      { icon: '🍳', label: 'Eggs', type: 'dinner' },
    ],
  }

  return (
    <div className="px-4">
      <p className="text-xl font-bold">This week's recipes</p>

      <div className="mt-4">
        <div className="space-y-8">
          {Object.entries(weeklyRecipes).map(([day, recipes]) => (
            <div className="space-y-4">
              <p className="text-lg font-bold capitalize">{day}</p>

              {recipes.map((recipe) => (
                <RecipeItem key={recipe.label} recipe={recipe} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
