import { DishItemSkeleton } from './DishItems'

const todayRecipes = [1, 2]

export const LatestAndTodayRecipesSkeleton = ({ title }: { title: string }) => {
  return (
    <div className="px-4">
      <p className="text-xl font-bold">{title}</p>
      <div className="mt-4 space-y-4">
        {todayRecipes.map((recipe) => (
          <DishItemSkeleton key={recipe} />
        ))}
      </div>
    </div>
  )
}
