export const Stats = ({
  cookTime,
  prepTime,
}: {
  cookTime: number
  prepTime: number
}) => {
  return (
    <div className="flex items-center justify-between text-center md:px-24">
      <div>
        <p className="text-xl font-bold">2</p>
        <p className="text-sm">Servings</p>
      </div>
      <div>
        <p className="text-xl font-bold">{prepTime} mn</p>
        <p className="text-sm">Preparation</p>
      </div>
      <div>
        <p className="text-xl font-bold">{cookTime} mn</p>
        <p className="text-sm">Cook</p>
      </div>
    </div>
  )
}
