import { Dishes } from './components/Dishes'
import { UserDetails } from './components/UserDetails'
import { WeekPlanner } from './components/WeekPlanner'

export default function Home() {
  return (
    <div className="my-20 space-y-12">
      <UserDetails />
      <WeekPlanner />
      <Dishes />
    </div>
  )
}
