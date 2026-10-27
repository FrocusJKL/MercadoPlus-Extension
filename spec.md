# Especificación de Mercado Plus

## Propósito
Extensión Chrome MV3 que mejora la experiencia visual de Mercado Libre sin modificar sus servicios, automatizar compras ni enviar datos fuera del navegador.

## Versión 1.0 implementada
- Tema claro, oscuro y automático.
- Popup como único panel de configuración.
- Configuración persistida exclusivamente con `chrome.storage.local`.

## Arquitectura
`src/content` adapta la interfaz de Mercado Libre; `src/popup` contiene la configuración; `src/storage` encapsula persistencia; `src/shared` contiene tipos y estilos compartidos; `src/background` inicializa valores por defecto.

El tema se aplica mediante CSS, por lo que también cubre contenido añadido dinámicamente. El content script escucha cambios de configuración y cambios del tema del sistema sin recorrer continuamente el DOM.

## Seguridad y límites
No se usan servidores externos, LocalStorage, `eval`, credenciales ni automatización. Los selectores son heurísticos porque el DOM de Mercado Libre puede cambiar.
