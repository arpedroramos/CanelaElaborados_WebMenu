# Capítulo 4: Reglas de Diseño Responsive y Mobile First

Este capítulo establece las **25 reglas canónicas de diseño adaptativo, experiencia móvil y rendimiento visual** para Canela Elaborados. Todas las vistas, páginas y componentes deben cumplir de manera estricta con estas directrices para asegurar un uso óptimo tanto en dispositivos móviles (smartphones) como en computadoras de escritorio y tablets.

---

## 1. Estrategia Base y Viewport

### Regla 1: Mobile First Siempre
El diseño debe comenzar aplicando clases de Tailwind para pantallas pequeñas (celulares). Los prefijos responsivos (`sm:` 640 px y `lg:` 960 px, redefinido en `@theme`; no se usan `md:`, `xl:` ni `2xl:`) se usan **exclusivamente para escalar hacia arriba**, nunca al revés.
```tsx
/* CORRECTO: Mobile first */
<div className="px-5 sm:px-8 flex flex-col lg:flex-row">

/* INCORRECTO: No usar enfoques desktop-first con override */
```

### Regla 2: Meta Viewport Estricto
El archivo `index.html` de Vite debe incluir la configuración accesible de viewport:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
```
*Prohibido usar `user-scalable=no`*, ya que perjudica la accesibilidad para usuarios que requieren zoom visual.

### Regla 3: Safe Areas de Sistemas Operativos
Para evitar que notches o barras de navegación nativas en iOS/Android tapen contenido, utilizar utilidades de safe area o variables CSS de entorno:
```tsx
<footer className="bg-azul pb-[env(safe-area-inset-bottom)] pt-2">
  {/* El padding inferior respeta la barra de gestos del teléfono */}
</footer>
```

### Regla 4: Evitar Scroll Horizontal Accidental
El layout principal (`App.tsx` o contenedor raíz) debe incluir `overflow-x-hidden` en el wrapper o en el `body`:
```tsx
<main className="w-full overflow-x-hidden min-h-screen bg-avena">
```

### Regla 5: Sin Anchos/Altos Absolutos en Contenedores
Evitar dimensiones en píxeles fijos como `w-[400px]` o `h-[600px]` en contenedores estructurales. Utilizar porcentajes (`w-full`), fracciones (`w-1/2`, `w-2/3`), o medidas relativas al viewport (`100vw`, `100vh`).

---

## 2. Layout y Estructura con Tailwind CSS v4

### Regla 6: Grid Adaptativo para Colecciones
Las grillas de tarjetas o productos deben escalar progresivamente según el breakpoint:
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
```

### Regla 7: Flexbox para Alineación Dinámica
Utilizar Flexbox para cambiar la orientación de la interfaz entre móvil y escritorio:
```tsx
<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
```

### Regla 8: Contenedores Max-Width
Evitar que el contenido se estire indefinidamente en monitores ultrawide limitando el ancho máximo y centrifugando con márgenes automáticos:
```tsx
<div className="w-full max-w-wrap mx-auto px-5 sm:px-8">
```

### Regla 9: Display Condicional para Navegación
Alternar la visibilidad entre controles móviles y de escritorio mediante utilidades de display (`hidden lg:block` vs `block lg:hidden`):
```tsx
{/* Enlaces visibles solo en escritorio */}
<nav className="hidden lg:flex gap-6">...</nav>

{/* Botón hamburguesa móvil */}
<button className="block lg:hidden min-h-[44px] min-w-[44px]">
  <Menu size={24} />
</button>
```

### Regla 10: Espaciado Escalonado
El espacio en blanco debe escalar proporcionalmente a la pantalla para dar sensación de pulcritud:
```tsx
<section className="space-y-4 sm:space-y-6 lg:space-y-8">
```

### Regla 11: Orden Visual Alterado
Usar utilidades de reordenamiento CSS (`order-first`, `order-last`, `lg:order-none`) si el orden lógico de lectura en móvil difiere de la disposición en escritorio sin alterar la semántica del DOM.

---

## 3. Tipografía y Contenido Visual

### Regla 12: Tipografía Fluida
Escalar la tipografía mediante utilidades responsivas de Tailwind para mantener legibilidad sin provocar saltos de línea indeseados en pantallas pequeñas:
```tsx
<h1 className="font-title text-[36px] leading-[42px] font-bold lg:text-[48px] lg:leading-[54px]">
```

### Regla 13: Manejo de Desbordamiento de Texto
Proteger la interfaz ante cadenas largas o datos cargados por el usuario utilizando `truncate`, `line-clamp-2` o `break-words`:
```tsx
<p className="truncate max-w-[200px] text-sm text-texto-suave">
  {product.title}
</p>
```

### Regla 14: Imágenes Siempre Contenidas
Todas las etiquetas `<img>` deben incluir `w-full`, `h-auto` y `object-cover` u `object-contain`:
```tsx
<img src={product.imgSrc} alt={product.title} className="w-full h-48 object-cover rounded-lg" />
```

### Regla 15: Íconos Escalables
Definir dimensiones de íconos mediante clases relativas (`w-5 h-5`, `w-6 h-6` o prop `size` de Lucide) en lugar de dimensiones quemadas en el archivo SVG.

### Regla 16: Relaciones de Aspecto (Aspect Ratio)
Preservar proporciones de imágenes o contenedores con `aspect-video` o `aspect-square`:
```tsx
<div className="w-full aspect-video rounded-lg overflow-hidden bg-lavanda">
```

---

## 4. UX y Experiencia Táctil (Touch)

### Regla 17: Áreas de Toque Mínimas (Touch Targets 44px)
Todos los botones, checkboxes y elementos interactivos en pantallas móviles deben tener una superficie táctil mínima de **44x44px**:
```tsx
<button className="min-h-[44px] min-w-[44px] p-2 flex items-center justify-center rounded-lg">
```

### Regla 18: Efectos Hover Controlados
Evitar que los estados hover queden "atrapados" visualmente tras tocar un botón en pantallas táctiles limitándolos a dispositivos con cursor activo (`@media (hover: hover)` o prefijo `hover:` adaptado).

### Regla 19: Formularios Amigables para el Teclado
Al abrir el teclado virtual en móvil, la pantalla se reduce significativamente. Aplicar `scroll-margin` (`scroll-m-20`) a los inputs para asegurar que el elemento enfocado sea totalmente visible.

### Regla 20: Evitar Tooltips Nativos en Móvil
No confiar en tooltips de hover para información crítica. En móvil, sustituir tooltips por textos de ayuda persistentes o modales emergentes al tocar el ícono de ayuda.

### Regla 21: Gestos Naturales
Galerías o carruseles deben soportar deslizamiento táctil (*swipe*) con el dedo además de botones de navegación explícitos.

---

## 5. Formularios y componentes

### Regla 22: Inputs de Tipo Nativo
Usar siempre el tipo de input adecuado (`type="email"`, `type="tel"`, `type="number"`, `inputMode="decimal"`) para invocar el teclado numérico o especializado del smartphone.

---

## 6. Animaciones y Rendimiento (Motion)

### Regla 23: Respetar Preferencias de Movimiento (`prefers-reduced-motion`)
El sitio no usa librerías de animación. Las transiciones CSS deben respetar las preferencias del usuario:
```tsx
<a className="transition-colors motion-reduce:transition-none">
```

### Regla 24: Animar Únicamente Propiedades Eficientes (`transform` y `opacity`)
Para mantener 60 FPS en procesadores móviles, animar únicamente `transform` (scale, translate) y `opacity`. Prohibido animar `width`, `height`, `margin` o `padding` que provocan recálculos de layout (*layout thrashing*).

### Regla 25: Duraciones Reducidas en Móviles
Las animaciones en dispositivos móviles deben ser un 30% más rápidas (ej. `duration: 0.15s` a `0.2s`) para mantener una sensación de fluidez e inmediatez.

---

## Cuadro Resumen de Breakpoints

| Breakpoint | Ancho mínimo | Layout típico |
|---|---|---|
| Base | `< 640px` | 1 columna, márgenes de 20 px, galería 2×2 |
| `sm:` | 640px | Márgenes de 32 px, galería en 4, tarjetas del menú en 2 columnas |
| `lg:` | 960px | Inicio y Nosotros en 2 columnas, titulares de 48 px, pie en 3 columnas |
| Contenedor | 1120px | `max-w-wrap`, centrado |

---

> **Referencia directa:** este capítulo es la fuente canónica de responsividad para el skill `ui-ux-designer`.
