# Plan de implementación — AppGestionCanela (carga del menú y publicación)

Parte 1 de 2. La parte 2 (sitio y deploy) está en `PLAN_IMPLEMENTACION_web_menu.md`.

> Reemplaza el enfoque anterior (API en la red local + sincronización con Excel e `id_app`). Ese enfoque queda descartado: el menú se carga entera en la app y la app lo publica en GitHub.

## 1. Objetivo y alcance

Cargar en cada receta todo lo que necesita el menú web (visible, descripción pública, foto webp, orden) y, con un botón **"Publicar menú"**, subir a GitHub el `menu.json` y las fotos. El build y el deploy los hace GitHub Actions, no la Raspberry Pi.

Fuera de alcance: build de Vite en la Raspberry Pi, edición del menú fuera de la app, texto de pedido de WhatsApp (lo arma web_menu con una plantilla genérica).

## 2. Decisiones cerradas

- Categoría del menú = `recetas.subcategoria`, 1 a 1. Título, nota y orden de cada categoría viven en una tabla nueva.
- Fotos: webp, convertidas **en el navegador** (la Raspberry Pi 3 no procesa imágenes).
- Publicación: un commit atómico a `arpedroramos/web_menu` (rama `master`) vía API de GitHub. Sin `git` ni `node_modules` de web_menu en la Raspberry Pi.
- Nunca se publican costos, márgenes, ingredientes ni proveedores: el JSON se arma con una lista explícita de campos.

## 3. Estado actual (verificado)

- Express + better-sqlite3. `recetas` ya tiene `nombre`, `descripcion`, `subcategoria`, `archivada`, `es_subreceta` (`server/common/db.ts` ~184; `subcategoria` vía `addColumn` ~697). `receta_opciones_venta` tiene `nombre`, `precio_venta`, `es_predeterminado`.
- Migraciones con `addColumn(...)` en `db.ts`. Subida de archivos con `multer` (ejemplo en `server/modules/scrapers/scrapers.routes.ts`).
- Secretos cifrados: `server/common/lib/secretStore.ts`. Auditoría: `server/common/lib/audit.ts`. Errores: `httpErrors.ts`.
- Permisos por rol en `src/lib/permissions.ts` con `authorize`; la ruta nueva debe registrarse ahí y cubrirse en `server/routeAccess.test.ts`.
- Backups: `server/common/lib/backupDir.ts` y `server/modules/system/backup.service.ts` (la carpeta de fotos debe entrar).

## 4. Modelo de datos

**`recetas` (columnas nuevas, `addColumn`)**
- `menu_visible INTEGER DEFAULT 0` — nada se publica hasta marcarlo.
- `menu_descripcion TEXT` — texto público, distinto de `descripcion` interna.
- `menu_foto TEXT` — nombre de archivo webp (ej. `alfajor-maicena.webp`).
- `menu_orden INTEGER DEFAULT 0` — orden dentro de su categoría.

**`menu_categorias` (tabla nueva)**
`subcategoria TEXT PRIMARY KEY`, `etiqueta TEXT`, `titulo TEXT`, `nota TEXT`, `precio_nota TEXT`, `orden INTEGER`, `visible INTEGER DEFAULT 1`. Se crea una fila vacía automáticamente para cada subcategoría que tenga productos visibles.

**`menu_publicaciones` (tabla nueva, historial)**
`id`, `fecha`, `usuario`, `commit_sha`, `estado` (`ok` / `error`), `resumen`, `error`.

**Ajustes de GitHub** (clave/valor en tabla de configuración existente o nueva): `owner`, `repo`, `rama`. El **token** va en `secretStore`.

## 5. Pasos

### A1 — Migraciones
Agregar las columnas y tablas de la sección 4 en `db.ts` con el patrón `addColumn` / `CREATE TABLE IF NOT EXISTS`. Índice por `menu_visible`.

### A2 — Recetas: backend y tipos
En `server/modules/recipes` (service, routes, tipos, esquemas de validación) leer/guardar `menu_visible`, `menu_descripcion`, `menu_orden`. Validar longitudes.

### A3 — Fotos
- Carpeta `data/menu_fotos/` (o equivalente junto a la DB; incluirla en los backups).
- `POST /api/recetas/:id/menu-foto` (multer, memoria, tope ~300 KB): comprobar cabecera webp (`RIFF....WEBP`), generar nombre seguro (slug del nombre + id), guardar, actualizar `menu_foto`, borrar la foto anterior. `DELETE` para quitarla. Nunca usar el nombre que manda el cliente.
- `GET /api/recetas/:id/menu-foto` (o ruta estática autenticada) para mostrarla en la pantalla.
- **Conversión en el navegador**: en el formulario, al elegir imagen, redimensionar a ancho máx. 800 px y exportar con `canvas.toBlob(…, 'image/webp', 0.8)` antes de subir. Si el navegador no soporta webp, avisar.

### A4 — Frontend
- En el formulario de receta: sección **"Menú web"** con checkbox "Mostrar en la web", descripción pública, orden y carga/vista previa/quitar de foto.
- Pantalla **"Menú web"** (nueva, con su permiso): lista de categorías con título, nota, orden y visibilidad editables; lista de productos visibles por categoría; avisos de faltantes (sin foto, sin precio, sin descripción); botón **Publicar**.

### A5 — Generador del menú
`server/modules/menu-web/menuWeb.service.ts` con una función pura `construirMenu(db)` que devuelve `MenuCategory[]` compatible con `src/data/menu_types.ts` de web_menu:
```json
[{ "id": "alfajores", "label": "Alfajores", "title": "Alfajores", "note": "…",
   "items": [{ "title": "Alfajor de maicena", "description": "…",
               "imgSrc": "/img/menu/alfajor-maicena.webp", "price": "$12.000",
               "options": [{ "label": "Caja x6", "order": "" }] }] }]
```
Reglas: `menu_visible = 1`, `archivada = 0`, `es_subreceta = 0`; categoría `id` = slug de la subcategoría (sin tildes, minúsculas); productos ordenados por `menu_orden` y luego nombre; una presentación con precio → `price` formateado es-AR (`$12.000`); varias → `options` con `label` = nombre de la presentación y el precio incluido en la etiqueta si hace falta; `order` se deja vacío (lo completa web_menu). Sin subcategoría → "General". Categorías sin productos visibles se omiten. Campos elegidos uno a uno, nunca `SELECT *`. Salida determinista (mismo orden y formato) para que "sin cambios" sea detectable.

### A6 — Publicación en GitHub
`menuWeb.publicar.ts`, solo con `fetch` (sin dependencias nuevas):
1. Construir el menú y la lista de fotos referenciadas.
2. Leer el árbol actual de `public/img/menu/` y `data/menu.json` en el repo (`GET /git/trees/{rama}?recursive=1` filtrando esas rutas, o comparando por SHA de blob).
3. Calcular el diff: `menu.json` nuevo/modificado, fotos nuevas/modificadas (SHA de blob git calculado localmente), fotos huérfanas a borrar. Si no hay diferencias, responder "sin cambios" y no commitear.
4. Crear blobs (base64) solo de lo que cambió; crear un tree con `base_tree`, entradas con `sha: null` para borrados; crear commit (`menu: actualizar desde la app`, con fecha y usuario); actualizar la ref de la rama (sin `force`).
5. Registrar en `menu_publicaciones` y en auditoría.
- `POST /api/menu-web/vista-previa` (devuelve el diff sin publicar) y `POST /api/menu-web/publicar`.
- Bloqueo en memoria para evitar dos publicaciones simultáneas; límite de frecuencia (`rateLimiter.ts`); timeouts de red; si GitHub falla, nada cambia y el error queda registrado y visible.
- La app no espera al deploy: informa "commit enviado" con enlace al commit y al workflow. Opcional: consultar el estado del workflow.

### A7 — Token y configuración
- Pantalla de ajustes para `owner`/`repo`/`rama` y para pegar el token. El token se guarda con `secretStore`, no se devuelve nunca al cliente (solo "configurado: sí/no") y no se escribe en logs.
- Token **fine-grained** limitado a ese repo, permiso `Contents: read and write`, con vencimiento; anotar la fecha para renovarlo.
- Botón "Probar conexión" (lee el repo, no escribe).

### A8 — Permisos y seguridad
- Permiso nuevo (p. ej. `menu_web`) en `src/lib/permissions.ts`; rutas bajo `/api/menu-web` y `/api/recetas/:id/menu-foto` detrás de `authenticate` + `authorize`. Cubrir en `routeAccess.test.ts`.
- Nada de esto se expone fuera de la sesión de la app; ya no existe endpoint público ni clave de API.

### A9 — Carga inicial
Las fotos webp actuales están en `web_menu/contenido/fotos/`. Script opcional de una sola vez (o subida manual desde la pantalla) que las copie a `data/menu_fotos/` y las asocie a recetas por nombre; la descripción pública y la visibilidad se cargan desde la app. Contenido de referencia: `web_menu/src/data/menu.seed.json`.

### A10 — Documentación
Manual de usuario (cómo cargar un producto, foto, publicar) y técnico (token, permisos, flujo) en `docs/01_Manual_Usuario` y `docs/02_Manual_Tecnico`.

## 6. Criterios de aceptación

- Una receta con `menu_visible = 0`, archivada o subreceta no aparece en el JSON.
- El JSON no contiene ningún campo de costo (test).
- Subir una foto que no es webp, o mayor al tope, se rechaza con mensaje claro; el nombre de archivo nunca viene del cliente.
- "Vista previa" lista nuevos / modificados / eliminados sin escribir en GitHub.
- "Publicar" crea **un solo commit** con el JSON y las fotos cambiadas; repetirlo sin cambios no crea commit.
- Con GitHub inalcanzable o token inválido: error claro, nada modificado, queda en el historial.
- El token no aparece en respuestas, logs ni backups sin cifrar.
- Un usuario sin el permiso recibe 403 en todas las rutas del menú.

## 7. Verificación

- `npm test` (tests de `construirMenu`, validación de foto, diff y publicación contra un servidor GitHub simulado), `npm run lint` (tsc), `npm run security:smoke`.
- Prueba real contra un repo de pruebas (o una rama de prueba) antes de apuntar a `master`.
- En la Raspberry Pi: publicar con ~30 productos y fotos, medir memoria y tiempo (la subida de blobs debe ser secuencial o con concurrencia 2–3).

## 8. Riesgos

- **Raspberry Pi 3 (1 GB)**: no cargar todas las fotos a la vez en memoria; subir blobs de a uno. El navegador hace la conversión.
- **Tarjeta SD**: las fotos son pocas y chicas; incluirlas en el backup existente.
- **Token filtrado o vencido**: permisos mínimos, vencimiento, y aviso en la pantalla cuando falle con 401.
- **Cambio de subcategoría**: crea una categoría nueva en el menú; la vieja desaparece sola al quedar sin productos visibles (su fila en `menu_categorias` puede borrarse).
- **Dependencia de la app**: el menú ya no se edita fuera de ella; el historial de commits en GitHub sirve de respaldo y permite volver atrás.

## 9. Orden sugerido

A1 → A2 → A4 (formulario) → A3 → A5 con tests → A7 → A6 contra repo de pruebas → pantalla "Menú web" (A4) → A8 → A9 → A10. Antes del primer publicar en `master`, terminar y verificar la parte 2 (workflow de Actions).
