export type Option = {
  label: string
  onClick: () => void
  selected: boolean
}

export enum Categories {
  MEALS = 'meals',
  DIETARY = 'dietary',
  CUISINE = 'cuisine',
  PREPARATION = 'preparation',
}
