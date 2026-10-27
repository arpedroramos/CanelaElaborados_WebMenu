# Plan de pruebas y entornos — AppGestionCanela + web_menu

Complementa `PLAN_IMPLEMENTACION_AppGestionCanela.md` y `PLAN_IMPLEMENTACION_web_menu.md`. Define cómo probar el flujo completo en tres etapas, de menos a más real.

## 1. Principio

La app **nunca habla con web_menu directamente**: solo le deja archivos (`data/menu.json` y `public/img/menu/*.webp`). Por eso cada etapa se prueba cambiando **el destino de la publicación**, no el código.

## 2. Cambio requerido en el plan de la app: destino configurable

En el paso A6 (publicación) agregar un adaptador de destino, elegido en los ajustes de "Menú web":

| Destino | Qué hace | Se usa en |
|---|---|---|
| `carpeta` | Escribe `data/menu.json` y las fotos directo en una carpeta local (ruta configurable, ej. `C:\Users\arped\Desktop\App Canela\web_menu`). Sin commit ni token. | Etapa 1 |
| `github` | Commit atómico por API al repo `arpedroramos/web_menu`, en la **rama configurable**. | Etapas 2 y 3 |

Reglas:
- El mismo código genera el JSON y calcula el diff; solo cambia dónde se escribe.
- En `carpeta`, el "diff" se calcula contra los archivos que ya hay en esa carpeta.
- La rama por defecto es `menu-test`; pasar a `master` requiere cambiarla a propósito y confirmar en pantalla ("Vas a publicar en el sitio real").
- Se muestra siempre el destino activo en la pantalla "Menú web" (carpeta o `repo@rama`).
- Tests: el adaptador `carpeta` se prueba con un directorio temporal; el `github` con un servidor GitHub simulado.

## 3. Reglas comunes a las tres etapas

- **Nunca** apuntar una app de desarrollo a `master` con el token real.
- En desarrollo usar una **copia** de la base (backup restaurado en la PC), no la DB real de la Raspberry Pi.
- Token de pruebas distinto al de producción: fine-grained, solo ese repo, `Contents: read and write`, vencimiento corto.
- El workflow de Actions dispara solo con `master` (y `workflow_dispatch`), así que `menu-test` no despliega nada.
- Hasta cerrar la etapa 3, dejar funcionando el flujo viejo (`npm run publicar` y la rama `gh-pages`) como plan B.

## 4. Etapa 1 — App y web_menu en modo dev (todo en la PC)

**Objetivo:** validar carga, fotos, JSON y sitio sin GitHub ni red.

**Preparación**
1. En la PC, restaurar un backup de la base de la app como base de desarrollo.
2. App: `npm run dev` (puerto 3000).
3. En ajustes de "Menú web": destino `carpeta`, ruta = carpeta de `web_menu`.
4. web_menu: `npm run dev`.

**Pasos de prueba**
1. Marcar 3–4 recetas como "Mostrar en la web", con descripción pública y orden; completar título/nota de sus categorías.
2. Subir una foto (cualquier formato) y confirmar que el navegador la convierte a webp ≤ 800 px; probar rechazo de archivo no webp o demasiado pesado.
3. Vista previa: debe listar nuevos / modificados / eliminados sin escribir.
4. Publicar: aparecen `data/menu.json` y las fotos en web_menu; Vite recarga solo.
5. Revisar en el navegador: categorías, precios, fotos, chips de presentaciones y enlaces de WhatsApp con el texto genérico.
6. Cambios incrementales: renombrar un producto, desmarcarlo, cambiar una foto, borrar una foto → solo cambian los archivos afectados y las fotos huérfanas se eliminan.
7. Publicar sin cambios → "sin cambios".
8. `npm run validar` y `npm run build` en web_menu con el contenido generado.

**Criterio de salida:** el sitio en dev refleja exactamente lo cargado en la app; el JSON no contiene campos de costo; el validador falla con mensajes claros ante un JSON roto (probar editándolo a mano).

## 5. Etapa 2 — App en producción (Raspberry Pi) y web_menu en dev

**Objetivo:** validar la publicación real a GitHub y el comportamiento en la Raspberry Pi 3.

**Preparación**
1. Crear la rama `menu-test` en `arpedroramos/web_menu` (a partir de `master` con el workflow ya mergeado, o sin él: no debe desplegar).
2. Generar el token de pruebas y cargarlo en la app de la Raspberry Pi; "Probar conexión" debe responder bien.
3. En ajustes: destino `github`, rama `menu-test`.
4. En la PC: `git fetch` y `git checkout menu-test` (o fusionarla en la rama de trabajo); `npm run dev`.

**Pasos de prueba**
1. Publicar desde la app en la Raspberry Pi; verificar en GitHub **un solo commit** con el JSON y las fotos cambiadas.
2. En la PC: `git pull` y revisar el sitio en `npm run dev`.
3. Repetir los cambios incrementales de la etapa 1 (renombrar, ocultar, cambiar/borrar foto) y confirmar que el commit solo toca lo necesario, incluidos los borrados.
4. Carga real: ~30 productos con fotos; medir tiempo y memoria de la Raspberry Pi durante la publicación (`free -m`, `top`); las fotos deben subir de a una o con concurrencia 2–3.
5. Fallos: desconectar la red de la Raspberry Pi → error claro, nada modificado, registrado en el historial; token inválido o vencido → mensaje de 401; token sin permiso → mensaje de 403/404 del repo.
6. Doble clic en "Publicar" → una sola publicación (bloqueo); publicaciones repetidas → límite de frecuencia.
7. Verificar que el token no aparece en logs, respuestas ni backups sin cifrar.
8. Usuario sin el permiso "Menú web" → 403 en todas las rutas.

**Criterio de salida:** la publicación es confiable y liviana en la Raspberry Pi, y `menu-test` contiene exactamente lo esperado.

## 6. Etapa 3 — Ambos en producción (Raspberry Pi y GitHub Pages)

**Objetivo:** el ciclo completo cargando en la app y viendo el cambio en `canelaelaborados.com.ar`.

**Preparación (en este orden)**
1. **Probar el workflow sin tocar Pages:** en una rama de prueba, ejecutarlo con `workflow_dispatch`; revisar que build, validación y verificación de `dist/CNAME` pasen y que el artefacto sea correcto.
2. Cambiar en el repo Settings → Pages → Source a **GitHub Actions**; confirmar que el dominio personalizado y "Enforce HTTPS" siguen activos. El DNS no se toca.
3. Mergear a `master` el código de web_menu (workflow, validador, lectura del JSON) y confirmar que el despliegue sale bien con el contenido actual.
4. Recién entonces, en la app: rama `master`, token de producción (permisos mínimos, vencimiento anotado) y confirmación explícita del destino.

**Pasos de prueba**
1. Publicar un cambio mínimo (por ejemplo, un precio) desde la app.
2. Ver en GitHub: commit en `master` → workflow en ejecución → despliegue correcto.
3. En 1–2 minutos, verificar el cambio en `https://canelaelaborados.com.ar`; revisar HTTPS y que cargan las fotos.
4. Caso de error: publicar (en una rama de prueba o simulando) un JSON inválido → el workflow falla y el sitio anterior **no cambia**.
5. Reversión: revertir el commit de la app en GitHub (o reejecutar un workflow anterior) y confirmar que el sitio vuelve al estado previo.

**Criterio de salida:** el ciclo completo funciona sin intervención manual, el dominio sigue sano y existe un camino de vuelta atrás probado. Recién ahí:
- eliminar `npm run publicar`, `gh-pages` y Excel del repo (paso W6),
- borrar la rama `gh-pages` vieja,
- anotar la fecha de vencimiento del token y quién lo renueva.

## 7. Resumen

| Etapa | App | web_menu | Destino de publicación | Rama | Despliega |
|---|---|---|---|---|---|
| 1 | dev (PC, copia de DB) | `npm run dev` | `carpeta` | — | No |
| 2 | producción (Raspberry Pi) | `npm run dev` (rama `menu-test`) | `github` | `menu-test` | No |
| 3 | producción (Raspberry Pi) | GitHub Pages | `github` | `master` | Sí (Actions) |

## 8. Lista de verificación antes de pasar a cada etapa

- **1 → 2:** los criterios de salida de la etapa 1 pasan; destino `github` implementado y probado con servidor simulado; token de pruebas listo.
- **2 → 3:** publicación estable en la Raspberry Pi; workflow probado con `workflow_dispatch`; plan B (`npm run publicar`) todavía disponible; token de producción creado.
- **Después de 3:** limpieza (W6), documentación (A10 y W7) y recordatorio de renovación del token.
