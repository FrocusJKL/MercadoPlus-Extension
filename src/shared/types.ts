export type Theme = 'light' | 'dark' | 'system'

export interface Settings {
  theme: Theme
  hideSponsored: boolean
  highlightFull: boolean
  highlightFreeShipping: boolean
}

export const DEFAULT_SETTINGS: Settings = {
  theme: 'system', hideSponsored: true, highlightFull: true, highlightFreeShipping: true,
}
