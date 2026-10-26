/** Selectores centralizados: Mercado Libre puede cambiar su DOM sin afectar la lógica. */
export const SELECTORS = {
  productCards: ["li[data-testid*='result']", '[class*="ui-search-result"]', '[class*="poly-card"]'],
  sponsoredMarkers: ['patrocinado', 'publicación patrocinada', 'sponsored'],
  fullMarkers: ['full', 'envío full'],
  freeShippingMarkers: ['envío gratis', 'envio gratis'],
  featureBadge: 'data-mercado-plus-badge',
} as const
