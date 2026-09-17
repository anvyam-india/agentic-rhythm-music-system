export const INSTRUMENTS = [
  'Guitar',
  'Keyboard',
  'Piano',
  'Vocal',
  'Drums',
  'Ukulele',
  'Tabla',
] as const

export type Instrument = (typeof INSTRUMENTS)[number]

export const LEVELS = [
  'Beginner',
  'Level 1',
  'Level 2',
  'Intermediate',
  'Advanced',
] as const
