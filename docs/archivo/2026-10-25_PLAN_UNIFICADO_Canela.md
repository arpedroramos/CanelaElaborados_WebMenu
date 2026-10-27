# Plan unificado — AppGestionCanela + web_menu (carga del menú, publicación, sitio y pruebas)

## 0. Cómo usar este documento

- Es la **guía y memoria compartida** de los dos repos: `AppGestionCanela` (app de gestión, Express + SQLite, corre en una Raspberry Pi 3) y `web_menu` (sitio público, Vite + React, en GitHub Pages).
- Reemplaza a `PLAN_IMPLEMENTACION_AppGestionCanela.md`, `PLAN_IMPLEMENTACION_web_menu.md` y `PLAN_PRUEBAS_Y_ENTORNOS.md`. Los IDs de pasos se conservan: **A1–A10** (app) y **W1–W7** (web).
- Reemplaza también el enfoque anterior (API en la red local, sincronización con Excel e `id_app`, `npm run sincronizar`, `npm run publicar` local). Ese enfoque queda descartado.
- Las rutas de la **Parte A** pertenecen al repo de la app; las de la **Parte B**, al repo web_menu.
- **Regla de mantenimiento:** al cerrar o cambiar un paso, actualizar la sección 10 (Seguimiento) en el mismo commit. Si hay una decisión nueva, registrarla ahí.

## 1. Objetivo, alcance y arquitectura

**Objetivo.** Cargar en cada receta de la app todo lo que necesita el menú web (visible, descripción pública, foto webp, orden) y, con un botón **"Publicar menú"**, subir a GitHub `data/menu.json` y las fotos. El build y el deploy los hace GitHub Actions, no la Raspberry Pi. El sitio lee su contenido de esos archivos versionados y se publica solo en `canelaelaborados.com.ar`.

```
App (Raspberry Pi)  --commit atómico por API-->  GitHub (web_menu)  --Actions-->  GitHub Pages
 carga + "Publicar"     data/menu.json                 build + validar              canelaelaborados.com.ar
                        public/img/menu/*.webp
```

**Principio.** La app **nunca habla con web_menu directamente**: solo le deja archivos (`data/menu.json` y `public/img/menu/*.webp`). Por eso cada etapa de prueba cambia **el destino de la publicación**, no el código.

**Fuera de alcance.**
- Build de Vite en la Raspberry Pi.
- Edición del menú fuera de la app (en web_menu no se edita el menú a mano).
- Cambios de diseño del sitio.
- El texto de pedido de WhatsApp lo arma web_menu con una plantilla genérica (no la app).

## 2. Decisiones cerradas

**App**
- Categoría del menú = `recetas.subcategoria`, 1 a 1. Título, nota y orden de cada categoría viven en una tabla nueva.
- Fotos webp, convertidas **en el navegador** (la Raspberry Pi 3 no procesa imágenes). Tope ~300 KB, ancho máx. 800 px.
- Publicación: un commit atómico a `arpedroramos/web_menu` vía API de GitHub. Sin `git` ni `node_modules` de web_menu en la Raspberry Pi.
- Nunca se publican costos, márgenes, ingredientes ni proveedores: el JSON se arma con una lista explícita de campos.
- **Destino de publicación configurable** (`carpeta` | `github`) y rama configurable; rama por defecto `menu-test`.

**Web**
- Destino del commit de la app: `arpedroramos/web_menu`, rama `master` (solo en producción): `data/menu.json` + `public/img/menu/`.
- Build y publicación en **GitHub Actions** con el despliegue oficial a GitHub Pages (reemplaza la rama `gh-pages` y el paquete `gh-pages`).
- Formato del JSON = `MenuCategory[]` de `src/data/menu_types.ts` (sin `order`; lo completa el sitio).
- La foto ya viene en webp y redimensionada; el sitio no procesa imágenes.

## 3. Entornos y reglas comunes

- **Nunca** apuntar una app de desarrollo a `master` con el token real.
- En desarrollo usar una **copia** de la base (backup restaurado en la PC), no la DB real de la Raspberry Pi.
- Token de pruebas distinto al de producción: fine-grained, solo ese repo, `Contents: read and write`, vencimiento corto.
- El workflow de Actions dispara solo con `master` (y `workflow_dispatch`), así que `menu-test` no despliega nada.
- Hasta cerrar la etapa 3, dejar funcionando el flujo viejo (`npm run publicar` y la rama `gh-pages`) como **plan B**.
- Pasar a `master` requiere cambiar la rama a propósito y confirmar en pantalla ("Vas a publicar en el sitio real"). La pantalla "Menú web" muestra siempre el destino activo (carpeta o `repo@rama`).

---

# PARTE A — AppGestionCanela (repo de la app)

## 4. Estado actual (verificado)

- Express + better-sqlite3. `recetas` ya tiene `nombre`, `descripcion`, `subcategoria`, `archivada`, `es_subreceta` (`server/common/db.ts` ~184; `subcategoria` vía `addColumn` ~697). `receta_opciones_venta` tiene `nombre`, `precio_venta`, `es_predeterminado`.
- Migraciones con `addColumn(...)` en `db.ts`. Subida de archivos con `multer` (ejemplo en `server/modules/scrapers/scrapers.routes.ts`).
- Secretos cifrados: `server/common/lib/secretStore.ts`. Auditoría: `server/common/lib/audit.ts`. Errores: `httpErrors.ts`.
- Permisos por rol en `src/lib/permissions.ts` con `authorize`; la ruta nueva debe registrarse ahí y cubrirse en `server/routeAccess.test.ts`.
- Backups: `server/common/lib/backupDir.ts` y `server/modules/system/backup.service.ts` (la carpeta de fotos debe entrar).

## 5. Modelo de datos

**`recetas` (columnas nuevas, `addColumn`)**
- `menu_visible INTEGER DEFAULT 0` — nada se publica hasta marcarlo.
- `menu_descripcion TEXT` — texto público, distinto de `descripcion` interna.
- `menu_foto TEXT` — nombre de archivo webp (ej. `alfajor-maicena.webp`).
- `menu_orden INTEGER DEFAULT 0` — orden dentro de su categoría.

**`menu_categorias` (tabla nueva)**
`subcategoria TEXT PRIMARY KEY`, `etiqueta TEXT`, `titulo TEXT`, `nota TEXT`, `precio_nota TEXT`, `orden INTEGER`, `visible INTEGER DEFAULT 1`. Se crea una fila vacía automáticamente para cada subcategoría que tenga productos visibles.

**`menu_publicaciones` (tabla nueva, historial)**
`id`, `fecha`, `usuario`, `commit_sha`, `estado` (`ok` / `error`), `resumen`, `error`.

**Ajustes de "Menú web"** (clave/valor en tabla de configuración existente o nueva): `destino` (`carpeta` | `github`), `ruta_carpeta`, `owner`, `repo`, `rama` (por defecto `menu-test`). El **token** va en `secretStore`.

## 6. Pasos de la app

### A1 — Migraciones
Agregar las columnas y tablas de la sección 5 en `db.ts` con el patrón `addColumn` / `CREATE TABLE IF NOT EXISTS`. Índice por `menu_visible`.

### A2 — Recetas: backend y tipos
En `server/modules/recipes` (service, routes, tipos, esquemas de validación) leer/guardar `menu_visible`, `menu_descripcion`, `menu_orden`. Validar longitudes.

### A3 — Fotos
- Carpeta `data/menu_fotos/` (o equivalente junto a la DB; incluirla en los backups).
- `POST /api/recetas/:id/menu-foto` (multer, memoria, tope ~300 KB): comprobar cabecera webp (`RIFF....WEBP`), generar nombre seguro (slug del nombre + id), guardar, actualizar `menu_foto`, borrar la foto anterior. `DELETE` para quitarla. Nunca usar el nombre que manda el cliente.
- `GET /api/recetas/:id/menu-foto` (o ruta estática autenticada) para mostrarla en la pantalla.
- **Conversión en el navegador**: en el formulario, al elegir imagen, redimensionar a ancho máx. 800 px y exportar con `canvas.toBlob(…, 'image/webp', 0.8)` antes de subir. Si el navegador no soporta webp, avisar.

### A4 — Frontend
- En el formulario de receta: sección **"Menú web"** con checkbox "Mostrar en la web", descripción pública, orden y carga/vista previa/quitar de foto.
- Pantalla **"Menú web"** (nueva, con su permiso): lista de categorías con título, nota, orden y visibilidad editables; lista de productos visibles por categoría; avisos de faltantes (sin foto, sin precio, sin descripción); destino activo siempre visible; botón **Publicar**.

### A5 — Generador del menú
`server/modules/menu-web/menuWeb.service.ts` con una función pura `construirMenu(db)` que devuelve `MenuCategory[]` compatible con `src/data/menu_types.ts` de web_menu:
```json
[{ "id": "alfajores", "label": "Alfajores", "title": "Alfajores", "note": "…",
   "items": [{ "title": "Alfajor de maicena", "description": "…",
               "imgSrc": "/img/menu/alfajor-maicena.webp", "price": "$12.000",
               "options": [{ "label": "Caja x6", "order": "" }] }] }]
```
Reglas: `menu_visible = 1`, `archivada = 0`, `es_subreceta = 0`; categoría `id` = slug de la subcategoría (sin tildes, minúsculas); productos ordenados por `menu_orden` y luego nombre; una presentación con precio → `price` formateado es-AR (`$12.000`); varias → `options` con `label` = nombre de la presentación y el precio incluido en la etiqueta si hace falta; `order` se deja vacío (lo completa web_menu). Sin subcategoría → "General". Categorías sin productos visibles se omiten. Campos elegidos uno a uno, nunca `SELECT *`. Salida determinista (mismo orden y formato) para que "sin cambios" sea detectable.

### A6 — Publicación (adaptador de destino)
`menuWeb.publicar.ts`, solo con `fetch` (sin dependencias nuevas). El mismo código genera el JSON y calcula el diff; **solo cambia dónde se escribe**, según el destino:

| Destino | Qué hace | Se usa en |
|---|---|---|
| `carpeta` | Escribe `data/menu.json` y las fotos directo en una carpeta local (ruta configurable, ej. `C:\Users\arped\Desktop\App Canela\web_menu`). Sin commit ni token. El diff se calcula contra los archivos que ya hay en esa carpeta. | Etapa 1 |
| `github` | Commit atómico por API al repo `arpedroramos/web_menu`, en la **rama configurable**. | Etapas 2 y 3 |

Flujo común:
1. Construir el menú y la lista de fotos referenciadas.
2. Leer el estado actual del destino: en `github`, árbol de `public/img/menu/` y `data/menu.json` (`GET /git/trees/{rama}?recursive=1` filtrando esas rutas, o comparando por SHA de blob); en `carpeta`, los archivos locales.
3. Calcular el diff: `menu.json` nuevo/modificado, fotos nuevas/modificadas (SHA de blob git calculado localmente), fotos huérfanas a borrar. Si no hay diferencias, responder "sin cambios" y no escribir/commitear.
4. **Solo `github`:** crear blobs (base64) solo de lo que cambió; crear un tree con `base_tree`, entradas con `sha: null` para borrados; crear commit (`menu: actualizar desde la app`, con fecha y usuario); actualizar la ref de la rama (sin `force`).
5. Registrar en `menu_publicaciones` y en auditoría.
- `POST /api/menu-web/vista-previa` (devuelve el diff sin publicar) y `POST /api/menu-web/publicar`.
- Bloqueo en memoria para evitar dos publicaciones simultáneas; límite de frecuencia (`rateLimiter.ts`); timeouts de red; si GitHub falla, nada cambia y el error queda registrado y visible.
- La app no espera al deploy: informa "commit enviado" con enlace al commit y al workflow. Opcional: consultar el estado del workflow.
- Tests: el adaptador `carpeta` con un directorio temporal; el `github` con un servidor GitHub simulado.

### A7 — Token y configuración
- Pantalla de ajustes para destino, ruta de carpeta, `owner`/`repo`/`rama` y para pegar el token. El token se guarda con `secretStore`, no se devuelve nunca al cliente (solo "configurado: sí/no") y no se escribe en logs.
- Token **fine-grained** limitado a ese repo, permiso `Contents: read and write`, con vencimiento; anotar la fecha para renovarlo (sección 10).
- Botón "Probar conexión" (lee el repo, no escribe).

### A8 — Permisos y seguridad
- Permiso nuevo (p. ej. `menu_web`) en `src/lib/permissions.ts`; rutas bajo `/api/menu-web` y `/api/recetas/:id/menu-foto` detrás de `authenticate` + `authorize`. Cubrir en `routeAccess.test.ts`.
- Nada de esto se expone fuera de la sesión de la app; ya no existe endpoint público ni clave de API.

### A9 — Carga inicial
Las fotos webp actuales están en `web_menu/contenido/fotos/`. Script opcional de una sola vez (o subida manual desde la pantalla) que las copie a `data/menu_fotos/` y las asocie a recetas por nombre; la descripción pública y la visibilidad se cargan desde la app. Contenido de referencia: `web_menu/src/data/menu.seed.json`.

### A10 — Documentación
Manual de usuario (cómo cargar un producto, foto, publicar) y técnico (token, permisos, destinos, flujo) en `docs/01_Manual_Usuario` y `docs/02_Manual_Tecnico`.

---

# PARTE B — web_menu (repo del sitio)

## 7. Estado actual (verificado)

- `src/data/menu.ts` importa `menu.generated.json` (ignorado por git) o, si no existe, `menu.seed.json`.
- `scripts/generar-contenido.ts` (Excel + sharp → JSON y fotos), `crear-plantilla.ts`, `publicar.ts` (`npm run contenido`, `contenido:plantilla`, `publicar`; publica `dist/` en la rama `gh-pages` y exige `dist/CNAME`).
- `.gitignore` excluye `contenido/`, `public/img/menu/` y `src/data/menu.generated.json`.
- `public/CNAME` existe; `vite.config.ts` sin `base` (dominio propio en la raíz).
- No hay carpeta `.github/`. `exceljs`, `sharp` y `gh-pages` son devDependencies.

## 8. Pasos del sitio

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
- Protege el sitio si la app publica un JSON roto: el workflow falla y el sitio anterior sigue en línea.

### W4 — Workflow de GitHub Actions
`.github/workflows/deploy.yml`:
- Disparadores: `push` a `master` (con `paths` en `data/**`, `public/**`, `src/**`, `scripts/**`, `package*.json`, `index.html`, `vite.config.ts`) y `workflow_dispatch` (para republicar a mano).
- Permisos: `contents: read`, `pages: write`, `id-token: write`. `concurrency` con grupo `pages` para no pisar despliegues.
- Pasos: checkout → setup-node (versión fijada, con caché npm) → `npm ci` → `npm run build` → verificar que `dist/CNAME` exista (misma salvaguarda que hoy) → `upload-pages-artifact` → job `deploy` con `deploy-pages`.
- Fijar las versiones exactas de cada action (con antigüedad suficiente), no `@main`.

### W5 — Cambio de origen en GitHub Pages (una sola vez)
En el repo → Settings → Pages: cambiar **Source** a "GitHub Actions" y confirmar que el dominio personalizado `canelaelaborados.com.ar` y "Enforce HTTPS" siguen activos. El DNS no se toca. Hacerlo después de probar el workflow en una rama.

### W6 — Limpieza (solo tras cerrar la etapa 3)
- Eliminar `scripts/generar-contenido.ts`, `crear-plantilla.ts`, `publicar.ts` y las entradas `contenido`, `contenido:plantilla`, `publicar` de `package.json`.
- Quitar devDependencies `exceljs`, `sharp`, `gh-pages` y `@types/gh-pages` (si ningún otro script las usa); regenerar `package-lock.json`.
- Conservar `scripts/contenido_comun.ts` solo si algo lo usa; si no, borrarlo.
- Archivar `contenido/menu.xlsx` fuera del repo (ya estaba ignorado) y dejar un aviso en el README.
- Borrar la rama `gh-pages` vieja cuando todo esté estable.

### W7 — Documentación
README / `docs`: nuevo flujo ("cargar en la app → Publicar → en 1–2 minutos queda en línea"), cómo ver el estado del deploy (pestaña Actions), cómo volver atrás (revertir el commit de la app o reejecutar un workflow anterior) y cómo cambiar el texto de pedido genérico.

---

# PRUEBAS, CRITERIOS Y RIESGOS

## 9. Plan de pruebas por etapas

| Etapa | App | web_menu | Destino | Rama | Despliega |
|---|---|---|---|---|---|
| 1 | dev (PC, copia de DB) | `npm run dev` | `carpeta` | — | No |
| 2 | producción (Raspberry Pi) | `npm run dev` (rama `menu-test`) | `github` | `menu-test` | No |
| 3 | producción (Raspberry Pi) | GitHub Pages | `github` | `master` | Sí (Actions) |

### Etapa 1 — App y web_menu en modo dev (todo en la PC)
**Objetivo:** validar carga, fotos, JSON y sitio sin GitHub ni red.

Preparación
1. En la PC, restaurar un backup de la base de la app como base de desarrollo.
2. App: `npm run dev` (puerto 3000).
3. En ajustes de "Menú web": destino `carpeta`, ruta = carpeta de `web_menu`.
4. web_menu: `npm run dev`.

Pruebas
1. Marcar 3–4 recetas como "Mostrar en la web", con descripción pública y orden; completar título/nota de sus categorías.
2. Subir una foto (cualquier formato) y confirmar que el navegador la convierte a webp ≤ 800 px; probar rechazo de archivo no webp o demasiado pesado.
3. Vista previa: debe listar nuevos / modificados / eliminados sin escribir.
4. Publicar: aparecen `data/menu.json` y las fotos en web_menu; Vite recarga solo.
5. Revisar en el navegador: categorías, precios, fotos, chips de presentaciones y enlaces de WhatsApp con el texto genérico.
6. Cambios incrementales: renombrar un producto, desmarcarlo, cambiar una foto, borrar una foto → solo cambian los archivos afectados y las fotos huérfanas se eliminan.
7. Publicar sin cambios → "sin cambios".
8. `npm run validar` y `npm run build` en web_menu con el contenido generado.

**Criterio de salida:** el sitio en dev refleja exactamente lo cargado en la app; el JSON no contiene campos de costo; el validador falla con mensajes claros ante un JSON roto (probar editándolo a mano).

### Etapa 2 — App en producción (Raspberry Pi) y web_menu en dev
**Objetivo:** validar la publicación real a GitHub y el comportamiento en la Raspberry Pi 3.

Preparación
1. Crear la rama `menu-test` en `arpedroramos/web_menu` (a partir de `master` con el workflow ya mergeado, o sin él: no debe desplegar).
2. Generar el token de pruebas y cargarlo en la app de la Raspberry Pi; "Probar conexión" debe responder bien.
3. En ajustes: destino `github`, rama `menu-test`.
4. En la PC: `git fetch` y `git checkout menu-test` (o fusionarla en la rama de trabajo); `npm run dev`.

Pruebas
1. Publicar desde la app en la Raspberry Pi; verificar en GitHub **un solo commit** con el JSON y las fotos cambiadas.
2. En la PC: `git pull` y revisar el sitio en `npm run dev`.
3. Repetir los cambios incrementales de la etapa 1 (renombrar, ocultar, cambiar/borrar foto) y confirmar que el commit solo toca lo necesario, incluidos los borrados.
4. Carga real: ~30 productos con fotos; medir tiempo y memoria de la Raspberry Pi durante la publicación (`free -m`, `top`); las fotos deben subir de a una o con concurrencia 2–3.
5. Fallos: desconectar la red de la Raspberry Pi → error claro, nada modificado, registrado en el historial; token inválido o vencido → mensaje de 401; token sin permiso → mensaje de 403/404 del repo.
6. Doble clic en "Publicar" → una sola publicación (bloqueo); publicaciones repetidas → límite de frecuencia.
7. Verificar que el token no aparece en logs, respuestas ni backups sin cifrar.
8. Usuario sin el permiso "Menú web" → 403 en todas las rutas.

**Criterio de salida:** la publicación es confiable y liviana en la Raspberry Pi, y `menu-test` contiene exactamente lo esperado.

### Etapa 3 — Ambos en producción (Raspberry Pi y GitHub Pages)
**Objetivo:** el ciclo completo cargando en la app y viendo el cambio en `canelaelaborados.com.ar`.

Preparación (en este orden)
1. **Probar el workflow sin tocar Pages:** en una rama de prueba, ejecutarlo con `workflow_dispatch`; revisar que build, validación y verificación de `dist/CNAME` pasen y que el artefacto sea correcto.
2. Cambiar en el repo Settings → Pages → Source a **GitHub Actions** (W5); confirmar que el dominio personalizado y "Enforce HTTPS" siguen activos. El DNS no se toca.
3. Mergear a `master` el código de web_menu (workflow, validador, lectura del JSON) y confirmar que el despliegue sale bien con el contenido actual.
4. Recién entonces, en la app: rama `master`, token de producción (permisos mínimos, vencimiento anotado) y confirmación explícita del destino.

Pruebas
1. Publicar un cambio mínimo (por ejemplo, un precio) desde la app.
2. Ver en GitHub: commit en `master` → workflow en ejecución → despliegue correcto.
3. En 1–2 minutos, verificar el cambio en `https://canelaelaborados.com.ar`; revisar HTTPS y que cargan las fotos.
4. Caso de error: publicar (en una rama de prueba o simulando) un JSON inválido → el workflow falla y el sitio anterior **no cambia**.
5. Reversión: revertir el commit de la app en GitHub (o reejecutar un workflow anterior) y confirmar que el sitio vuelve al estado previo.

**Criterio de salida:** el ciclo completo funciona sin intervención manual, el dominio sigue sano y existe un camino de vuelta atrás probado. Recién ahí: W6 (eliminar `npm run publicar`, `gh-pages` y Excel), borrar la rama `gh-pages` vieja y anotar la fecha de vencimiento del token y quién lo renueva.

### Checklist entre etapas
- **1 → 2:** criterios de salida de la etapa 1 cumplidos; destino `github` implementado y probado con servidor simulado; token de pruebas listo.
- **2 → 3:** publicación estable en la Raspberry Pi; workflow probado con `workflow_dispatch`; plan B (`npm run publicar`) todavía disponible; token de producción creado.
- **Después de 3:** limpieza (W6), documentación (A10 y W7) y recordatorio de renovación del token.

## 10. Criterios de aceptación

**App**
- Una receta con `menu_visible = 0`, archivada o subreceta no aparece en el JSON.
- El JSON no contiene ningún campo de costo (test).
- Subir una foto que no es webp, o mayor al tope, se rechaza con mensaje claro; el nombre de archivo nunca viene del cliente.
- "Vista previa" lista nuevos / modificados / eliminados sin escribir en el destino.
- "Publicar" crea **un solo commit** con el JSON y las fotos cambiadas; repetirlo sin cambios no crea commit.
- Con GitHub inalcanzable o token inválido: error claro, nada modificado, queda en el historial.
- El token no aparece en respuestas, logs ni backups sin cifrar.
- Un usuario sin el permiso recibe 403 en todas las rutas del menú.

**Web**
- Con un `data/menu.json` válido, `npm run build` termina sin errores y el sitio muestra categorías, precios, fotos y botones de WhatsApp con el texto genérico.
- Un JSON inválido o con foto inexistente hace fallar `validar` con un mensaje claro y **no** reemplaza el sitio publicado.
- Un push desde la app (commit en `master`) dispara el workflow y el sitio se actualiza en `https://canelaelaborados.com.ar` sin intervención.
- `dist/CNAME` presente en cada despliegue; el dominio y HTTPS siguen funcionando.
- No quedan referencias a Excel, `sharp` ni `gh-pages` en scripts ni dependencias (tras W6).

**Verificación técnica**
- App: `npm test` (tests de `construirMenu`, validación de foto, diff, adaptador `carpeta` y publicación contra un servidor GitHub simulado), `npm run lint` (tsc), `npm run security:smoke`.
- Web: `npm run validar`, `npm run build`, `npm run lint`, `npm run dev` y revisar el menú y los enlaces de WhatsApp.
- Prueba real contra un repo o rama de pruebas antes de apuntar a `master`.

## 11. Riesgos

- **Raspberry Pi 3 (1 GB)**: no cargar todas las fotos a la vez en memoria; subir blobs de a uno (o concurrencia 2–3). El navegador hace la conversión.
- **Tarjeta SD**: las fotos son pocas y chicas; incluirlas en el backup existente.
- **Token filtrado o vencido**: permisos mínimos, vencimiento, y aviso en la pantalla cuando falle con 401.
- **Cambio de subcategoría**: crea una categoría nueva en el menú; la vieja desaparece sola al quedar sin productos visibles (su fila en `menu_categorias` puede borrarse).
- **Dependencia de la app**: el menú ya no se edita fuera de ella; el historial de commits en GitHub sirve de respaldo y permite volver atrás.
- **Cambiar el origen de Pages** puede dejar el sitio caído unos minutos si el workflow no está listo: probar primero en una rama y cambiar el Source solo cuando el despliegue de prueba funcione.
- **Dominio**: sin `CNAME` en `dist/` Pages libera el dominio; la salvaguarda del workflow lo evita.
- **Conflictos de push**: la app hace commit sobre la punta de la rama; si se edita código a mano al mismo tiempo, el push de la app puede fallar (no usa `force` y reintenta tras refrescar la ref). Evitar publicar mientras se hace un push de código.
- **Minutos de Actions**: el repo es chico y el build corto; alcanza con el plan gratuito.
- **Fotos grandes en el repo**: el tope de ~300 KB en la app mantiene el repositorio liviano.

## 12. Orden de ejecución global

1. **Web:** W1 → W2 → W3 → W4 (en rama, con `workflow_dispatch`); verificar con `npm run validar`/`build`.
2. **App:** A1 → A2 → A4 (formulario) → A3 → A5 con tests → A7 → A6 (adaptador `carpeta` primero) → pantalla "Menú web" (A4) → A8.
3. **Etapa 1** de pruebas (todo en la PC).
4. A6 destino `github` con servidor simulado → **Etapa 2** (rama `menu-test`).
5. Verificar el workflow con `workflow_dispatch` → W5 (cambiar Source de Pages) → mergear a `master` → **Etapa 3**.
6. A9 (carga inicial real), A10, W6, W7 y recordatorio de renovación del token.

---

## 13. Seguimiento (memoria viva)

Estados: `pendiente` · `en curso` · `hecho` · `bloqueado`. Actualizar al cerrar cada paso.

| Paso | Repo | Estado | Fecha | Nota |
|---|---|---|---|---|
| W1 Datos versionados | Web | pendiente | | |
| W2 Lectura y pedido genérico | Web | pendiente | | |
| W3 Validación en build | Web | pendiente | | |
| W4 Workflow Actions | Web | pendiente | | |
| W5 Source de Pages | Web | pendiente | | solo tras probar W4 |
| W6 Limpieza | Web | pendiente | | solo tras etapa 3 |
| W7 Documentación | Web | pendiente | | |
| A1 Migraciones | App | pendiente | | |
| A2 Recetas backend | App | pendiente | | |
| A3 Fotos | App | pendiente | | |
| A4 Frontend | App | pendiente | | |
| A5 Generador | App | pendiente | | |
| A6 Publicación (`carpeta` / `github`) | App | pendiente | | |
| A7 Token y configuración | App | pendiente | | |
| A8 Permisos y seguridad | App | pendiente | | |
| A9 Carga inicial | App | pendiente | | |
| A10 Documentación | App | pendiente | | |
| Etapa 1 | Ambos | pendiente | | |
| Etapa 2 | Ambos | pendiente | | |
| Etapa 3 | Ambos | pendiente | | |

**Registro de decisiones** (fecha — decisión — motivo)
- 2026-10-25 — Se unifican los tres planes en este documento; los originales se conservan hasta confirmar.

**Pendientes / preguntas abiertas**
- Definir cómo se trabaja con este documento en cada repo (dónde vive la copia canónica y cómo se sincroniza).
- Vencimiento del token de pruebas y de producción, y quién lo renueva: _sin definir_.
- Estado actual del repo web_menu: el sitio hoy está en construcción por defecto (`VITE_EN_CONSTRUCCION`); en la rama `desarrollo` está en `false` para ver el menú. Decidir cómo encaja con W2/W4.
