import '../shared/ui.css'
import { getSettings, saveSettings } from '../storage/settings'
import type { Theme } from '../shared/types'

const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = `<main class="shell"><header class="brand"><span class="brand-mark">MP</span><div><h1>Mercado Plus</h1><p class="subtitle">Una experiencia más cómoda para Mercado Libre.</p></div></header><h2>Apariencia</h2><div class="setting"><div><label for="theme">Tema</label><span class="hint">Se aplica automáticamente en Mercado Libre</span></div><select id="theme"><option value="system">Automático</option><option value="light">Claro</option><option value="dark">Oscuro</option></select></div><footer class="footer"><span id="status">Configuración local</span><span>Mercado Plus · 1.0.0</span></footer></main>`

const theme = document.querySelector<HTMLSelectElement>('#theme')!
const status = document.querySelector<HTMLSpanElement>('#status')!

async function init(): Promise<void> {
  const settings = await getSettings()
  theme.value = settings.theme
}

theme.addEventListener('change', () => {
  void saveSettings({ theme: theme.value as Theme }).then(() => {
    status.textContent = 'Guardado'
    window.setTimeout(() => { status.textContent = 'Configuración local' }, 1200)
  })
})

void init()
