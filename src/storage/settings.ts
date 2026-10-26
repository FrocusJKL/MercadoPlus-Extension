import { DEFAULT_SETTINGS, type Settings } from '../shared/types'

const STORAGE_KEY = 'settings'
const storage = typeof chrome !== 'undefined' && chrome.storage?.local

export async function getSettings(): Promise<Settings> {
  if (!storage) return { ...DEFAULT_SETTINGS }
  const result = await storage.get(STORAGE_KEY)
  return { ...DEFAULT_SETTINGS, ...(result[STORAGE_KEY] as Partial<Settings> | undefined) }
}

export async function saveSettings(settings: Settings): Promise<void> {
  if (storage) await storage.set({ [STORAGE_KEY]: settings })
}

export function watchSettings(callback: (settings: Settings) => void): void {
  if (!storage) return
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes[STORAGE_KEY]?.newValue) {
      callback({ ...DEFAULT_SETTINGS, ...changes[STORAGE_KEY].newValue as Partial<Settings> })
    }
  })
}
