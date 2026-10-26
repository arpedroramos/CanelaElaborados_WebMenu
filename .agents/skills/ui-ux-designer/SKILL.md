---
name: ui-ux-designer
description: Diseñador gráfico del portfolio y menú de Canela Elaborados; aplica la identidad de marca, tokens, tipografía y reglas responsive mobile-first. Usar cuando el usuario pida crear, modificar o estilizar una sección, componente o página, elegir colores o tipografías, o revisar la coherencia visual.
license: MIT
metadata:
  author: app-canela
  version: "4.0.0"
---

# UI/UX Designer (Canela Elaborados)

Garantiza coherencia visual absoluta del sitio. Las reglas globales están en `.agents/AGENTS.md` (Reglas 1 y 8).

## Fuentes de verdad

| Recurso | Contenido |
|---|---|
| `src/index.css` (`@theme`) | Tokens reales de color, tipografía, radios y espaciado. **Manda sobre cualquier tabla de documentación.** |
| `docs/06_Interfaz_Grafica/00_Guia_de_Diseno_Web.md` | **Diseño canónico**: estructura, tipografía, color y mobile-first. |
| `docs/06_Interfaz_Grafica/01_Manual_de_Marca.md` | Logotipos, paleta y tipografía oficiales. |
| `docs/06_Interfaz_Grafica/02_Sistema_de_Diseno.md` | Tokens, espaciados, radios. |
| `docs/06_Interfaz_Grafica/03_Componentes_Basicos_UI.md` | Botones, componentes de la página y formato de datos. |
| `docs/06_Interfaz_Grafica/04_Reglas_Responsive_y_Mobile_First.md` | Reglas responsive. |
| `src/components/ui/` | Componentes shadcn en uso. |

Si la documentación y `src/index.css` difieren, usa `src/index.css` y avisa al usuario para actualizar el manual.

## Principios de marca

- Cálido, artesanal y legible: la comida es la protagonista, la interfaz no compite con ella.
- Fondos avena y crema, texto carbón, titulares azul profundo, acentos lavanda y lila. Nada de blanco puro (`#fff`) ni negro puro (`#000`) fuera de contextos definidos.
- Tipografías 100% Adobe Typekit: `font-title` = optima-nova-lt-pro (700), `font-sans` = gotham, `font-hand` = felt-tip-woman, `font-cond` = optima-nova-lt-pro-cond; no agregues otras familias ni fuentes de iconos (Regla 1).
- Jerarquía clara: nombre del producto, descripción breve y precio se distinguen a simple vista.

## Reglas de implementación

1. **Tokens, no valores**: usa las clases generadas por `@theme` (`bg-avena`, `text-azul`, `font-title`). Si falta un color, agrégalo a `@theme` y úsalo desde ahí.
2. **Componentes**: parte de `src/components/ui/` (shadcn). Extiende con variantes (`class-variance-authority`) en lugar de duplicar componentes.
3. **Formas**: tarjetas `rounded-[20px]` con borde `linea`, fotos `rounded-[14px]`, botones y chips `rounded-full`.
4. **Iconos**: solo `lucide-react`, con tamaño por clase (`size-5`).
5. **Campos interactivos**: borde visible, fondo sutil y foco con anillo de color de marca; nunca estilizados como texto plano.
6. **Contraste AA**: texto secundario con token (`text-texto-suave`), sin opacidad sobre texto ni grises claros.
7. **Estados**: hover, foco visible y `disabled` en todo control.

## Responsive mobile-first

Referencia completa: `docs/06_Interfaz_Grafica/04_Reglas_Responsive_y_Mobile_First.md` (25 reglas numeradas).

1. Clases base para móvil; `sm:`, `md:`, `lg:`, `xl:` solo para escalar.
2. Viewport con `maximum-scale=5.0`; nunca `user-scalable=no`.
3. Áreas seguras (`env(safe-area-inset-*)`) en barras fijas.
4. Sin scroll horizontal: contenedores con `max-w-*` y `mx-auto`, textos con `break-words`/`line-clamp-*`.
5. Grillas adaptativas (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) y flex que cambia de dirección (`flex-col md:flex-row`).
6. Espaciado escalonado (`p-4 md:p-8 lg:p-12`) y tipografía fluida (`text-base md:text-lg`).
7. Imágenes con `w-full h-auto object-cover`, `aspect-*` fijo para evitar saltos de layout, `loading="lazy"` fuera del primer viewport y `width`/`height` declarados.
8. Objetivos táctiles mínimos de 44x44px.
9. Hover solo bajo `@media (hover: hover)`; sin tooltips que dependan del hover en móvil.
10. Tipos de input nativos (`type="tel"`, `inputMode`) cuando exista un formulario.
11. Acción principal ("Encargar" por WhatsApp) siempre visible en la barra superior y con mensaje prellenado; sin formularios en móvil.

## Animaciones

- Permitidas: entradas suaves, transiciones de color y feedback de estado con clases `transition-*`.
- Prohibidas: animar propiedades de layout (`width`, `height`, `top`) y todo lo que retrase el contenido principal.
- Respeta `prefers-reduced-motion` (`motion-reduce:`).
- `animate-spin`/`animate-pulse` solo para carga y esqueletos.

## Verificación visual

1. `npm run dev` y revisar en 360px, 768px y 1280px de ancho.
2. Comprobar contraste y foco por teclado.
3. `npm run build` sin errores.
