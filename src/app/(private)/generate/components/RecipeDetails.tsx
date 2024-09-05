import { useDispatch, useSelector } from 'react-redux'

import { Ingredients } from './recipeDetails/Ingredients'
import { Instructions } from './recipeDetails/Instructions'
import { PiArrowCircleLeft } from 'react-icons/pi'
import { RootState } from '@/app/lib/store/store'
import { Stats } from './recipeDetails/Stats'
import { setDisplayRecipeDetails } from '@/app/lib/store/features/interactions/slice'

// TODO: fetch recipe from DB or OpenAi with selectedRecipe
export const RecipeDetails = () => {
  const dispatch = useDispatch()
  const { recipe } = useSelector((state: RootState) => state.recipes)
  const { displayRecipeDetails } = useSelector(
    (state: RootState) => state.interactions
  )

  // TODO: add skeleton
  if (!recipe) {
    return <></>
  }

  const { cookTime, description, ingredients, instructions, name, prepTime } =
    recipe

  return (
    <div>
      <div className="relative">
        <p className="text-center text-2xl font-bold">{name}</p>
        <button
          onClick={() => dispatch(setDisplayRecipeDetails(false))}
          className="absolute -translate-y-full"
        >
          <PiArrowCircleLeft className="h-8 w-8" />
        </button>
      </div>
      <p className="mt-8 text-center">{description}</p>

      <div className="mt-8">
        <Stats prepTime={prepTime} cookTime={cookTime} />
      </div>

      <div className="mt-16">
        <Ingredients ingredients={ingredients} />
      </div>

      <div className="mt-16">
        <Instructions instructions={instructions} />
      </div>
    </div>
  )
}
