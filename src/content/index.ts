import './styles.scss'

type Theme = 'light' | 'dark' | 'system'
type Settings = { theme: Theme }

const DEFAULT_SETTINGS: Settings = { theme: 'system' }
const STORAGE_KEY = 'settings'
let settings: Settings = { ...DEFAULT_SETTINGS }

async function getSettings(): Promise<Settings> {
  const result = await chrome.storage.local.get(STORAGE_KEY)
  return { ...DEFAULT_SETTINGS, ...(result[STORAGE_KEY] as Partial<Settings> | undefined) }
}

function isDarkTheme(): boolean {
  return settings.theme === 'dark' || (settings.theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
}

function applyTheme(): void {
  if (isDarkTheme()) document.documentElement.setAttribute('data-mp-theme', 'dark')
  else document.documentElement.removeAttribute('data-mp-theme')
}

function watchSettings(): void {
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local' || !changes[STORAGE_KEY]?.newValue) return
    settings = { ...DEFAULT_SETTINGS, ...changes[STORAGE_KEY].newValue as Partial<Settings> }
    applyTheme()
  })
}

function watchSystemTheme(): void {
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (settings.theme === 'system') applyTheme()
  })
}

async function init(): Promise<void> {
  settings = await getSettings()
  applyTheme()
  watchSettings()
  watchSystemTheme()
}

void init()
