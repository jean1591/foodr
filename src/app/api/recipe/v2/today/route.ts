import { RecipeItem } from '@/utils/interfaces/recipes'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const recipes: RecipeItem[] = [
    { icon: '🥡', label: 'Quick Asian Tofu Bowl', type: 'lunch' },
    { icon: '🍖', label: 'Pork Belly with Bok Choy', type: 'dinner' },
  ]

  return NextResponse.json({ recipes })
}
