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
    <div>
      {days.map((day) => (
        <div key={day}>
          <p className="text-xl font-bold capitalize">{day}</p>
          <div className="mb-16 mt-4 grid grid-cols-3 gap-8">
            {fakeMeals.map((meal) => (
              <DishItemSkeleton key={meal} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
