import { Colours } from '@/utils/interfaces/meals'

const colorToBorderColorMapper: Record<Colours, string> = {
  amber: 'border-amber-100',
  blue: 'border-blue-100',
  cyan: 'border-cyan-100',
  emerald: 'border-emerald-100',
  gray: 'border-gray-100',
  green: 'border-green-100',
  indigo: 'border-indigo-100',
  orange: 'border-orange-100',
  lime: 'border-lime-100',
  pink: 'border-pink-100',
  purple: 'border-purple-100',
  red: 'border-red-100',
  rose: 'border-rose-100',
  teal: 'border-teal-100',
  yellow: 'border-yellow-100',
}

const colorToBgColorMapper: Record<Colours, string> = {
  amber: 'bg-amber-100',
  blue: 'bg-blue-100',
  cyan: 'bg-cyan-100',
  emerald: 'bg-emerald-100',
  gray: 'bg-gray-100',
  green: 'bg-green-100',
  indigo: 'bg-indigo-100',
  orange: 'bg-orange-100',
  lime: 'bg-lime-100',
  pink: 'bg-pink-100',
  purple: 'bg-purple-100',
  red: 'bg-red-100',
  rose: 'bg-rose-100',
  teal: 'bg-teal-100',
  yellow: 'bg-yellow-100',
}

const colorToTextColorMapper: Record<Colours, string> = {
  amber: 'text-amber-900/75',
  blue: 'text-blue-900/75',
  cyan: 'text-cyan-900/75',
  emerald: 'text-emerald-900/75',
  gray: 'text-gray-900/75',
  green: 'text-green-900/75',
  indigo: 'text-indigo-900/75',
  orange: 'text-orange-900/75',
  lime: 'text-lime-900/75',
  pink: 'text-pink-900/75',
  purple: 'text-purple-900/75',
  red: 'text-red-900/75',
  rose: 'text-rose-900/75',
  teal: 'text-teal-900/75',
  yellow: 'text-yellow-900/75',
}

interface ColourMapper {
  bgColor: string
  borderColor: string
  textColor: string
}

function useColour(color: Colours): ColourMapper {
  return {
    bgColor: colorToBgColorMapper[color],
    borderColor: colorToBorderColorMapper[color],
    textColor: colorToTextColorMapper[color],
  }
}

export default useColour
