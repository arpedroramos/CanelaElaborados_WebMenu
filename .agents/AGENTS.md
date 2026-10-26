# Reglas Globales - Canela Elaborados (Portfolio + Menú)

Este archivo es la **única fuente de verdad** de las reglas globales. Los skills de `.agents/skills/` las citan por número (ej. "Regla 1") y no las copian.

Proyecto: sitio **estático** (portfolio y menú gastronómico) publicado en **GitHub Pages gratis** con dominio propio `canelaelaborados.com.ar`. No hay backend, base de datos ni login.

## 0. Stack y Política de Versiones

- **Fuente de verdad**: `package.json` y `package-lock.json`. Verifica la versión instalada con `npm ls <paquete>` antes de escribir código; nunca asumas una versión.
- **APIs vigentes**: usa solo las APIs de la versión instalada. Prohibidas las deprecadas (ej. `forwardRef` de React 18, `tailwind.config.js` de Tailwind 3).
- **Upgrades mayores**: propónlos al usuario con su impacto; no los apliques sin aprobación.

| Área | Librería | Notas |
|---|---|---|
| UI | React 19 | `ref` como prop, sin `forwardRef`. |
| Lenguaje | TypeScript (`strict`) | Sin `any` injustificado. |
| Build | Vite | Salida estática en `dist/`. |
| Estilos | Tailwind CSS 4 (`@tailwindcss/vite`) | Config CSS-first: tokens en `@theme` de `src/index.css`. |
| Componentes | shadcn/ui sobre `@base-ui/react` | Archivos en `src/components/ui/`. |
| Iconos | `lucide-react` | Único set de iconos. |
| Lint | `oxlint` | `npm run lint`. |

> Al cambiar dependencias, actualiza esta tabla en el mismo commit.

## 1. Diseño y Componentes

- **Un solo sistema de UI**: Tailwind 4 + componentes shadcn. No añadas otra librería de componentes.
- **Tokens de marca**: colores, tipografías y espaciados salen de `@theme` en `src/index.css` (avena, crema, lavanda, lila, azul, carbón, línea). Sin colores hex sueltos en componentes.
- **Fuentes**: 100% Adobe Typekit, únicamente de `<link rel="stylesheet" href="https://use.typekit.net/coc2fgk.css">` en `index.html`. Roles: `font-title` = `optima-nova-lt-pro` (titulares y nombres de producto, siempre peso 700; `coyote` no se usa), `font-sans` = `gotham`, `font-hand` = `felt-tip-woman`, `font-cond` = `optima-nova-lt-pro-cond`. Respaldo solo genérico del sistema. Prohibido agregar otras fuentes (Google Fonts, paquetes de fuentes npm, etc.) o fuentes de iconos; los iconos son `lucide-react` como componentes SVG.
- **Mobile-first**: el menú se consulta desde el teléfono. Diseña para móvil y escala con `sm:`/`md:`/`lg:`. Objetivos táctiles de 44px, contraste AA, sin scroll horizontal.
- **Forma**: botones y chips en píldora, tarjetas con radio 20 px y borde `linea`, sin sombras duras. Los enlaces de pedido usan `buttonClass()` de `src/components/ui/button.tsx`.
- **Animaciones**: el diseño no usa ninguna; solo transiciones de color y feedback de estado. Respeta `prefers-reduced-motion`. No animes propiedades de layout.
- **Diseño de referencia**: `docs/06_Interfaz_Grafica/00_Guia_de_Diseno_Web.md` es la única guía de diseño canónica. Skill `ui-ux-designer`. Si la documentación y `src/index.css` difieren, manda el código y se corrige el documento.

## 2. Informes y Reportes

- Todo informe o auditoría va en su propia subcarpeta `docs/Informes/YYYY-MM-DD_Titulo_Pascal_Snake/`, con el documento principal `YYYY-MM-DD_Titulo_Pascal_Snake.md` y adjuntos en `lower_snake_case`.
- Registra el informe en `docs/00_Indice_General.md`.
- Si una auditoría modifica reglas o tokens, actualiza `docs/06_Interfaz_Grafica/` en el mismo cambio.
- Estilo de redacción: skill `writing-guidelines`.

## 3. Documentación Oficial

Antes de usar una API de librería o servicio externo, consulta su documentación oficial de la versión instalada con las herramientas de búsqueda web. No dependas solo de conocimiento previo.

## 4. Registro de Errores

Tras resolver un error reportado por el usuario o por el compilador/linter, usa el skill `error-documenter`. El registro es un único archivo continuo: `docs/Registro_Errores.md`.

## 5. Arquitectura

- Frontend por módulos: `src/modules/<modulo>/{components,views,hooks}`. Los componentes de UI genéricos van en `src/components/ui/`; las utilidades en `src/lib/`.
- Máximo 3 archivos sueltos en una carpeta `components/`; agrupa el resto en subcarpetas semánticas.
- Imports con alias `@/` (apunta a `src/`); evita rutas relativas profundas.
- Nombres de archivos y carpetas: solo `[a-zA-Z0-9._-]` (ISO/IEC 646), sin espacios, tildes ni "ñ". `PascalCase` para componentes y vistas, `camelCase` con prefijo `use` para hooks, `lower_snake_case` para archivos de datos.
- Fechas en `YYYY-MM-DD` (ISO 8601).

## 6. Datos del Menú

- Productos y precios viven en `src/data/*.ts`, tipados, un archivo por categoría. Cambiar el menú implica editar datos, no componentes.
- Forma de los datos (`src/data/menu_types.ts`): `MenuCategory { id, label, title, note, priceNote?, items, footerCta? }` y `MenuItem { title, description, imgSrc?, order?, cta?, options? }`. El número de WhatsApp y el resto del contacto viven solo en `src/data/contacto.ts`; los enlaces se arman con `buildOrderUrl()` (`src/lib/whatsapp.ts`). Detalle en `docs/06_Interfaz_Grafica/03_Componentes_Basicos_UI.md`.
- Si hace falta un campo nuevo, extiende el tipo y actualiza ese capítulo en el mismo cambio.

## 7. Convenciones de Skills

- Las referencias a archivos dentro de skills usan rutas relativas a la raíz del repositorio, nunca rutas absolutas.
- Las reglas de este archivo no se duplican en los skills; se citan por número.

## 8. Evitar Scrolls Innecesarios

- Lo que quepa en el alto de pantalla no debe necesitar scroll. Prefiere flex/grid y espaciado compacto antes de `overflow: auto`.
- Un solo contenedor de scroll por eje. Sin scroll horizontal evitable.
- Solo listas realmente largas (el catálogo) se desplazan.

## 9. Restricciones de GitHub Pages (plan gratuito)

- **Solo contenido estático**: sin servidor, SSR, API routes, base de datos ni cabeceras HTTP personalizadas. Todo dinamismo ocurre en el navegador.
- **Sin secretos en el cliente**: todo lo que se publica es público. Prohibidas claves privadas, tokens y APIs con credenciales en el código o en `.env` del build.
- **Límites**: sitio publicado ≤ 1 GB, ~100 GB de transferencia al mes, ~10 builds por hora, repositorio recomendado ≤ 1 GB. Úsalo con holgura: imágenes en WebP/AVIF (≤ ~200 KB cada una), `loading="lazy"` fuera del primer viewport, sin video pesado.
- **Despliegue**: se publica la rama `gh-pages` (ver `docs/05_Control_de_Versiones_Git/`). Debe conservar el archivo `CNAME` con `canelaelaborados.com.ar`; en el repo fuente vive en `public/CNAME` para que cada build lo incluya.
- **Rutas**: con dominio propio `base` de Vite es `/`. Si el sitio crece a varias rutas, usa `HashRouter` o una copia de `index.html` como `404.html`; Pages no reescribe rutas.
- **Pedidos y contacto**: enlaces `wa.me`/`mailto:`/redes. Formularios o analítica requieren un servicio externo gratuito (con su política de privacidad).
- **SEO y compartidos**: `<title>`, descripción y Open Graph estáticos en `index.html`; el contenido que debe indexarse no puede depender solo de JavaScript tras interacción.
- **Uso comercial**: Pages no está pensado para comercio electrónico ni pagos; el sitio muestra el menú y deriva los pedidos a canales externos.
