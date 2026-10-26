# Memoria del proyecto

- La aplicación se construye con Vite, TypeScript y SCSS.
- El artefacto final se genera en `dist/` y se carga en Chrome desde `chrome://extensions` usando "Cargar descomprimida".
- El manifest apunta a nombres estables (`assets/content.js`, `assets/content.css`, `assets/background.js`); no cambiar `entryFileNames` sin actualizarlo.
- Toda preferencia debe pasar por `src/storage/settings.ts`.
- No agregar dependencias ni servicios que envíen información fuera del navegador sin revisar la especificación.
