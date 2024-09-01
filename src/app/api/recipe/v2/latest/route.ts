import { RecipeItem } from '@/utils/interfaces/recipes'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const recipes: RecipeItem[] = [
    { icon: '🍝', label: 'Spaghetti Carbonara', type: 'lunch' },
    { icon: '🌮', label: 'Quesadilla', type: 'dinner' },
    { icon: '🍕', label: 'Margherita Pizza', type: 'dinner' },
  ]

  return NextResponse.json({ recipes })
}
