export const DishItemSkeleton = () => {
  return (
    <div className="relative animate-pulse rounded-lg bg-slate-100 p-4 shadow-lg">
      <div className="absolute bottom-3/4 left-1/2 -translate-x-1/2 transform">
        <p className="rounded-full bg-white p-4 text-5xl">🦖</p>
      </div>

      <div className="mt-8">
        <p className="bg-slate-200 text-sm font-semibold capitalize text-slate-200">
          Lunch
        </p>
        <p className="mt-2 bg-slate-200 font-bold text-slate-200">
          Pasta de la mama
        </p>
        <p className="mt-4 bg-slate-200 text-xs text-slate-200">1234 kcal</p>
      </div>
    </div>
  )
}
