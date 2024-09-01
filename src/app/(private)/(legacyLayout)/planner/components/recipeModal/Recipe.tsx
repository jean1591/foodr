import { Ingredients } from './Ingredients'
import { Instructions } from './Instructions'
import { Recipe as RecipeSkeleton } from './skeletons/Recipe'
import { RootState } from '@/app/lib/store/store'
import { useSelector } from 'react-redux'

export const Recipe = () => {
  const { recipeDetails } = useSelector((state: RootState) => state.meals)

  if (!recipeDetails) {
    return <RecipeSkeleton />
  }

  const { description, cookTime, prepTime, ingredients, instructions } =
    recipeDetails

  return (
    <div>
      <p className="text-center text-slate-600">{description}</p>

      <div className="mt-4 grid grid-cols-3 space-x-4 text-center">
        <div className="p-2">
          <p className="text-xl font-bold">2</p>
          <p className="text-sm text-slate-600">Servings</p>
        </div>
        <div className="p-2">
          <p className="text-xl font-bold">{prepTime} mn</p>
          <p className="text-sm text-slate-600">Preparation</p>
        </div>
        <div className="p-2">
          <p className="text-xl font-bold">{cookTime} mn</p>
          <p className="text-sm text-slate-600">Cook</p>
        </div>
      </div>

      <div className="mt-8">
        <Ingredients ingredients={ingredients} />
      </div>

      <div className="mt-8">
        <Instructions instructions={instructions} />
      </div>
    </div>
  )
}
