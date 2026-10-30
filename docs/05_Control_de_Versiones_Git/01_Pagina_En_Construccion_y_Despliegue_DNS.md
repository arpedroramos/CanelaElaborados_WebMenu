# Despliegue en GitHub Pages y Configuración DNS

Cómo se publica **Canela Elaborados** en GitHub Pages con su dominio `canelaelaborados.com.ar`, cómo ver el estado del despliegue y cómo volver atrás.

---

## 🎨 Identidad Visual de la página "En construcción"
- **Color de Fondo:** `#ede4da` (Variable `--color-canela-bg`)
- **Color del Logotipo:** `#caa6ce` (Variable `--color-canela-logo`)
- **Logotipo:** SVG oficial embebido directamente en el HTML.

---

## 🌿 Ramas y despliegue

| Rama | Uso | ¿Despliega? |
| :--- | :--- | :--- |
| `main` | Producción. Cada push que cambie `data/`, `public/`, `src/`, `scripts/`, `package*.json`, `index.html`, `vite.config.ts` o el workflow dispara el despliegue. | Sí |
| `desarrollo` | Trabajo de código. | No |
| `menu-test` | Pruebas de publicación desde la app. | No |

El despliegue lo hace GitHub Actions (`.github/workflows/deploy.yml`): `npm ci` → `npm run build` (valida el menú, compila) → comprueba que exista `dist/CNAME` → publica en GitHub Pages. También se puede lanzar a mano (*Run workflow*), pero el entorno `github-pages` **solo admite la rama `main`**: ejecutarlo desde otra rama prueba el build y rechaza el despliegue.

La rama `gh-pages` y el publicador manual (`npm run publicar`) ya no existen.

### Modo "en construcción"

`data/sitio.json` (versionado) define `enConstruccion`:
- `true`: el sitio muestra "Sitio en construcción", con `noindex`, `robots.txt` con `Disallow: /` y sin sitemap.
- `false`: el sitio muestra el menú.

Se decide al compilar: cambiarlo en `main` dispara un despliegue (1–2 minutos hasta verlo). Se puede editar a mano o, cuando exista, desde la app (Ajustes › Web Menu). `npm run validar` falla si el archivo falta o `enConstruccion` no es `true`/`false`. **Al mergear una rama a `main`, revisar el valor de `data/sitio.json`** para no cambiar el modo del sitio real sin querer.

Para ver el menú en la PC sin tocar el archivo: crear `.env.local` (ignorado por git) con `VITE_EN_CONSTRUCCION=false`; si esa variable existe, manda sobre `data/sitio.json`.

---

## 🔎 Ver el estado del despliegue

En GitHub: repo `CanelaElaborados_WebMenu` › pestaña **Actions** › workflow **Deploy**. Tiene que terminar con `build` y `deploy` en verde (1–2 minutos). Si `build` falla, el paso en rojo dice por qué (por ejemplo, un `data/menu.json` inválido) y **el sitio publicado no cambia**.

## ↩️ Volver atrás

- **Revertir el commit** que causó el problema en `main` (por ejemplo, la publicación de la app): el push dispara un despliegue con el estado anterior.
- O, en Actions, abrir una ejecución anterior que haya salido bien y usar **Re-run all jobs**.

---

## 🌐 Configuración del Dominio Personalizado

Dominio **`canelaelaborados.com.ar`** (registrado en NIC.ar) con **Cloudflare** como proveedor gratuito de DNS.

### 1. Delegación en NIC.ar
Delegaciones apuntando a los servidores de nombres de Cloudflare:
- **Host 1:** `bristol.ns.cloudflare.com`
- **Host 2:** `uriah.ns.cloudflare.com`

*La propagación desde NIC.ar suele demorar entre 1 y 4 horas.*

### 2. Registros DNS en Cloudflare
En **DNS > Records**, con proxy desactivado (Nube Gris / *DNS Only*):

| Tipo | Nombre (Host) | Contenido (Destino) | TTL | Proxy Status | Descripción |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `185.199.108.153` | Auto | Gris (Desactivado) | Servidor de GitHub Pages 1 |
| **A** | `@` | `185.199.109.153` | Auto | Gris (Desactivado) | Servidor de GitHub Pages 2 |
| **A** | `@` | `185.199.110.153` | Auto | Gris (Desactivado) | Servidor de GitHub Pages 3 |
| **A** | `@` | `185.199.111.153` | Auto | Gris (Desactivado) | Servidor de GitHub Pages 4 |
| **CNAME** | `www` | `arpedroramos.github.io` | Auto | Gris (Desactivado) | Redirección de subdominio www |

### 3. Configuración en GitHub Pages
En `CanelaElaborados_WebMenu > Settings > Pages`:
- **Source:** GitHub Actions.
- **Custom Domain:** `canelaelaborados.com.ar`.
- **Enforce HTTPS:** Activo.

> [!WARNING]
> El dominio depende del archivo `CNAME`, que vive en `public/CNAME` para que cada build lo incluya en `dist/`. El workflow falla si `dist/CNAME` no existe; sin él, Pages libera el dominio.

---

> [!NOTE]
> Límites del plan gratuito de GitHub Pages: sitio publicado de hasta 1 GB, unos 100 GB de transferencia al mes y unos 10 builds por hora; solo contenido estático. Ver Regla 9 de `.agents/AGENTS.md`.
