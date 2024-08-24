import { BorderGradient } from '@/app/design/BorderGradient'
import { ButtonParameter } from '../../planner/components/ButtonParameter'
import { Option } from '@/utils/interfaces/options'

export const Step = ({
  details,
  title,
  options,
}: {
  details: string
  title: string
  options: Option[]
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-center text-2xl font-semibold">{title}</p>

      <div className="mt-8 w-full">
        <BorderGradient>
          <div className="w-full rounded-lg bg-green-50 p-8">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {options.map((option) => (
                <ButtonParameter
                  key={option.label}
                  label={option.label}
                  onClickHandler={option.onClick}
                  selected={option.selected}
                />
              ))}
            </div>

            <p className="mt-4 text-center text-sm font-medium text-slate-600">
              {details}
            </p>
          </div>
        </BorderGradient>
      </div>
    </div>
  )
}
