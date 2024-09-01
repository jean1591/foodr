import { DishItem } from './DishItems'

export const LatestRecipes = () => {
  const latestRecipes = [
    { icon: '🍝', label: 'Spaghetti Carbonara', type: 'lunch' },
    { icon: '🌮', label: 'Quesadilla', type: 'dinner' },
    { icon: '🍕', label: 'Margherita Pizza', type: 'dinner' },
  ]

  return (
    <div className="px-4">
      <p className="text-xl font-bold">Latest recipes</p>

      <div className="mt-4 space-y-4">
        {latestRecipes.map((recipe) => (
          <DishItem key={recipe.label} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}
