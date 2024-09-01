export const DishItemSkeleton = () => {
  return (
    <div>
      <div className="flex items-center justify-between space-x-4 rounded-lg bg-white pr-2 shadow-lg hover:cursor-pointer">
        <div className="flex animate-pulse items-center justify-start space-x-4">
          <p className="rounded-r-none rounded-s-lg bg-blue-100 p-4 text-4xl md:text-5xl">
            🍙
          </p>

          <div>
            <p className="bg-slate-200 text-sm font-semibold capitalize text-slate-200">
              Lunch
            </p>
            <p className="bg-slate-200 font-bold text-slate-200">
              Korean Onigiri
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
