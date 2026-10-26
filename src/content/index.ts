import './styles.scss'
import { getSettings, watchSettings } from '../storage/settings'
import { SELECTORS } from '../shared/selectors'
import type { Settings } from '../shared/types'

let settings: Settings
let observer: MutationObserver | undefined
const cardSelector = SELECTORS.productCards.join(',')
const contains = (text: string, markers: readonly string[]) => markers.some(marker => text.toLocaleLowerCase().includes(marker))

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
