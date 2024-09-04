import { OptionButtons } from './components/OptionButtons'
import { OptionsPanel } from './components/OptionsPanel'
import { RightPanel } from './components/RightPanel'

export default function Generate() {
  return (
    <div className="mx-auto py-16 md:max-w-7xl">
      <div className="flex items-center justify-center">
        <p className="text-8xl font-extrabold leading-none tracking-tight">
          Foodr
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-24">
        <div>
          <OptionsPanel />
          <div className="mt-8">
            <OptionButtons />
          </div>
        </div>

        <RightPanel />
      </div>
    </div>
  )
}
