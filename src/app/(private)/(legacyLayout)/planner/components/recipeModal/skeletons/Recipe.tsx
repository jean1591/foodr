import { Ingredients } from './Ingredients'
import { Instructions } from './Instructions'

export const Recipe = () => {
  return (
    <div className="animate-pulse">
      <p className="bg-slate-200 text-center text-slate-200">
        A small and random recipe description A small and random recipe
        description
      </p>

      <div className="mt-4 grid grid-cols-3 space-x-4 text-center">
        <div className="p-2">
          <p className="bg-slate-200 text-xl font-bold text-slate-200">10</p>
          <p className="text-sm text-slate-600">Servings</p>
        </div>
        <div className="p-2">
          <p className="bg-slate-200 text-xl font-bold text-slate-200">10 mn</p>
          <p className="text-sm text-slate-600">Preparation</p>
        </div>
        <div className="p-2">
          <p className="bg-slate-200 text-xl font-bold text-slate-200">10 mn</p>
          <p className="text-sm text-slate-600">Cook</p>
        </div>
      </div>

      <div className="mt-8">
        <Ingredients />
      </div>

      <div className="mt-8">
        <Instructions />
      </div>
    </div>
  )
}
