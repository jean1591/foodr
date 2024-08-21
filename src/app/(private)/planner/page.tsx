import { Dishes } from './components/Dishes'
import { UserDetails } from './components/UserDetails'
import { WeekPlanner } from './components/WeekPlanner'

export default function Home() {
  return (
    <div className="mt-20 space-y-20 rounded-lg bg-white p-8 shadow-lg">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="order-2 space-y-20 md:order-1 md:col-span-3">
          <WeekPlanner />
        </div>

        <div className="order-1 md:order-2">
          <UserDetails />
        </div>
      </div>

      <Dishes />
    </div>
  )
}
