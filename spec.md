# Especificación de Mercado Plus

## Propósito
Extensión Chrome MV3 que mejora la experiencia visual de Mercado Libre sin modificar sus servicios, automatizar compras ni enviar datos fuera del navegador.

## MVP implementado
- Tema claro, oscuro y automático.
- Ocultar publicaciones patrocinadas.
- Resaltar etiquetas FULL y envío gratis.
- Popup para cambios rápidos y página de opciones completa.
- Configuración persistida exclusivamente con `chrome.storage.local`.

## Arquitectura
`src/content` adapta la interfaz de Mercado Libre; `src/popup` contiene controles rápidos; `src/options` contiene preferencias; `src/storage` encapsula persistencia; `src/shared` contiene tipos, selectores y estilos compartidos; `src/background` inicializa valores por defecto.

Los selectores del sitio están centralizados en `src/shared/selectors.ts`. El content script usa `MutationObserver` para páginas dinámicas y cada función se controla con su propia preferencia.

## Seguridad y límites
No se usan servidores externos, LocalStorage, `eval`, credenciales ni automatización. Los selectores son heurísticos porque el DOM de Mercado Libre puede cambiar.
