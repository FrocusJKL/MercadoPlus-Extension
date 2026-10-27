/** Selectores centralizados: Mercado Libre puede cambiar su DOM sin afectar la lógica. */
export const SELECTORS = {
  productCards: ["li[data-testid*='result']", '[class*="ui-search-result"]', '[class*="poly-card"]', '.andes-card'],
  pageRoots: ['body', '#root-app', 'main', '[data-site="ML"]'],
  navigation: ['.nav-header', 'header', '.nav-left-area', '.nav-menu-cp-logged'],
  text: ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'label'],
  prices: ['.andes-money-amount', '.price-tag-fraction', '.poly-price__amount', '[class*="price-tag"]'],
  inputs: ['input', 'textarea', 'select', '.nav-search-input'],
  sponsoredMarkers: ['patrocinado', 'publicación patrocinada', 'sponsored'],
  fullMarkers: ['full', 'envío full'],
  freeShippingMarkers: ['envío gratis', 'envio gratis'],
  featureBadge: 'data-mercado-plus-badge',
} as const
