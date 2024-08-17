import { Dishes } from './components/Dishes'
import { WeekPlanner } from './components/WeekPlanner'

export default function Home() {
  return (
    <div>
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <WeekPlanner />

        <div className="mt-8">
          <Dishes />
        </div>
      </div>
    </div>
  )
}
