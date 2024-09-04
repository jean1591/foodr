import { GenerateWeeklyMealsButton } from './components/GenerateWeeklyMealsButton'
import { Recipe } from '../components/Recipe'
import { UserDetails } from '../components/UserDetails'
import { WeeklyRecipes } from './components/WeeklyRecipes'

export default function Weekly() {
  return (
    <div className="mx-auto pb-12 md:max-w-2xl">
      <UserDetails />

      <div className="relative">
        <GenerateWeeklyMealsButton />
      </div>

      <div className="mt-16">
        <WeeklyRecipes />
      </div>

      <Recipe />
    </div>
  )
}
