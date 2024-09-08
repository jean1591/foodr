'use client'

import { useDispatch, useSelector } from 'react-redux'

import { PiArrowsClockwise } from 'react-icons/pi'
import { RootState } from '@/app/lib/store/store'
import { WeeklyRecipes } from '@/utils/interfaces/recipes'
import { buttonHoverTransition } from '@/utils/design/constants'
import { classNames } from '@/utils/classNames'
import { resetOptions } from '@/app/lib/store/features/options/slice'
import { setIsrecipesLoading } from '@/app/lib/store/features/interactions/slice'
import { setRecipes } from '@/app/lib/store/features/recipes/slice'
import { useRouter } from 'next/navigation'

export const OptionButtons = ({ canGenerate }: { canGenerate: boolean }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const options = useSelector((state: RootState) => state.options)
  const { isRecipesLoading } = useSelector(
    (state: RootState) => state.interactions
  )

  const handleGenerateWeeklyRecipes = () => {
    ;(async function getWeeklyRecipes() {
      dispatch(setIsrecipesLoading(true))
      const recipesResponse = await fetch('/api/recipes/generate', {
        method: 'POST',
        body: JSON.stringify({
          options,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const { recipes } = (await recipesResponse.json()) as {
        recipes: WeeklyRecipes
      }

      dispatch(setRecipes(recipes))
      dispatch(setIsrecipesLoading(false))
      router.push('/generate')
    })()
  }

  return (
    <div className="grid grid-cols-4 gap-x-4">
      <button
        onClick={() => dispatch(resetOptions())}
        className={classNames(
          buttonHoverTransition,
          'col-span-1 rounded-xl border-2 border-slate-950 py-4 text-center font-bold uppercase hover:bg-blue-100 hover:shadow-xl'
        )}
      >
        Reset
      </button>
      <button
        disabled={canGenerate}
        onClick={handleGenerateWeeklyRecipes}
        className={classNames(
          buttonHoverTransition,
          'col-span-3 flex items-center justify-center gap-x-4 rounded-xl border-2 border-blue-950 bg-blue-950 py-4 text-center font-bold uppercase text-white hover:opacity-90 hover:shadow-xl disabled:border-opacity-20 disabled:bg-opacity-20 disabled:hover:shadow-none'
        )}
      >
        {isRecipesLoading && (
          <PiArrowsClockwise className="h-6 w-6 animate-spin" />
        )}
        <p>Generate meal plan</p>
      </button>
    </div>
  )
}
