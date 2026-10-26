import '../shared/ui.css'
import { getSettings, saveSettings } from '../storage/settings'
import type { Settings } from '../shared/types'
const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = `<main class="shell"><header class="brand"><span class="brand-mark">MP</span><div><h1>Mercado Plus</h1><p class="subtitle">Tu experiencia, a tu manera.</p></div></header><div class="setting"><div><label for="sponsored">Ocultar patrocinados</label><span class="hint">Reduce el ruido visual</span></div><input id="sponsored" type="checkbox"></div><div class="setting"><div><label for="full">Resaltar FULL</label></div><input id="full" type="checkbox"></div><div class="setting"><div><label for="shipping">Resaltar envío gratis</label></div><input id="shipping" type="checkbox"></div><footer class="footer"><span>Configuración local</span><button id="options" type="button">Más opciones</button></footer></main>`
const sponsored = document.querySelector<HTMLInputElement>('#sponsored')!, full = document.querySelector<HTMLInputElement>('#full')!, shipping = document.querySelector<HTMLInputElement>('#shipping')!
let settings: Settings
async function init() { settings = await getSettings(); sponsored.checked = settings.hideSponsored; full.checked = settings.highlightFull; shipping.checked = settings.highlightFreeShipping }
async function update(key: keyof Settings, value: boolean) { settings = { ...settings, [key]: value }; await saveSettings(settings) }
sponsored.addEventListener('change', () => void update('hideSponsored', sponsored.checked)); full.addEventListener('change', () => void update('highlightFull', full.checked)); shipping.addEventListener('change', () => void update('highlightFreeShipping', shipping.checked)); document.querySelector('#options')!.addEventListener('click', () => void chrome.runtime.openOptionsPage()); void init()
