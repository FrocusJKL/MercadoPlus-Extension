# Memoria del proyecto

- La aplicación se construye con Vite, TypeScript y SCSS.
- El artefacto final se genera en `dist/` y se carga en Chrome desde `chrome://extensions` usando "Cargar descomprimida".
- El manifest apunta a nombres estables (`assets/content.js`, `assets/content.css`, `assets/background.js`); no cambiar `entryFileNames` sin actualizarlo.
- Toda preferencia debe pasar por `src/storage/settings.ts`.
- El popup (`src/popup`) es la interfaz principal y única de configuración para el usuario: tema, módulos y futuras preferencias deben poder gestionarse desde el panel desplegable. No depender de una página de opciones separada.
- Cada cambio realizado desde el popup debe guardarse inmediatamente en `chrome.storage.local` y reflejarse en las pestañas mediante `chrome.storage.onChanged`.
- No agregar dependencias ni servicios que envíen información fuera del navegador sin revisar la especificación.
