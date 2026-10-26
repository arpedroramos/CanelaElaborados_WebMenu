# Plan de implementación — web_menu (sitio y deploy con GitHub Actions)

Parte 2 de 2. La app de gestión (ver `PLAN_IMPLEMENTACION_AppGestionCanela.md`) sube `data/menu.json` y las fotos webp a este repo; GitHub Actions compila y publica.

> Reemplaza el enfoque anterior (Excel + `npm run sincronizar` + `id_app`). Excel, plantilla y `npm run publicar` local salen del flujo.

## 1. Objetivo y alcance

- Que el sitio lea su contenido de `data/menu.json` y `public/img/menu/*.webp`, versionados en el repo.
- Que cada push a `master` que cambie ese contenido (o el código) compile y publique el sitio automáticamente, manteniendo el dominio `canelaelaborados.com.ar`.
- Texto de pedido de WhatsApp genérico, armado en el sitio.

Fuera de alcance: cualquier edición manual del menú en este repo (se hace desde la app), cambios de diseño.

## 2. Decisiones cerradas

- El repo (`arpedroramos/web_menu`, rama `master`) es el destino del commit de la app: `data/menu.json` + `public/img/menu/`.
- Build y publicación en **GitHub Actions** con el despliegue oficial a GitHub Pages (reemplaza la rama `gh-pages` y `gh-pages` local).
- Formato del JSON = `MenuCategory[]` de `src/data/menu_types.ts` (sin `order`; lo completa el sitio).
- Foto ya viene en webp y redimensionada; el sitio no procesa imágenes.

## 3. Estado actual (verificado)

- `src/data/menu.ts` importa `menu.generated.json` (ignorado por git) o, si no existe, `menu.seed.json`.
- `scripts/generar-contenido.ts` (Excel + sharp → JSON y fotos), `crear-plantilla.ts`, `publicar.ts` (`npm run contenido`, `contenido:plantilla`, `publicar`; publica `dist/` en la rama `gh-pages` y exige `dist/CNAME`).
- `.gitignore` excluye `contenido/`, `public/img/menu/` y `src/data/menu.generated.json`.
- `public/CNAME` existe; `vite.config.ts` sin `base` (dominio propio en la raíz).
- No hay carpeta `.github/`. `exceljs`, `sharp` y `gh-pages` son devDependencies.

## 4. Pasos

### W1 — Datos versionados
- Crear `data/menu.json` (copia inicial de `src/data/menu.seed.json` o del menú actual).
- Crear `public/img/menu/` con las fotos webp actuales (de `contenido/fotos/`, ya optimizadas) y `.gitkeep`.
- Quitar de `.gitignore`: `public/img/menu/` y la ruta de datos generados (ya no se generan).

### W2 — Lectura del menú y pedido genérico
- `src/data/menu.ts`: importar `data/menu.json` (o moverlo a `src/data/menu.json`; si se deja fuera de `src`, ajustar el alias/`include` de `tsconfig.app.json`). Mantener el seed como respaldo solo si hace falta.
- Nueva `src/data/pedido.ts` con la plantilla única, por ejemplo `Hola! Quiero pedir: {producto}` y `Hola! Quiero pedir: {producto} ({presentación})`. Al cargar el menú, completar `order` de cada ítem y de cada opción cuando venga vacío, y el `footerCta` de categoría si corresponde. Cambiar el texto = editar un solo archivo.
- Revisar `buildOrderUrl` (codificación del mensaje) y `MenuCard.tsx` / `MenuSection.tsx` para que sigan mostrando el botón con el `order` generado.

### W3 — Validación del contenido en el build
- `scripts/validar-menu.ts` (reemplaza a `generar-contenido.ts`): lee `data/menu.json` y falla con mensajes en español si hay ids de categoría duplicados, ítems sin `title`, categorías vacías, `imgSrc` que apunta a un archivo inexistente en `public/img/menu/`, o fotos huérfanas (esto último solo advierte).
- Scripts de `package.json`: `"validar": "tsx scripts/validar-menu.ts"` y `"build": "npm run validar && tsc -b && vite build"`.
- Esto protege el sitio si la app publica un JSON roto: el workflow falla y el sitio anterior sigue en línea.

### W4 — Workflow de GitHub Actions
`.github/workflows/deploy.yml`:
- Disparadores: `push` a `master` (con `paths` en `data/**`, `public/**`, `src/**`, `scripts/**`, `package*.json`, `index.html`, `vite.config.ts`) y `workflow_dispatch` (para republicar a mano).
- Permisos: `contents: read`, `pages: write`, `id-token: write`. `concurrency` con grupo `pages` para no pisar despliegues.
- Pasos: checkout → setup-node (versión fijada, con caché npm) → `npm ci` → `npm run build` → verificar que `dist/CNAME` exista (misma salvaguarda que hoy) → `upload-pages-artifact` → job `deploy` con `deploy-pages`.
- Fijar las versiones exactas de cada action (con antigüedad suficiente), no `@main`.

### W5 — Cambio de origen en GitHub Pages (una sola vez)
En el repo → Settings → Pages: cambiar **Source** a "GitHub Actions" y confirmar que el dominio personalizado `canelaelaborados.com.ar` y "Enforce HTTPS" siguen activos. El DNS no se toca. Hacerlo después de probar el workflow en una rama.

### W6 — Limpieza
- Eliminar `scripts/generar-contenido.ts`, `crear-plantilla.ts`, `publicar.ts` y las entradas `contenido`, `contenido:plantilla`, `publicar` de `package.json`.
- Quitar devDependencies `exceljs`, `sharp`, `gh-pages` y `@types/gh-pages` (si ningún otro script las usa); regenerar `package-lock.json`.
- Conservar `scripts/contenido_comun.ts` solo si algo lo usa; si no, borrarlo.
- Archivar `contenido/menu.xlsx` fuera del repo (ya estaba ignorado) y dejar un aviso en el README.
- La rama `gh-pages` vieja puede borrarse cuando todo esté estable.

### W7 — Documentación
README / `docs`: nuevo flujo ("cargar en la app → Publicar → en 1–2 minutos queda en línea"), cómo ver el estado del deploy (pestaña Actions), cómo volver atrás (revertir el commit de la app o reejecutar un workflow anterior) y cómo cambiar el texto de pedido genérico.

## 5. Criterios de aceptación

- Con un `data/menu.json` válido, `npm run build` termina sin errores y el sitio muestra categorías, precios, fotos y botones de WhatsApp con el texto genérico.
- Un JSON inválido o con foto inexistente hace fallar `validar` con un mensaje claro y **no** reemplaza el sitio publicado.
- Un push desde la app (commit en `master`) dispara el workflow y el sitio se actualiza en `https://canelaelaborados.com.ar` sin intervención.
- `dist/CNAME` presente en cada despliegue; el dominio y HTTPS siguen funcionando.
- No quedan referencias a Excel, `sharp` ni `gh-pages` en scripts ni dependencias.

## 6. Verificación

1. En una rama de prueba: crear el workflow y ejecutarlo con `workflow_dispatch`; revisar el artefacto antes de cambiar el Source de Pages.
2. Local: `npm run validar`, `npm run build`, `npm run lint`, `npm run dev` y revisar el menú y los enlaces de WhatsApp.
3. Probar el caso de error: JSON roto en una rama → el workflow falla y el sitio no cambia.
4. Con la app (parte 1) apuntando a un repo o rama de pruebas, publicar y confirmar el ciclo completo; recién después apuntar a `master`.

## 7. Riesgos

- **Cambiar el origen de Pages** puede dejar el sitio caído unos minutos si el workflow no está listo: probar primero en una rama y cambiar el Source solo cuando el despliegue de prueba funcione.
- **Dominio**: sin `CNAME` en `dist/` Pages libera el dominio; la salvaguarda del workflow lo evita.
- **Conflictos de push**: la app hace commit sobre la punta de `master`; si se edita código a mano al mismo tiempo, el push de la app puede fallar (la app no usa `force` y reintenta tras refrescar la ref). Evitar publicar mientras se hace un push de código.
- **Minutos de Actions**: el repo es chico y el build corto; alcanza ampliamente con el plan gratuito.
- **Fotos grandes en el repo**: el tope de ~300 KB en la app mantiene el repositorio liviano.

## 8. Orden sugerido

W1 → W2 → W3 → W4 (en rama, con `workflow_dispatch`) → verificar → W5 (cambiar Source de Pages) → conectar la app (parte 1, A6/A7) y publicar una vez → W6 → W7.
