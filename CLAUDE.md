# Amani — contexto del proyecto

Web de Amani (perfumería/sentidos: Vista, Oído, Olfato, Gusto, Tacto) hecha en Vue 3 + TypeScript + Vite, con Firebase (Firestore + Storage) como backend.

## Estado de las ramas

- **`main`**: versión estable, es lo que está en producción/desplegado.
- **`develop`** (rama activa ahora mismo): panel de administración del blog. **No fusionar a `main` todavía** — el usuario está redactando artículos desde el panel y aún le faltan **3 artículos** por crear antes de dar la rama por terminada.
- `pruebas`: rama local sin remoto asociado (uso puntual del usuario).
- `claude/seo-web-improvement-xmcvcj`, `claude/web-image-optimization-lvftdd`: ramas remotas de trabajos anteriores (SEO, optimización de imágenes), ya mezcladas en `develop`.

No asumas que `develop` está lista para PR/merge salvo que el usuario lo confirme explícitamente.

## Qué añade `develop` sobre `main`

- **Panel de administración de posts del blog** (`src/views/BackstagePostsView.vue`, `src/composables/usePosts.ts`, `src/types/post.ts`), con editor de texto enriquecido (`src/components/RichTextEditor.vue`, basado en Tiptap).
- Metadatos SEO / JSON-LD adicionales (`src/utils/seoMeta.ts`, `src/composables/useJsonLd.ts`, `src/composables/useProductosJsonLd.ts`).
- Optimización de imágenes en build (`vite-plugin-image-optimizer`, `sharp`) + tests (`tests/build-image-optimization.test.ts`, `tests/e2e/imagen-base64.spec.ts`).
- `playwright.config.ts` y `vitest.config.ts` nuevos (tests e2e y unitarios).

## Modelo de datos: Post (Firestore, colección `posts`)

```ts
interface Post {
  id?: string
  titulo: string
  descripcion: string
  contenido: string        // HTML del editor Tiptap
  imagenPortada: string | null  // base64
  autor: string
  fecha: string             // YYYY-MM-DD
  orden: number
}
```

- Límite de tamaño por documento: 900 000 bytes (margen frente al límite real de 1 MiB de Firestore), porque las imágenes viajan en base64 dentro del propio documento.
- Si la colección `posts` está vacía, el panel puede sembrar un post de ejemplo ("Bienvenidos al blog de Amani") vía `sembrarPostEjemplo()`.

## Firebase / entorno local

- `.env` (gitignored, con las claves `VITE_FIREBASE_*`) apunta al **mismo proyecto de Firebase que producción** — no hay entorno de pruebas aislado. Lo que se crea/edita en local desde el panel se guarda de verdad.
- Reglas de Firestore actuales: `allow read, write: if true` en todas las colecciones de productos y en `posts` (solo `claves` tiene `write: false`). Es decir, la protección del panel de admin (`useAdminAuth.ts`, clave guardada en `sessionStorage`/`localStorage`) es solo de interfaz: cualquiera con el `projectId` podría escribir directo en Firestore sin pasar por el login. Riesgo conocido, ya comentado en el propio código; pendiente de endurecer (mover a Firebase Auth + reglas condicionadas a `request.auth`) si se decide abordarlo.
- Login de admin: en `develop` incluye opción "recordar dispositivo" (localStorage, 30 días) — funcionalidad que en realidad se introdujo en `main` (commit `feat: panel de administración de blog y recordar dispositivo en login`), confirmar que sigue presente al mezclar ramas.

## Setup local

```
npm install
npm run dev   # http://localhost:5173
```

**Cuidado con un bug conocido de npm** (npm/cli#4828): a veces no descarga el binario nativo de Rollup para la plataforma y `npm run dev` falla con `Cannot find module @rollup/rollup-win32-x64-msvc`. Fix aplicado la última vez sin borrar todo `node_modules`:
```
npm install @rollup/rollup-win32-x64-msvc --no-save
```
(Alternativa más agresiva si eso no basta: borrar `node_modules` y `package-lock.json` y reinstalar de cero.)

`npm audit` reporta actualmente 14 vulnerabilidades (1 baja, 2 moderadas, 10 altas, 1 crítica) en dependencias — no bloquean el dev server, sin revisar todavía a fondo.

## Scripts útiles

- `npm run dev` — servidor de desarrollo
- `npm run build` — type-check + build de producción
- `npm run test` — tests unitarios (vitest)
- `npm run test:e2e` — tests e2e (Playwright)
- `npm run lint` / `npm run format`

## Convenciones observadas

- Nombres de variables, funciones y comentarios en **español**; mensajes de commit en español con prefijos tipo `feat:`, `fix:`.
- Comentarios solo cuando explican un porqué no obvio (límites de Firestore, decisiones de seguridad, bugs de terceros) — no describen qué hace el código.
