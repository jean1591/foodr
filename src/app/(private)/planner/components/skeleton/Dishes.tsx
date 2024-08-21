import { DishItemSkeleton } from './DishItem'

const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

const fakeMeals = [1, 2, 3]

export const DishesSkeleton = () => {
  return (
    <div className="space-y-12 md:space-y-20">
      {days.map((day) => (
        <div key={day}>
          <p className="text-xl font-bold capitalize">{day}</p>
          <div className="mt-4 space-y-8">
            {fakeMeals.map((meal) => (
              <DishItemSkeleton key={meal} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
