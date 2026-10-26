# Canela — Guía de diseño y estructura web

Documento de referencia para construir la web de Canela (portfolio + menú). Basado en el modelo de identidad aplicada (fondo avena, logo lavanda, titulares azul profundo), el kit de tipografías de Adobe Fonts y la maqueta de diseño original.

> **Implementación.** La tipografía es 100% Adobe Typekit (kit `coc2fgk`): títulos en `optima-nova-lt-pro` (solo pesos 400 y 700; los titulares usan 700) en lugar de `coyote`, que no se usa en la web. Sin Google Fonts. El respaldo es genérico del sistema (`system-ui, sans-serif`, `cursive`). Los tokens reales viven en `src/index.css` (`@theme`: `font-sans`, `font-title`, `font-hand`, `font-cond`).

---

## 1. Tipografías y dónde encontrarlas

Todas las tipografías del proyecto vienen de un único kit de Adobe Fonts (Typekit).

**Cómo cargarlas:** agregar en el `<head>` de la web:

```html
<link rel="stylesheet" href="https://use.typekit.net/coc2fgk.css">
```

**Dónde verlas / administrarlas:** en https://fonts.adobe.com, con la cuenta de Adobe que creó el kit (Mis fuentes → Kits web). El kit se identifica por el código `coc2fgk`. Para usar la web en un dominio propio, el dominio debe estar autorizado en la configuración del kit.

### Familias incluidas en el kit

| Familia (font-family) | Clase Typekit | Pesos | Rol en Canela |
|---|---|---|---|
| `coyote` | `.tk-coyote` | 400, 700 | No se usa en la web (disponible en el kit) |
| `coyote-rough` | `.tk-coyote-rough` | 400, 700 | Variante texturada de Coyote (no usada); solo detalles decorativos |
| `gotham` | `.tk-gotham` | 400, 700 (+ cursivas) | Cuerpo de texto, botones, navegación |
| `gotham-narrow` | `.tk-gotham-narrow` | 400, 700 (+ cursivas) | Etiquetas y datos en espacios acotados |
| `gotham-condensed` | `.tk-gotham-condensed` | 400, 700 (+ cursivas) | Etiquetas, precios, chips |
| `gotham-xnarrow` | `.tk-gotham-xnarrow` | 300, 700 (+ cursivas) | Usos muy puntuales de texto condensado |
| `felt-tip-woman` | `.tk-felt-tip-woman` | 400, 700 | Frase de marca "Artesanal · Calidad · Delicado" |
| `optima-nova-lt-pro-cond` | `.tk-optima-nova-lt-pro-cond` | 400, 700 | Cierre "Hecho en Argentina" |
| `optima-nova-lt-pro` | `.tk-optima-nova-lt-pro` | 400, 700 (+ cursivas) | Titulares, nombres de producto, frases destacadas (peso 700) |
| `optima-nova-lt-pro-titling` | `.tk-optima-nova-lt-pro-titling` | 400 | Rótulos en mayúsculas de alto impacto |

> La asignación de roles es una interpretación del póster de identidad (no hay un manual de marca que la confirme). Validarla con quien diseñó la identidad.

### Stacks recomendados (con respaldo)

```css
/* Cuerpo */
font-family: "gotham", system-ui, sans-serif;
/* Titulares y nombres de producto */
font-family: "optima-nova-lt-pro", system-ui, sans-serif;
/* Frase de marca manuscrita */
font-family: "felt-tip-woman", cursive;
/* Cierre condensado */
font-family: "optima-nova-lt-pro-cond", sans-serif;
```

No se cargan fuentes de Google ni paquetes de fuentes: si el kit no carga, se muestra el respaldo genérico del sistema.

### El logo
El logotipo "CANELA" (letras pesadas) y la mascota no son una fuente: son artes gráficos. Usar siempre los archivos originales (SVG o PNG), nunca reescribirlos con texto.

---

## 2. Paleta de colores

Valores muestreados del póster de identidad (variante avena/lavanda). Validar contra los archivos vectoriales originales: pueden variar levemente por la compresión de las imágenes.

### Paleta principal (la usada en la web)

| Token | Nombre | HEX | Uso |
|---|---|---|---|
| `--avena` | Avena | `#EDE4DA` | Fondo base de la página |
| `--crema` | Crema papel | `#F4F0ED` | Tarjetas, superficies, texto sobre oscuros |
| `--lavanda` | Lavanda | `#CAA6CE` | Logo, fondos suaves, espacios de foto |
| `--lila` | Lila | `#A07FA5` | Contorno de la mascota, líneas decorativas |
| `--lila-deep` | Lila profundo (derivado) | `#705873` | Textos en lila, etiquetas, precios |
| `--azul` | Azul profundo | `#2A3E82` | Titulares, botones, pie de página |
| `--carbon` | Carbón | `#1D1D1B` | Texto de cuerpo |
| `--linea` | Línea | `#D9CCC0` | Bordes de tarjetas y separadores |

### Paleta ampliada de la identidad (variantes de color del póster)

Disponible para promociones, temporadas o variantes de logo. No usar mezclada con la paleta principal en una misma pantalla.

| Nombre | HEX | Nota |
|---|---|---|
| Frutilla | `#AD1C4B` | Fondo con texto crema o durazno |
| Bordo | `#931C47` | Fondo oscuro; texto crema o durazno |
| Azul medio | `#476CB5` | Fondo; texto crema |
| Azul profundo (fondo) | `#38559E` | Fondo; texto crema o durazno |
| Oliva | `#A69B03` | Fondo; texto carbón |
| Oliva oscuro | `#424D30` | Fondo; texto crema o durazno |
| Durazno | `#FCDBB8` | Fondo cálido; texto de apoyo sobre oscuros |
| Lila medio | `#A07FA5` | Fondo; texto carbón |
| Papel blanco | `#F4F0ED` | Variante monocroma |
| Carbón profundo | `#1D1D1B` | Variante monocroma oscura |

---

## 3. Uso de tipografía y color

### Jerarquía tipográfica

| Nivel | Fuente | Tamaño móvil | Tamaño escritorio | Color |
|---|---|---|---|---|
| Título de sección (h2) | Optima Nova 700 | 36 / 42 | 48 / 54 | Azul profundo |
| Título de categoría (h3) | Optima Nova 700 | 30 / 36 | 30 / 36 | Azul profundo |
| Nombre de producto (h4) | Optima Nova 700, mayúsculas | 22 / 28 | 22 / 28 | Carbón |
| Frase de presentación | Optima Nova 400 + 700 | 30 / 38 | 30 / 38 | Azul profundo |
| Cuerpo | Gotham 400 | 16 / 26 | 16 / 26 | Carbón |
| Descripción de producto | Gotham 400 | 14 / 22 | 14 / 22 | `#4A4642` |
| Etiqueta (eyebrow) | Gotham 700, mayúsculas, espaciado .14em | 12 | 12 | Lila profundo |
| Frase de marca | Felt Tip Woman | 26 | 28 | Lila profundo (claro) / Lavanda (sobre azul) |
| Botón | Gotham 700, mayúsculas, espaciado .1em | 13 | 13 | Según botón |
| Cierre | Optima Nova Cond, mayúsculas | 26 | 26 | Crema (sobre azul) |

Formato de la tabla: tamaño / interlineado, en píxeles.

### Qué color va sobre qué fondo

Contrastes calculados con la fórmula WCAG. Mínimo 4,5:1 para texto normal, 3:1 para texto grande (≥24 px o ≥19 px en negrita).

**Combinaciones aprobadas para texto**

| Fondo | Texto | Contraste |
|---|---|---|
| Crema `#F4F0ED` | Carbón `#1D1D1B` | 14,9:1 |
| Avena `#EDE4DA` | Carbón `#1D1D1B` | 13,4:1 |
| Avena `#EDE4DA` | Azul profundo `#2A3E82` | > 7:1 |
| Avena `#EDE4DA` | Lila profundo `#705873` | 5,0:1 |
| Lavanda `#CAA6CE` | Carbón `#1D1D1B` | 7,9:1 |
| Azul profundo `#2A3E82` | Crema `#F4F0ED` | > 8:1 |
| Azul profundo `#2A3E82` | Lavanda `#CAA6CE` | > 4,5:1 (comprobar al implementar) |
| Frutilla `#AD1C4B` | Crema `#F4F0ED` | 6,1:1 |
| Oliva oscuro `#424D30` | Crema `#F4F0ED` | 7,9:1 |

**Combinaciones prohibidas para texto**

| Combinación | Contraste | Por qué |
|---|---|---|
| Lavanda sobre crema / avena | 1,7–1,9:1 | Solo vale como gráfica grande (logo), nunca como texto |
| Lila `#A07FA5` sobre avena | 2,75:1 | Reservado a contornos y decorado; para texto usar lila profundo |
| Durazno sobre crema | 1,2:1 | Ilegible |
| Carbón sobre frutilla / azul / oliva oscuro | 1,9–2,4:1 | No cumple |
| Frutilla sobre azul o bordo | 1,0–1,4:1 | No usar juntos |

### Regla de identidad

Cada fondo oscuro lleva una tinta clara (crema o durazno); cada fondo claro lleva una tinta oscura (carbón) o un color de marca. El logo y la mascota se invierten siempre contra el fondo. El logo lavanda sobre avena es la excepción deliberada de la identidad y solo funciona por su tamaño grande.

### Botones

- **Primario:** fondo azul profundo, texto crema, forma de píldora, hover a carbón.
- **Secundario:** borde azul profundo de 2 px, texto azul profundo, hover a fondo crema.
- **Chips de opción** (relleno, harina): borde lila, texto lila profundo, hover a fondo lavanda con texto carbón.
- Alto mínimo táctil: 44 px (48 px en botones principales).

### Superficies y formas

- Tarjetas: fondo crema, borde `#D9CCC0` de 1,5 px, radio de 20 px.
- Espacios de foto: radio de 14 px dentro de la tarjeta, 4:3.
- Aviso de anticipación: borde discontinuo lila de 2 px, fondo crema, radio de 16 px.
- Sin sombras duras; la profundidad viene del contraste entre avena y crema.

---

## 4. Estructura general de la web

Página única (single page) con navegación por anclas y una barra de pestañas fija. Una sola columna en móvil que se ensancha en pantallas grandes.

| Orden | Bloque | Ancla | Fondo |
|---|---|---|---|
| 1 | Barra superior (logo + botón "Encargar") | — | Avena |
| 2 | Pestañas de navegación (fijas al hacer scroll) | — | Avena translúcido |
| 3 | Inicio | `#inicio` | Avena |
| 4 | Menú (pestañas Tartas / Budines) | `#menu` | Crema |
| 5 | Trabajos (portfolio) | `#trabajos` | Avena |
| 6 | Nosotros | `#nosotros` | Lavanda |
| 7 | Contacto y pie | `#contacto` | Azul profundo |

**Navegación:** Inicio · Menú · Trabajos · Nosotros · Contacto.
**Acción principal en toda la página:** pedir por WhatsApp (+54 9 221 399-0505).

---

## 5. Estructura específica de cada bloque

### 5.1 Barra superior
- Logotipo "CANELA" (imagen) alineado a la izquierda, alto 30 px.
- Botón "Encargar" (primario, pequeño) a la derecha, enlace a WhatsApp con mensaje prellenado.

### 5.2 Pestañas de navegación
- Barra horizontal pegada arriba (`position: sticky`), se desliza con el dedo si no entra.
- Cinco pestañas en mayúsculas, alto 48 px, subrayado lavanda al pasar el cursor.

### 5.3 Inicio
1. Imagen de logo + mascota (recorte del póster), centrada, ancho máximo 560 px.
2. Frase de marca en Felt Tip Woman: "Artesanal · Calidad · Delicado".
3. Texto de presentación en Optima Nova: "Canela es un emprendimiento que realiza pastelería artesanal. Quienes consumen los productos lo hacen por ser caseros, artesanales y personalizados a la necesidad de cada persona."
4. Aviso: "Pedidos con 48 a 72 horas hábiles de anticipación." *(dato tomado de la referencia; confirmar)*
5. Dos botones: "Ver el menú" (primario) y "Pedir por WhatsApp" (secundario).

### 5.4 Menú
- Título "Tartas y budines" y selector de dos pestañas (Tartas / Budines) que funciona solo con CSS, con botones de 48 px.
- **Tartas** (24 cm de diámetro), 7 tarjetas: Coco y dulce de leche · Tofi · Pastafrola · Lemon pie · Key lime pie · Tarta de manzana invertida · Tiramisú.
- **Budines** (550/600 grs), 9 tarjetas: Limón · Limón y amapolas · Naranja o pomelo · Chocolate · Integral de chocolate · Banana · Banana, chocolate y nuez · Vainilla · Vainilla y chips de chocolate.
- **Anatomía de cada tarjeta:**
  1. Espacio de foto del producto (4:3, lavanda mientras no haya imagen).
  2. Nombre en Optima Nova, mayúsculas.
  3. Descripción en Gotham (texto del menú impreso).
  4. Acción: enlace "Pedir esta tarta" a WhatsApp, o chips de opción.
- **Opciones con chips:** Pastafrola (Membrillo / Batata / Mixta) y Budín de banana (Harina blanca / Integral); cada chip abre WhatsApp con la opción ya escrita.
- Precios: marcador `[PRECIO]` junto al título de cada categoría hasta tener datos reales.

### 5.5 Trabajos (portfolio)
- Título "Trabajos recientes" y una línea de apoyo.
- Galería de 4 fotos (2×2 en móvil, 4 en una fila desde 640 px), con espacios reservados.
- Botón secundario "Ver más en Instagram" → @canelacakeslp.

### 5.6 Nosotros
- Fondo lavanda. Mascota a la izquierda (arriba en móvil), texto a la derecha.
- Título: "Soy Yesi, mis amigxs ya me dicen Canela."
- Historia en dos párrafos (los textos del póster) y cierre en cursiva: "Ayudándome en todo y apoyándome a seguir dando pasos con Canela."

### 5.7 Contacto y pie
- Fondo azul profundo, texto crema.
- Frase de marca en lavanda y botón "Escribir por WhatsApp".
- Datos: +54 9 221 399-0505 · @canelacakeslp · www.canelacakes.com.
- Enlaces internos: Menú, Trabajos, Nosotros.
- Cierre en Optima Nova Cond: "HECHO EN ARGENTINA · 100% EMPRENDIMIENTO NACIONAL".

### Datos pendientes de confirmar
Precios, fotos reales de productos y trabajos, horarios y retiro, correo de contacto, alérgenos y plazo exacto de anticipación (la referencia dice 48 a 72 horas hábiles).

---

## 6. Reglas para mobile first

### Principios
1. **Se diseña primero para 360–390 px de ancho** y se agrega complejidad hacia arriba con `min-width` (nunca al revés).
2. **Una sola columna** por defecto. Las rejillas de varias columnas aparecen desde 640 px (galería, tarjetas) y 960 px (inicio y nosotros en dos columnas).
3. **Sin scroll horizontal** en la página; solo la barra de pestañas se desliza, y está pensada para eso.

### Puntos de quiebre
| Ancho | Qué cambia |
|---|---|
| Base (< 640 px) | Una columna, márgenes laterales de 20 px, galería 2×2 |
| ≥ 640 px | Márgenes de 32 px, galería en 4, tarjetas del menú en 2 columnas |
| ≥ 960 px | Inicio y Nosotros en dos columnas, titulares más grandes (48 px), pie en 3 columnas |
| Contenedor máximo | 1120 px, centrado |

### Tacto y lectura
- **Zona táctil mínima de 44 × 44 px** (botones, chips, pestañas, enlaces de pedido). Separación de al menos 8 px entre elementos tocables.
- **Cuerpo de texto de 16 px como mínimo** (14 px solo para descripciones breves de producto con contraste ≥ 4,5:1).
- Línea de texto de 45–75 caracteres; en móvil, texto alineado a la izquierda (centrado solo en el bloque de inicio).
- Contraste mínimo 4,5:1 en texto normal y 3:1 en texto grande; no usar color como único indicador de estado.

### Navegación y acción
- Pestañas fijas arriba y botón "Encargar" siempre visible en la barra superior.
- Cada pedido abre WhatsApp (`https://wa.me/5492213990505?text=...`) con un mensaje que ya nombra el producto; evita formularios en el móvil.
- Anclas con compensación del alto de la barra fija (`scroll-margin-top: 60px`).
- Teléfono y WhatsApp como enlaces `tel:` y `wa.me`.

### Rendimiento
- Imágenes de producto en proporción 4:3, formato WebP o JPG optimizado, ancho máximo 800 px, con `loading="lazy"` por debajo del primer pliegue.
- El logo y la mascota como imágenes livianas (PNG optimizado o, preferiblemente, SVG).
- Cargar solo los pesos de fuente necesarios (Gotham 400/700, Optima Nova 700, Felt Tip Woman 400).
- Evitar animaciones pesadas; respetar `prefers-reduced-motion`.

### Accesibilidad básica
- Un solo `h1` por página; jerarquía h2 → h3 → h4 sin saltos.
- `alt` descriptivo en logo, mascota y fotos de producto ("Tarta de limón con merengue", no "foto1").
- Foco visible en pestañas, botones y chips (anillo lavanda de 3 px).
- Elementos interactivos reales (`<a>`, `<button>`, `<input>` con `<label>`); nada de `div` con clic.

### Lista de verificación antes de publicar
- [ ] Probado en 360, 390 y 430 px de ancho, y en horizontal.
- [ ] Ningún texto queda por debajo de 4,5:1 de contraste.
- [ ] Todos los botones y chips miden al menos 44 px de alto.
- [ ] El menú Tartas / Budines cambia correctamente con el dedo.
- [ ] Los enlaces de WhatsApp abren el chat con el mensaje del producto.
- [ ] Las fotos de producto están en 4:3 y no deforman la tarjeta.
- [ ] El kit de Adobe Fonts carga en el dominio final.
- [ ] Precios, horarios y alérgenos reemplazados por datos reales.
