import { BorderGradient } from '@/app/design/BorderGradient'
import { ButtonParameter } from '../../planner/components/ButtonParameter'
import { Option } from '@/utils/interfaces/options'

export const Step = ({
  title,
  options,
}: {
  title: string
  options: Option[]
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-center text-2xl font-semibold">{title}</p>

      <div className="mt-8 w-full">
        <BorderGradient>
          <div className="flex w-full flex-wrap items-center justify-center gap-4 rounded-lg bg-green-50 p-8">
            {options.map((option) => (
              <ButtonParameter
                key={option.label}
                label={option.label}
                onClickHandler={option.onClick}
                selected={option.selected}
              />
            ))}
          </div>
        </BorderGradient>
      </div>
    </div>
  )
}
