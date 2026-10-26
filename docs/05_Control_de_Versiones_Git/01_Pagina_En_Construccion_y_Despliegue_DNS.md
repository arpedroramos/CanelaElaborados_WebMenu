# Despliegue en GitHub Pages y Configuración DNS

Este documento registra de forma detallada el proceso técnico, los comandos utilizados y los valores de configuración establecidos para publicar la página "En Construcción" de **Canela Elaborados** en GitHub Pages con su dominio personalizado `canelaelaborados.com.ar`.

---

## 🎨 Identidad Visual y Colores de Marca
Para esta página, se utilizaron los siguientes valores de la identidad visual de Canela:
- **Color de Fondo:** `#ede4da` (Variable `--color-canela-bg`)
- **Color del Logotipo:** `#caa6ce` (Variable `--color-canela-logo`)
- **Logotipo:** SVG oficial embebido directamente en el HTML.

---

## 🌿 Estrategia de Git y Ramas
Para no interrumpir ni mezclar los archivos del desarrollo del menú interactivo (React + Vite + Tailwind CSS) con la página temporal de "En construcción", se utilizó la siguiente estrategia de ramas:

1. **Rama `master`**: Rama de desarrollo activo. Contiene toda la aplicación y se edita/prueba localmente (`npm run dev`).
2. **Rama `gh-pages`**: Rama de producción. Es una rama huérfana (*orphan*) sin el código fuente: contiene solo el contenido de `dist/` (resultado de `npm run build`). GitHub Pages la lee para servir la web pública. La página "En construcción" inicial se publicó así; el sitio definitivo se publica con el mismo mecanismo.

### Comandos Git utilizados para el despliegue inicial (página en construcción):

```bash
# 1. Guardar y comitear el trabajo actual en master
git add .
git commit -m "chore: save current development state"

# 2. Crear una rama huérfana sin historial llamada gh-pages
git checkout --orphan gh-pages

# 3. Limpiar los archivos del working directory (a salvo en master)
git rm -rf .

# 4. Crear el archivo index.html en la raíz de gh-pages
# (Se copió el index.html diseñado con el SVG oficial y CSS)

# 5. Comitear el archivo estático
git add index.html
git commit -m "feat: add under construction landing page"

# 6. Vincular el repositorio a GitHub (si es la primera vez)
git remote add origin https://github.com/arpedroramos/web_menu.git

# 7. Subir a GitHub forzando la creación de la rama gh-pages
git push origin gh-pages --force

# 8. Regresar a la rama master para seguir programando
git checkout master
```

---

## 🌐 Configuración del Dominio Personalizado

Se configuró el dominio propio **`canelaelaborados.com.ar`** (registrado en NIC.ar) utilizando **Cloudflare** como proveedor gratuito de administración de DNS.

### 1. Delegación en NIC.ar
Se agregaron las delegaciones en NIC.ar apuntando a los servidores de nombres provistos por Cloudflare:
- **Host 1:** `bristol.ns.cloudflare.com`
- **Host 2:** `uriah.ns.cloudflare.com`

*Nota: La propagación de servidores de nombres desde NIC.ar suele demorar entre 1 y 4 horas a nivel global.*

### 2. Configuración de registros DNS en Cloudflare
En la sección **DNS > Records** de Cloudflare, se crearon los siguientes registros con el estado de proxy desactivado (Nube Gris / *DNS Only*):

| Tipo | Nombre (Host) | Contenido (Destino) | TTL | Proxy Status | Descripción |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `185.199.108.153` | Auto | Gris (Desactivado) | Servidor de GitHub Pages 1 |
| **A** | `@` | `185.199.109.153` | Auto | Gris (Desactivado) | Servidor de GitHub Pages 2 |
| **A** | `@` | `185.199.110.153` | Auto | Gris (Desactivado) | Servidor de GitHub Pages 3 |
| **A** | `@` | `185.199.111.153` | Auto | Gris (Desactivado) | Servidor de GitHub Pages 4 |
| **CNAME** | `www` | `arpedroramos.github.io` | Auto | Gris (Desactivado) | Redirección de subdominio www |

### 3. Configuración en GitHub Pages
En la interfaz de GitHub del repositorio (`web_menu > Settings > Pages`):
- **Source:** Deploy from a branch.
- **Branch:** `gh-pages` / `/ (root)`.
- **Custom Domain:** `canelaelaborados.com.ar`.
- **Enforce HTTPS:** Activo (Genera el certificado SSL gratis una vez propagado el DNS).

> [!WARNING]
> Cuando GitHub Pages guarda el dominio personalizado en la interfaz, genera de manera automática un archivo llamado **`CNAME`** en la rama `gh-pages`. Si en el futuro necesitas actualizar la rama de producción (`gh-pages`) de forma manual, recuerda conservar o volver a crear el archivo `CNAME` con el texto `canelaelaborados.com.ar` para que el dominio no se desconfigure.

---

## 🚀 Publicar una nueva versión del sitio

> [!TIP]
> Desde que el menú se edita en Excel, el camino habitual es `npm run publicar` (genera el contenido, compila y publica en `gh-pages`). Ver [Contenido del menú desde Excel](./02_Contenido_del_Menu_desde_Excel.md). Los pasos manuales siguientes quedan como alternativa.

1. En `master`: `npm run build`. Verifica que `dist/` contiene `CNAME` (viene de `public/CNAME`).
2. Publica el contenido de `dist/` en `gh-pages` sin mezclar el historial de `master`:
   ```bash
   git worktree add ../web_menu_gh-pages gh-pages
   # reemplazar el contenido de ../web_menu_gh-pages por el de dist/ (conservando .git)
   cd ../web_menu_gh-pages
   git add -A
   git commit -m "deploy: actualizar sitio"
   git push origin gh-pages
   cd ../web_menu
   git worktree remove ../web_menu_gh-pages
   ```
3. Espera unos minutos y comprueba `https://canelaelaborados.com.ar`.

> [!NOTE]
> Límites del plan gratuito de GitHub Pages: sitio publicado de hasta 1 GB, unos 100 GB de transferencia al mes y unos 10 builds por hora; solo contenido estático. Ver Regla 9 de `.agents/AGENTS.md`.
