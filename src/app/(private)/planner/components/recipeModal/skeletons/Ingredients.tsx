export const Ingredients = () => {
  return (
    <div className="animate-pulse text-lg">
      <p className="font-bold">Ingredients</p>

      <div className="mt-2">
        {[1, 2, 3, 4].map((ingredient) => (
          <div
            key={ingredient}
            className="flex items-center justify-between space-x-2"
          >
            <div className="flex items-center justify-start space-x-2">
              <p>🦖</p>
              <p className="bg-slate-200 text-slate-200">
                ingredient ingredient
              </p>
            </div>

            <p className="w-10 bg-slate-200 text-slate-200">2</p>
          </div>
        ))}
      </div>
    </div>
  )
}
