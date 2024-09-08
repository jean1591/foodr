import { Header } from './components/recipeDetails/Header'
import { OptionButtons } from './components/OptionButtons'
import { OptionsPanel } from './components/OptionsPanel'
import { RightPanel } from './components/RightPanel'

export default function Generate() {
  return (
    <div className="mx-auto py-16 md:max-w-7xl">
      <Header />

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
