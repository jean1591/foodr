export const Instructions = () => {
  return (
    <div className="animate-pulse text-lg">
      <p className="font-bold">Instructions</p>

      <div className="mt-2">
        {[1, 2, 3, 4].map((instruction) => (
          <div
            key={instruction}
            className="mt-4 flex items-start justify-start space-x-4"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 p-4">
              <p>{instruction}</p>
            </div>
            <p className="bg-slate-200 text-slate-200">
              Small instruction to prepare a good meal
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
