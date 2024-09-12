import { Ingredient } from '@/utils/interfaces/recipes'

export const Ingredients = ({ ingredients }: { ingredients: Ingredient[] }) => {
  return (
    <div>
      <p className="text-2xl font-bold">Ingredients</p>

      <div className="mt-2 space-y-2">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.name}
            className="flex items-center justify-between space-x-2"
          >
            <div className="flex items-center justify-start space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white bg-opacity-50">
                <p className="text-lg">{ingredient.icon}</p>
              </div>
              <p>{ingredient.name}</p>
            </div>
            <div className="flex items-center justify-end space-x-1">
              <p>{ingredient.quantity}</p>
              <p>{ingredient.unit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
