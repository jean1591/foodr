export const UserDetailsSkeleton = () => {
  return (
    <div className="bg-blue-100 px-4 pb-16 pt-8">
      <h1 className="text-2xl font-bold">Good morning !</h1>

      <div className="mt-4 animate-pulse space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="bg-slate-200 text-lg font-medium capitalize text-slate-200">
              Jean Robertou II
            </p>
            <p className="text-xs font-light">Username</p>
          </div>
          <div>
            <p className="bg-slate-200 text-lg font-medium text-slate-200">
              123
            </p>
            <p className="text-xs font-light">Credits</p>
          </div>
        </div>
      </div>
    </div>
  )
}
