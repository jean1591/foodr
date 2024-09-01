import { DishItem } from './DishItems'
import { RecipeItem } from '@/utils/interfaces/recipes'
import { buttonHoverTransition } from '@/utils/design/constants'
import { classNames } from '@/utils/classNames'

async function getTodayRecipes() {
  // TODO: Change recipe for recipes one legacy is gone
  const recipesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipe/v2/today`
  )
  const { recipes } = (await recipesResponse.json()) as {
    recipes: RecipeItem[]
  }

  return { recipes }
}

export const TodayRecipes = async () => {
  const { recipes } = await getTodayRecipes()

  return (
    <div className="px-4">
      <p className="text-xl font-bold">Today's recipes</p>

      <div className="mt-4">
        {recipes.length === 0 && (
          <div>
            <p className="text-center">
              No meal plan were found for today, generate a one to get ideas
            </p>

            <button
              className={classNames(
                buttonHoverTransition,
                'mt-4 flex w-full items-center justify-center space-x-4 rounded-xl bg-white py-4 text-slate-600 shadow-lg hover:shadow-none'
              )}
            >
              <p>Generate a weekly meals plan</p>
            </button>
          </div>
        )}

        {recipes.length > 0 && (
          <div className="space-y-4">
            {recipes.map((recipe) => (
              <DishItem key={recipe.label} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
