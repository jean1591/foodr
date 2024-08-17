import { Dishes } from './components/Dishes'

export default function Home() {
  return (
    <div>
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <div className="rounded-lg bg-green-100 px-4 py-12 shadow-lg">
          <p className="text-2xl font-bold">Create a weekly meal plan</p>
        </div>

        <div className="mt-8">
          <Dishes />
        </div>
      </div>
    </div>
  )
}
