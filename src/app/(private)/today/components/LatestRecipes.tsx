import { DishItem } from './DishItems'
import { RecipeItem } from '@/utils/interfaces/recipes'

async function getLatestRecipes() {
  // TODO: Change recipe for recipes one legacy is gone
  const recipesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipe/v2/latest`
  )
  const { recipes } = (await recipesResponse.json()) as {
    recipes: RecipeItem[]
  }

  return { recipes }
}

export const LatestRecipes = async () => {
  const { recipes } = await getLatestRecipes()

  return (
    <div className="px-4">
      <p className="text-xl font-bold">Latest recipes</p>

      <div className="mt-4 space-y-4">
        {recipes.map((recipe) => (
          <DishItem key={recipe.label} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}
