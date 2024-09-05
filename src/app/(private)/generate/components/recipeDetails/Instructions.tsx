import { Instruction } from '@/utils/interfaces/recipes'

export const Instructions = ({
  instructions,
}: {
  instructions: Instruction[]
}) => {
  return (
    <div>
      <p className="text-left text-xl font-bold">Instructions</p>

      <div className="mt-4 space-y-8">
        {instructions.map(({ stepNumber, instruction }) => (
          <div key={stepNumber}>
            <div className="flex items-center justify-center gap-x-4">
              <p className="text-nowrap text-lg font-medium">
                Step {stepNumber}
              </p>

              <div className="h-[2px] w-full bg-slate-950"></div>
            </div>

            <p className="mt-2">{instruction}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
