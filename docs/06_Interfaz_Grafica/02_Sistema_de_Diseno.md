# Capítulo 2: Sistema de Diseño (Design Tokens)

El sistema visual de App Canela está estructurado en base a las definiciones de marca definitivas de Canela Elaborados.

## 1. Tipografía

Las tipografías se importan en el proyecto mediante el enlace de Adobe Typekit:
```html
<link rel="stylesheet" href="https://use.typekit.net/coc2fgk.css">
```

### Roles y Familias Tipográficas:
* **Título principal:** `optima-nova-lt-pro` (Bold, 700). Color: `#1d1d1b`
* **Cuerpo 1 (Principal):** `optima-nova-lt-pro` (Regular, 400). Color: `#1d1d1b`
* **Cuerpo 2 (Secundario/Lectura):** `gotham` (Medium, 500). Color: `#1d1d1b`
* **Detalle 1 (Manuscrito):** `felt-tip-woman` (Bold, 700). Color: `#a07fa5`
* **Detalle 2 (Llamativos/Rústico):** `coyote` (Bold / Rough, 700). Color: `#38559e`

## 2. Variables CSS Globales (Tokens Oficiales)

A continuación se listan las variables CSS oficiales que deben utilizarse a lo largo del desarrollo:

```css
:root {
    /* === Paleta de Colores === */
    --color-bg-app:             #ede4da;  /* Fondo Crema */
    --color-logo:               #caa6ce;  /* Lavanda del Logo */
    --color-black:              #1d1d1b;  /* Negro de Lectura y Títulos */
    --color-white:              #f4f0ed;  /* Blanco/Crema Claro (Superficies) */
    --color-green:              #a69b03;  /* Verde (Acentos de éxito, orgánico) */
    --color-red:                #ad1c4b;  /* Rojo (Acentos de error o alertas) */
    --color-detail-1:           #a07fa5;  /* Color asociado a Detalle 1 */
    --color-detail-2:           #38559e;  /* Color asociado a Detalle 2 */

    /* === Tipografías (Roles de Marca) === */
    --font-title:               "optima-nova-lt-pro", sans-serif;    /* Weight: 700 (Bold) */
    --font-body-1:              "optima-nova-lt-pro", sans-serif;    /* Weight: 400 (Regular) */
    --font-body-2:              "gotham", sans-serif;                /* Weight: 500 (Medium) */
    --font-detail-1:            "felt-tip-woman", sans-serif;        /* Weight: 700 (Bold) */
    --font-detail-2:            "coyote", sans-serif;                /* Weight: 700 (Bold) */

    /* === Espaciado === */
    --space-unit:   8px;
    --space-1:      8px;
    --space-2:      16px;
    --space-3:      24px;
    --space-4:      32px;
    --space-6:      48px;

    /* === Border Radius === */
    --radius-sm:    4px;
    --radius:       8px;
    --radius-lg:    12px;
    --radius-pill:  999px;
}
```

## 3. Elevación y Sombras

| Nivel | Descripción | Background | Borde | Sombra |
|---|---|---|---|---|
| **0 — Base** | Fondo de la app | `--bg-app` (`#f4f0ed`) | — | — |
| **1 — Cards** | Tarjetas y paneles | `--bg-surface` (`#ffffff`) | `1px solid var(--border-subtle)` | `--shadow-card` (`0 2px 4px rgba(0,0,0,0.02)`) |
| **2 — Modales** | Diálogos, overlays | `--bg-surface` (`#ffffff`) | `1px solid var(--border-subtle)` | `--shadow-modal` (`0 12px 24px rgba(0,0,0,0.08)`) |

## 4. Bordes Suaves (Border Radius)
Se adoptan bordes redondeados suaves para dar a la aplicación un aspecto más moderno, premium y orgánico:
- Usar `rounded-xl` (12px) o `--radius-lg` para contenedores y modales.
- Usar `rounded-lg` (8px) o `--radius` para elementos interactivos y botones.
- **Justificación:** Suavizan la interfaz, reducen la fatiga visual y modernizan la estética corporativa.
