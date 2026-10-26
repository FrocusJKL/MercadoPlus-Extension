# Guía para agentes

## Reglas
1. Mantener cada feature aislada y activable.
2. Centralizar selectores y tipos compartidos.
3. Usar `chrome.storage.local`, nunca `localStorage`.
4. Evitar recorrer el DOM repetidamente; preferir selectores acotados y observadores.
5. Mantener accesibilidad, navegación por teclado y contraste.
6. No usar logos oficiales, bots, scraping masivo, código remoto ni `eval()`.

## Verificación
Ejecutar `npm run build` después de cambios. Para probar: cargar `dist/` como extensión sin empaquetar en Chrome y abrir una página de resultados de Mercado Libre.
