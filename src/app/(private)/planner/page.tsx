import { Dishes } from './components/Dishes'
import { GenerateMealPlanButton } from './components/GenerateMealPlanButton'
import { Options } from './components/Options'
import { UserDetails } from './components/UserDetails'

// TODO: rename planner
export default function Home() {
  return (
    <div className="my-12 space-y-12">
      <UserDetails />
      <Options />
      <GenerateMealPlanButton />
      <Dishes />
    </div>
  )
}
