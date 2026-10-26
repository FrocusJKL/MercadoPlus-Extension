import './styles.scss'

// Los content scripts de Chrome no son módulos ES. Este pequeño adaptador
// mantiene el archivo autocontenido para que Chrome pueda ejecutarlo.
type Theme = 'light' | 'dark' | 'system'
type Settings = { theme: Theme; hideSponsored: boolean; highlightFull: boolean; highlightFreeShipping: boolean }
const DEFAULT_SETTINGS: Settings = { theme: 'system', hideSponsored: true, highlightFull: true, highlightFreeShipping: true }
const SELECTORS = {
  productCards: ["li[data-testid*='result']", '[class*="ui-search-result"]', '[class*="poly-card"]'],
  sponsoredMarkers: ['patrocinado', 'publicación patrocinada', 'sponsored'],
  fullMarkers: ['full', 'envío full'],
  freeShippingMarkers: ['envío gratis', 'envio gratis'],
  featureBadge: 'data-mercado-plus-badge',
} as const
let settings: Settings = { ...DEFAULT_SETTINGS }
let observer: MutationObserver | undefined
const cardSelector = SELECTORS.productCards.join(',')
const contains = (text: string, markers: readonly string[]) => markers.some(marker => text.toLocaleLowerCase().includes(marker))

async function getSettings(): Promise<Settings> {
  const result = await chrome.storage.local.get('settings')
  return { ...DEFAULT_SETTINGS, ...(result.settings as Partial<Settings> | undefined) }
}

function watchSettings(callback: (next: Settings) => void): void {
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.settings?.newValue) callback({ ...DEFAULT_SETTINGS, ...changes.settings.newValue as Partial<Settings> })
  })
}

function applyTheme(): void {
  const dark = settings.theme === 'dark' || (settings.theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.toggleAttribute('data-mp-theme', dark)
  if (dark) document.documentElement.setAttribute('data-mp-theme', 'dark')
  else document.documentElement.removeAttribute('data-mp-theme')
}

function processCards(): void {
  document.querySelectorAll<HTMLElement>(cardSelector).forEach(card => {
    const text = card.innerText
    if (settings.hideSponsored && contains(text, SELECTORS.sponsoredMarkers)) card.dataset.mpHidden = 'true'
    else delete card.dataset.mpHidden
    if (settings.highlightFull && contains(text, SELECTORS.fullMarkers)) addBadge(card, 'full', 'FULL')
    else card.querySelector(`[${SELECTORS.featureBadge}='full']`)?.remove()
    if (settings.highlightFreeShipping && contains(text, SELECTORS.freeShippingMarkers)) addBadge(card, 'shipping', 'Envío gratis')
    else card.querySelector(`[${SELECTORS.featureBadge}='shipping']`)?.remove()
  })
}

function addBadge(card: HTMLElement, type: string, label: string): void {
  if (card.querySelector(`[${SELECTORS.featureBadge}='${type}']`)) return
  const badge = document.createElement('span')
  badge.setAttribute(SELECTORS.featureBadge, type)
  badge.textContent = label
  card.append(badge)
}

function startObserver(): void {
  observer?.disconnect()
  observer = new MutationObserver(() => processCards())
  observer.observe(document.body, { childList: true, subtree: true })
}

async function init(): Promise<void> {
  settings = await getSettings()
  applyTheme(); processCards(); startObserver()
  watchSettings(next => { settings = next; applyTheme(); processCards() })
}

void init()
