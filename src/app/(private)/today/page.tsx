import { GenerateMealButton } from './components/GenerateMealButton'
import { LatestRecipes } from './components/LatestRecipes'
import { QuickRecipes } from './components/QuickRecipes'
import { Recipe } from './components/Recipe'
import { TodayRecipes } from './components/TodayRecipes'
import { UserDetails } from './components/UserDetails'

export default function Today() {
  return (
    <div className="mx-auto pb-12 md:max-w-2xl">
      <UserDetails />

      <div className="relative">
        <GenerateMealButton />
      </div>

      <div className="mt-16">
        <QuickRecipes />
      </div>

      <div className="mt-12">
        <TodayRecipes />
      </div>

      <div className="mt-12">
        <LatestRecipes />
      </div>

      <Recipe />
    </div>
  )
}