export const LatestRecipes = () => {
  const latestRecipes = [
    { icon: '🍝', label: 'Spaghetti Carbonara', type: 'lunch' },
    { icon: '🌮', label: 'Quesadilla', type: 'dinner' },
    { icon: '🍕', label: 'Margherita Pizza', type: 'dinner' },
  ]

  return (
    <div className="px-4">
      <p className="text-xl font-bold">Latest recipes</p>

      <div className="mt-4 space-y-4">
        {latestRecipes.map(({ icon, label, type }) => (
          <div className="flex items-center justify-between space-x-4 rounded-lg bg-white pr-2 shadow-lg hover:cursor-pointer">
            <div className="flex items-center justify-start space-x-4">
              <p className="rounded-r-none rounded-s-lg bg-blue-100 p-4 text-4xl md:text-5xl">
                {icon}
              </p>

              <div>
                <p className="text-sm font-semibold capitalize">{type}</p>
                <p className="font-bold">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
