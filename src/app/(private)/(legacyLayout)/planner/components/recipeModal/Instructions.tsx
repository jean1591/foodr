import { Instruction as InstructionType } from '@/utils/interfaces/recipes'
import { RootState } from '@/app/lib/store/store'
import { classNames } from '@/utils/classNames'
import useColour from '../hook/useColour'
import { useSelector } from 'react-redux'

export const Instructions = ({
  instructions,
}: {
  instructions: InstructionType[]
}) => {
  const { selectedMeal } = useSelector((state: RootState) => state.meals)

  if (!selectedMeal) {
    return <></>
  }

  const { bgColor } = useColour(selectedMeal.meal.color)

  return (
    <div className="text-lg">
      <p className="font-bold">Instructions</p>

      <div className="mt-2">
        {instructions.map((instruction) => (
          <div
            key={instruction.stepNumber}
            className="mt-4 flex items-start justify-start space-x-4"
          >
            <div
              className={classNames(
                bgColor,
                'flex h-8 w-8 items-center justify-center rounded-lg p-4'
              )}
            >
              <p>{instruction.stepNumber}</p>
            </div>
            <p>{instruction.instruction}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
