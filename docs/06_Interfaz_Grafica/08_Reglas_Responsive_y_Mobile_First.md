# Capítulo 8: Reglas de Diseño Responsive y Mobile First

Este capítulo establece las **33 reglas canónicas de diseño adaptativo, experiencia móvil y rendimiento visual** para App Canela ("Canela Elaborados"). Todas las vistas, páginas y componentes deben cumplir de manera estricta con estas directrices para asegurar un uso óptimo tanto en dispositivos móviles (smartphones) como en computadoras de escritorio y tablets.

---

## 1. Estrategia Base y Viewport

### Regla 1: Mobile First Siempre
El diseño debe comenzar aplicando clases de Tailwind para pantallas pequeñas (celulares). Los prefijos responsivos (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) se usan **exclusivamente para escalar hacia arriba**, nunca al revés.
```tsx
/* CORRECTO: Mobile first */
<div className="p-4 md:p-8 lg:p-12 flex flex-col md:flex-row">

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
<footer className="pb-safe pt-2 bg-surface">
  {/* El padding inferior respeta la barra de gestos del teléfono */}
</footer>
```

### Regla 4: Evitar Scroll Horizontal Accidental
El layout principal (`App.tsx` o contenedor raíz) debe incluir `overflow-x-hidden` en el wrapper o en el `body`:
```tsx
<main className="w-full overflow-x-hidden min-h-screen bg-app">
```

### Regla 5: Sin Anchos/Altos Absolutos en Contenedores
Evitar dimensiones en píxeles fijos como `w-[400px]` o `h-[600px]` en contenedores estructurales. Utilizar porcentajes (`w-full`), fracciones (`w-1/2`, `w-2/3`), o medidas relativas al viewport (`100vw`, `100vh`).

---

## 2. Layout y Estructura con Tailwind CSS v4

### Regla 6: Grid Adaptativo para Colecciones
Las grillas de tarjetas o productos deben escalar progresivamente según el breakpoint:
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
```

### Regla 7: Flexbox para Alineación Dinámica
Utilizar Flexbox para cambiar la orientación de la interfaz entre móvil y escritorio:
```tsx
<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
```

### Regla 8: Contenedores Max-Width
Evitar que el contenido se estire indefinidamente en monitores ultrawide limitando el ancho máximo y centrifugando con márgenes automáticos:
```tsx
<div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6">
```

### Regla 9: Display Condicional para Navegación
Alternar la visibilidad entre controles móviles y de escritorio mediante utilidades de display (`hidden md:block` vs `block md:hidden`):
```tsx
{/* Menú de escritorio */}
<aside className="hidden md:block w-[260px]">...</aside>

{/* Botón hamburguesa móvil */}
<button className="block md:hidden btn-icon">
  <Menu size={24} />
</button>
```

### Regla 10: Espaciado Escalonado
El espacio en blanco debe escalar proporcionalmente a la pantalla para dar sensación de pulcritud:
```tsx
<section className="space-y-4 md:space-y-6 lg:space-y-8">
```

### Regla 11: Orden Visual Alterado
Usar utilidades de reordenamiento CSS (`order-first`, `order-last`, `md:order-none`) si el orden lógico de lectura en móvil difiere de la disposición en escritorio sin alterar la semántica del DOM.

---

## 3. Tipografía y Contenido Visual

### Regla 12: Tipografía Fluida
Escalar la tipografía mediante utilidades responsivas de Tailwind para mantener legibilidad sin provocar saltos de línea indeseados en pantallas pequeñas:
```tsx
<h1 className="text-headline-sm md:text-headline-md lg:text-headline-lg font-bold">
```

### Regla 13: Manejo de Desbordamiento de Texto
Proteger la interfaz ante cadenas largas o datos cargados por el usuario utilizando `truncate`, `line-clamp-2` o `break-words`:
```tsx
<p className="truncate max-w-[200px] text-body-sm text-muted">
  {materiaPrima.nombre}
</p>
```

### Regla 14: Imágenes Siempre Contenidas
Todas las etiquetas `<img>` deben incluir `w-full`, `h-auto` y `object-cover` u `object-contain`:
```tsx
<img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover rounded-lg" />
```

### Regla 15: Íconos Escalables
Definir dimensiones de íconos mediante clases relativas (`w-5 h-5`, `w-6 h-6` o prop `size` de Lucide) en lugar de dimensiones quemadas en el archivo SVG.

### Regla 16: Relaciones de Aspecto (Aspect Ratio)
Preservar proporciones de imágenes o contenedores con `aspect-video` o `aspect-square`:
```tsx
<div className="w-full aspect-video rounded-lg overflow-hidden bg-surface-variant">
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

## 5. Componentes y Arquitectura en React 19

### Regla 22: Renderizado vs Ocultamiento CSS
Si un componente es computacionalmente pesado (gráficos de análisis, tablas masivas), desmontarlo condicionalmente del DOM en móvil mediante un hook de media query (`useMediaQuery`) en lugar de ocultarlo solo con `hidden`:
```tsx
const isDesktop = useMediaQuery('(min-width: 768px)');
return isDesktop ? <HeavyAnalyticsChart /> : <CompactAnalyticsSummary />;
```

### Regla 23: Tablas Operativas Densas con Columna Fija
Las tablas con alta densidad de información (materias primas, insumos, recetas) deben mantenerse dentro de un contenedor `overflow-x-auto`. La primera columna identificadora debe mantenerse fija con `sticky left-0 bg-surface z-10` durante el scroll horizontal:
```tsx
<div className="overflow-x-auto border border-border-subtle rounded-lg">
  <table className="w-full text-left border-collapse">
    <thead>
      <tr>
        <th className="sticky left-0 bg-surface-variant z-10 p-3">Nombre</th>
        <th className="p-3">Categoría</th>
        <th className="p-3 text-right">Precio</th>
      </tr>
    </thead>
    ...
  </table>
</div>
```

### Regla 24: Modales Adaptativos (`ModalShell`)
Los modales de escritorio (`modal-md`, `modal-lg`) deben transformarse automáticamente en móvil (`< sm`) a pantallas completas o paneles deslizables desde abajo (Bottom Sheets) con bordes superiores redondeados:
```css
@media (max-width: 639px) {
  .modal {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
}
```

### Regla 25: Navegación Pegajosa Inferior (Sticky Bottom)
Las acciones principales en móvil (como "Guardar", "Confirmar", "Agregar") deben estar fijas en la parte inferior (`sticky bottom-0 bg-surface border-t p-4 z-20`) para facilitar su acceso con el pulgar.

### Regla 26: Inputs de Tipo Nativo
Usar siempre el tipo de input adecuado (`type="email"`, `type="tel"`, `type="number"`, `inputMode="decimal"`) para invocar el teclado numérico o especializado del smartphone.

---

## 6. Animaciones y Rendimiento (Motion)

### Regla 27: Respetar Preferencias de Movimiento (`prefers-reduced-motion`)
Configurar Framer Motion y animaciones CSS para respetar las preferencias del usuario:
```tsx
<motion.div animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}>
```

### Regla 28: Animar Únicamente Propiedades Eficientes (`transform` y `opacity`)
Para mantener 60 FPS en procesadores móviles, animar únicamente `transform` (scale, translate) y `opacity`. Prohibido animar `width`, `height`, `margin` o `padding` que provocan recálculos de layout (*layout thrashing*).

### Regla 29: Uso Prudente de la Prop `layout`
Utilizar la prop `layout` de Motion en arreglos pequeños, pero evitar aplicarla masivamente en listas largas extraídas de la base de datos local para prevenir tirones de rendimiento.

### Regla 30: Duraciones Reducidas en Móviles
Las animaciones en dispositivos móviles deben ser un 30% más rápidas (ej. `duration: 0.15s` a `0.2s`) para mantener una sensación de fluidez e inmediatez.

---

## 7. Reglas Específicas de App Canela

### Regla 31: Formularios Complejos Tipo Odoo en Móvil (`RecipeFormModal`, `NewOrderModal`)
El panel lateral derecho de rendimiento y totales (`w-[400px]`) utilizado en modales complejos se apila debajo del formulario principal en móvil (`flex-col lg:flex-row`) o se resume en una barra flotante fija inferior.

### Regla 32: Búsqueda Combobox Anti-Teclado (`InlineSearch.tsx`)
En celulares, las búsquedas flotantes dentro de tablas o modales deben convertirse en un mini-overlay centrado o desplegarse con espacio suficiente para no quedar tapadas por el teclado virtual del teléfono.

### Regla 33: Aislación e Impresión Responsiva (`FichaTecnicaPrinter.tsx`, Reportes)
Los componentes de impresión (`src/components/print`) son adaptativos y fluidos en pantalla, pero bajo la directiva `@media print` fuerzan dimensiones fijos A4 (`print:w-[210mm] print:p-0`), suprimen elementos de interfaz (`print:hidden`) y evitan cortes de página dentro de bloques técnicos (`print:break-inside-avoid`).

---

## Cuadro Resumen de Breakpoints

| Breakpoint | Ancho Mínimo | Dispositivos Destinados | Layout Típico |
|---|---|---|---|
| **Base** | `< 640px` | Celulares en vertical | 1 Columna, Drawer Sidebar, Bottom Sheets |
| `sm:` | `640px` | Celulares grandes / Phablets | 2 Columnas simples, Modales sm |
| `md:` | `768px` | Tablets en vertical / Laptops pequeñas | Sidebar visible (64px/260px), Grid 2-3 col |
| `lg:` | `1024px` | Tablets horizontal / Desktops | Layout 2 columnas Odoo, Grid 3 col |
| `xl:` | `1280px` | Monitores Desktop estándar | Layout completo expandido, Grid 4 col |
| `2xl:` | `1536px` | Monitores Ultra-wide | Contenedor centrado `max-w-screen-2xl` |

---

> **Referencia directa:** Este capítulo es la fuente canónica de responsividad para el skill `@ui-ux-designer` y la guía obligatoria en el desarrollo de vistas y componentes de App Canela.
