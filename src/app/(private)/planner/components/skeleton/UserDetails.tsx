export const UserDetailsSkeleton = () => {
  return (
    <div className="flex animate-pulse items-center justify-between">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200">
        <p className="text-center text-2xl font-medium uppercase text-slate-200">
          J
        </p>
      </div>
      <div className="flex items-center justify-end gap-x-2">
        <p className="bg-slate-200 text-right text-2xl font-bold text-slate-200">
          5 5 5
        </p>
      </div>
    </div>
  )
}
