# Memoria del proyecto

- La aplicación se construye con Vite, TypeScript y SCSS.
- El artefacto final se genera en `dist/` y se carga en Chrome desde `chrome://extensions` usando "Cargar descomprimida".
- El manifest apunta a nombres estables (`assets/content.js`, `assets/content.css`, `assets/background.js`); no cambiar `entryFileNames` sin actualizarlo.
- Toda preferencia debe pasar por `src/storage/settings.ts`.
- El popup (`src/popup`) es la interfaz principal y única de configuración para el usuario. No depender de una página de opciones separada.
- La versión 1.0 se enfoca únicamente en Dark Mode. No exponer ni ejecutar las herramientas experimentales de patrocinados, FULL o envío gratis hasta que se incorporen como features completas.
- Cada cambio realizado desde el popup debe guardarse inmediatamente en `chrome.storage.local` y reflejarse en las pestañas mediante `chrome.storage.onChanged`.
- El tema oscuro usa una paleta gris tipo Obsidian: evitar fondos negros puros; usar `#1e1e1e`, `#262626` y `#2d2d2d` para fondo, superficies y tarjetas, respectivamente. Los precios deben conservar contraste alto.
- Los selectores visuales de Mercado Libre deben basarse primero en `data-*`, roles y componentes estables (`andes-*`, `poly-*`), manteniendo alternativas para cambios del DOM.
- No agregar dependencias ni servicios que envíen información fuera del navegador sin revisar la especificación.
