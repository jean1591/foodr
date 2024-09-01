import { Ingredient } from '@/utils/interfaces/recipes'

export const Ingredients = ({ ingredients }: { ingredients: Ingredient[] }) => {
  return (
    <div className="text-lg">
      <p className="font-bold">Ingredients</p>

      <div className="mt-2">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.name}
            className="flex items-center justify-between space-x-2"
          >
            <div className="flex items-center justify-start space-x-2">
              <p>{ingredient.icon}</p>
              <p>{ingredient.name}</p>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <p>{ingredient.quantity}</p>
              <p>{ingredient.unit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
