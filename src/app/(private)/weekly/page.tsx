import { GenerateWeeklyMealButton } from './components/GenerateMealButton'
import { Recipe } from '../components/Recipe'
import { UserDetails } from '../components/UserDetails'

export default function Weekly() {
  return (
    <div className="mx-auto pb-12 md:max-w-2xl">
      <UserDetails />

      <div className="relative">
        <GenerateWeeklyMealButton />
      </div>

      <Recipe />
    </div>
  )
}
