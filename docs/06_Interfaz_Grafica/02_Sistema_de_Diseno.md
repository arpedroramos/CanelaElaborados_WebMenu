# Capítulo 2: Sistema de diseño (tokens)

La fuente de verdad es el bloque `@theme` de `src/index.css`; Tailwind 4 genera las utilidades (`bg-avena`, `text-azul`, `font-title`).

## 1. Colores

| Token | Valor | Uso |
|---|---|---|
| `avena` | `#ede4da` | Fondo base |
| `crema` | `#f4f0ed` | Tarjetas, sección Menú, texto sobre oscuros |
| `lavanda` | `#caa6ce` | Espacios de foto, sección Nosotros |
| `lavanda-suave` | `#e3d3c3` | Segundo tono de la galería |
| `lila` | `#a07fa5` | Bordes de chips y aviso |
| `lila-deep` | `#705873` | Etiquetas y frase de marca |
| `azul` | `#2a3e82` | Titulares, botones, pie |
| `carbon` | `#1d1d1b` | Texto |
| `texto-suave` | `#4a4642` | Descripciones |
| `linea` | `#d9ccc0` | Bordes y separadores |

Las combinaciones de texto aprobadas están en la guía (00, sección 3). Los tokens de shadcn (`--primary`, `--ring`, `--border`) apuntan a estos colores.

## 2. Tipografía

`font-sans` (Gotham), `font-title` (Optima Nova, peso 700), `font-hand` (Felt Tip Woman), `font-cond` (Optima Nova Cond). Todas del kit Typekit, con respaldo genérico del sistema.

| Uso | Tamaño / interlineado |
|---|---|
| h2 de sección | 36/42 (48/54 desde 960 px) |
| h3 de categoría | 30/36 |
| h4 de producto (mayúsculas) | 22/28 |
| Frase de presentación | 30/38 |
| Cuerpo | 16/26 |
| Descripción de producto | 14/22 |
| Etiqueta | 12, espaciado .14em |
| Botón | 13, espaciado .1em, mayúsculas |

## 3. Layout

Contenedor `max-w-wrap` (1120 px), márgenes laterales de 20 px (32 px desde 640 px), secciones con `py-14` y `scroll-margin-top` de 60 px. Breakpoints: `sm` 640 px y `lg` 960 px (redefinido en `@theme`).

## 4. Formas

- Tarjetas: radio 20 px, borde 1,5 px `linea`, fondo crema.
- Fotos: radio 14 px, proporción 4:3.
- Botones y chips: píldora (`rounded-full`).
- Aviso: borde discontinuo lila de 2 px, radio 16 px.
- Sin sombras duras.
