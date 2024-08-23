import { Dishes } from './components/Dishes'
import { GenerateMealPlanButton } from './components/GenerateMealPlanButton'
import { Options } from './components/Options'
import { UserDetails } from './components/UserDetails'

export default function Planner() {
  return (
    <div className="my-12 space-y-12">
      <UserDetails />
      <Options />
      <GenerateMealPlanButton />
      <Dishes />
    </div>
  )
}
