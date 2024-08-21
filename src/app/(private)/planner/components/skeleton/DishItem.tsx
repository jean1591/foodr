export const DishItemSkeleton = () => {
  return (
    <div className="flex animate-pulse items-center justify-start space-x-8 rounded-lg border-2 shadow-lg">
      <p className="rounded-sm bg-slate-200 p-4 text-4xl text-slate-200 md:text-5xl">
        🦖
      </p>

      <div className="w-full pr-8">
        <p className="w-1/2 bg-slate-200 text-sm text-slate-200">Lunch</p>
        <p className="mt-2 bg-slate-200 text-slate-200">Pasta de la Mama</p>
      </div>
    </div>
  )
}
