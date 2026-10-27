# Informe SEO — Canela (WebMenu)

Fecha de la auditoría: 2026-10-26 · Rama: `desarrollo` · Sitio: `https://canelaelaborados.com.ar`

Leyenda de estado: ✔ está bien · ⚠ parcial · ✘ falta. Prioridad: **P1** rápido y de alto impacto · **P2** importante · **P3** mejora posterior.

> **Las tablas de las secciones 2 a 6 muestran el estado de la auditoría original (2026-10-26).** Lo corregido después está en la [sección 10](#10-estado-de-las-correcciones).

## 1. Resumen ejecutivo

El sitio tiene una base sana (HTML semántico, mobile-first, imágenes WebP livianas, HTTPS), pero **hoy Google casi no puede ver ni entender el negocio**: es una página única que se dibuja con JavaScript, sin `robots.txt`, sin `sitemap.xml`, sin datos estructurados, con la sección de tortas escondida detrás de un `#` y con textos de relleno ("Lorem ipsum") en el menú. Además **no existe política de privacidad** ni ninguna página legal.

| Tipo de SEO | Estado | Lo más urgente |
|---|---|---|
| Técnico | ⚠ | `robots.txt`, `sitemap.xml`, canonical, JSON-LD, imagen para compartir, prerender |
| On-Page | ⚠ | Título/descripción con "La Plata", jerarquía de títulos, URLs reales en vez de `#` |
| Contenidos | ✘ | Reemplazar Lorem ipsum, página de tortas personalizadas, preguntas frecuentes |
| Off-Page | ✘ | Ficha de Google Business Profile, reseñas, enlaces y menciones locales |
| Legal y confianza | ✘ | Política de privacidad, aviso de terceros/cookies, datos del responsable |

## 2. SEO Técnico

| Ítem | Estado | Evidencia | Prio | Esfuerzo |
|---|---|---|---|---|
| HTTPS y dominio propio | ✔ | `public/CNAME`, GitHub Pages | — | — |
| Adaptado a celular (`viewport`) | ✔ | `index.html:6` | — | — |
| Imágenes WebP ≤150 KB, con `width`/`height` | ✔ | `public/img` (308 KB en total), `data/menu.json` | — | — |
| `robots.txt` | ✘ | no existe en `public/` | P1 | Bajo |
| `sitemap.xml` (+ sitemap de imágenes) | ✘ | no existe; ya previsto en `Cerebro/Decisiones.md` (2026-10-26) | P1 | Bajo |
| `<link rel="canonical">` | ✘ | `index.html` | P1 | Bajo |
| Datos estructurados JSON-LD (`Bakery`/`LocalBusiness`, `Menu`, `Offer`) | ✘ | no hay ningún `application/ld+json` | P1 | Medio |
| Imagen para compartir (`og:image`, `og:url`, `twitter:card`) | ✘ | `index.html:11-15` solo tiene título, descripción y locale | P1 | Bajo |
| Contenido visible sin JavaScript (prerender / generación estática) | ✘ | `index.html:20` solo tiene `<div id="root">`; todo se dibuja con React | P2 | Medio-alto |
| Rutas indexables (sin `#`) | ✘ | `src/App.tsx:10` usa `#/tortas-personalizadas`; Google ignora lo que va después del `#` | P2 | Medio |
| Página 404 útil (GitHub Pages) | ✘ | falta `404.html` | P2 | Bajo |
| Fuentes externas (Typekit) con carga que bloquea el dibujado | ⚠ | `index.html:9` (`<link rel="stylesheet">` bloqueante) | P2 | Bajo |
| Archivos sueltos que podrían quedar publicados | ⚠ | `desktop.html`, `screen.html`, `temp_under_construction/` en la raíz | P3 | Bajo |
| Medición (Search Console, Lighthouse) | ✘ | sin verificación del sitio ni auditoría automática | P1 | Bajo |

**Nota sobre el estado "en construcción":** `VITE_EN_CONSTRUCCION` en `.env` decide si se publica el sitio real. Mientras esté activo, Google indexa la pantalla de construcción (título "Canela - Sitio en Construcción"). Conviene activar el sitio real antes de enviar el sitemap.

## 3. SEO On-Page

| Ítem | Estado | Evidencia | Prio | Esfuerzo |
|---|---|---|---|---|
| `lang="es"` | ✔ | `index.html:2` | — | — |
| `<title>` presente | ⚠ | "Canela — Pastelería artesanal": no dice la ciudad ni qué se vende | P1 | Bajo |
| Meta description | ⚠ | `index.html:7` habla de "tartas y budines", pero el menú tiene cereales, desayunos, tortas, etc. | P1 | Bajo |
| Un solo `<h1>` por página | ✔ | `Hero.tsx:6` | — | — |
| Contenido del `<h1>` | ⚠ | Es una frase larga y no menciona "La Plata" ni "tortas personalizadas" | P2 | Bajo |
| Jerarquía de títulos | ⚠ | `MenuSection.tsx:12` usa `<h3>` sin un `<h2>` de "Menú" antes; el pie usa `<h4>` (`ContactFooter.tsx:31`) | P2 | Bajo |
| Títulos distintos por vista | ⚠ | `App.tsx:25-30` los cambia con JS, pero Google no siempre lo lee | P2 | Medio |
| Texto `alt` de imágenes | ⚠ | Menú ✔ (`imgAlt`); portfolio de tortas depende de `trabajos.ts`; los `alt` del menú son largos (repiten la descripción y el Lorem) | P2 | Bajo |
| Nombres de archivo con palabra clave | ✔ | `…-canela-elaborados.webp` | — | — |
| URLs amigables | ✘ | todo vive en `/` con `#menu`, `#trabajos`, etc. | P2 | Medio |
| Enlaces internos con texto descriptivo | ⚠ | Las pestañas son anclas; no hay enlaces a páginas propias | P3 | Bajo |
| Precios en formato estructurado | ✘ | `$3.500` es texto; falta `Offer` con `priceCurrency: "ARS"` | P2 | Medio |

## 4. SEO de Contenidos

| Ítem | Estado | Evidencia | Prio | Esfuerzo |
|---|---|---|---|---|
| Descripciones de productos reales | ✘ | **12** descripciones "Lorem ipsum" en `data/menu.json` — Google las indexa tal cual | **P1** | Bajo (carga desde la App) |
| Página propia de tortas personalizadas | ✘ | `TortasView.tsx` es solo un `<h1>` vacío | P1 | Medio |
| Textos por categoría (qué incluye, para qué ocasión) | ⚠ | Hay `note` en algunas categorías (p. ej. Desayunos); el resto vacío | P2 | Bajo |
| Preguntas frecuentes (plazos 48-72 h, entrega, zonas, alérgenos, cómo se paga) | ⚠ | Hecho 2026-10-26: `FaqSection.tsx` + `src/data/preguntas.ts`. Faltan alérgenos y conservación (pendiente de datos verificados) | P2 | Bajo |
| Intención de búsqueda local ("tortas personalizadas La Plata", "box de desayuno La Plata") | ✘ | "La Plata" aparece solo en el pie | P1 | Bajo |
| Sección "Nosotros" con historia real | ✔ | `AboutSection.tsx` — buena para confianza (E-E-A-T) | — | — |
| Blog / novedades / temporada (Día de la Madre, Pascuas, Navidad) | ✘ | no existe | P3 | Medio, continuo |
| Fotos reales propias con contexto | ⚠ | las del menú sí; el portfolio de tortas depende de la carga | P2 | Bajo |

## 5. SEO Off-Page

| Ítem | Estado | Qué hacer | Prio |
|---|---|---|---|
| Ficha de **Google Business Profile** (La Plata, pastelería, horarios, fotos, enlace al sitio y a WhatsApp) | ✘ | Crearla y verificarla; es lo que más pesa para búsquedas locales | **P1** |
| Reseñas de clientes en Google | ✘ | Pedirlas por WhatsApp tras cada entrega (con un enlace directo a la ficha) | P1 |
| Instagram enlazado desde el sitio (`sameAs` en JSON-LD) y el sitio enlazado desde la biografía de Instagram | ⚠ | Hay enlace desde el pie, falta el sentido inverso y el marcado | P1 |
| Directorios y guías locales (Páginas Amarillas, guías gastronómicas de La Plata, Facebook, Pinterest) | ✘ | Mismos datos NAP (nombre, dirección/zona, teléfono) en todos lados | P2 |
| Menciones y enlaces de blogs, medios locales, proveedores o eventos | ✘ | Colaboraciones, notas, ferias de emprendedores | P3 |
| Consistencia de marca (Canela / Canela Elaborados) | ⚠ | El sitio dice "Canela", los archivos "canela-elaborados", Instagram "canelaelaborados": elegir un nombre principal | P2 |

## 6. Legal y confianza (lo que preguntaste)

> No es asesoría legal. Conviene validar el texto final con un profesional.

| Ítem | Estado | Por qué importa | Prio |
|---|---|---|---|
| **Política de privacidad** | ✘ | Google Business Profile, Search Console y los buscadores la valoran como señal de confianza; además es exigible en cuanto hay datos personales | **P1** |
| Aviso de terceros / cookies | ✘ | Las fuentes de Adobe (Typekit, `index.html:9-10`) reciben la IP del visitante; los botones llevan a WhatsApp e Instagram (Meta). Si se agrega Google Analytics, el aviso es obligatorio en la práctica | P1 |
| Datos del responsable (nombre o razón social, contacto, CUIT si corresponde) | ✘ | Confianza y requisito de la Ley 25.326 (Protección de Datos Personales, AAIP) | P1 |
| Términos del servicio de pedidos (plazos, señas, cambios, cancelaciones, retiro y envío) | ✘ | Evita malos entendidos; es el contenido de "Preguntas frecuentes" | P2 |
| Información de alimentos (alérgenos, conservación, habilitación) | ✘ | Verificar requisitos locales (municipalidad de La Plata / ANMAT / Código Alimentario Argentino) | P2 |
| Página de contacto clara | ⚠ | Está en el pie (WhatsApp + Instagram + zona), sin dirección ni horarios | P2 |

**Sugerencia de implementación:** una ruta `/privacidad` (y `/terminos`) enlazada desde el pie, con texto corto en español: qué datos se recolectan (hoy ninguno propio: solo el mensaje que la persona envía por WhatsApp), qué terceros intervienen (Adobe Fonts, WhatsApp/Meta, Instagram/Meta, GitHub Pages como hosting), cómo ejercer los derechos de acceso/rectificación/supresión y cómo contactar.

## 7. Hoja de ruta propuesta

**Fase 1 — base indexable (1 sesión, bajo esfuerzo):**
1. `public/robots.txt` y `public/sitemap.xml`.
2. `canonical`, `og:image`, `og:url`, `twitter:card`, title y description con "La Plata".
3. JSON-LD `Bakery` (nombre, zona, teléfono, `sameAs` Instagram, `priceRange`).
4. Verificar el sitio en Search Console y enviar el sitemap.
5. Crear la ficha de Google Business Profile.

**Fase 2 — contenido y confianza:**
6. Reemplazar los 12 Lorem ipsum por descripciones reales (desde AppGestion, según el contrato `data/menu.json`).
7. Página "Tortas personalizadas" con contenido y galería.
8. Política de privacidad, términos y preguntas frecuentes.
9. Arreglar la jerarquía de títulos (`h1` → `h2` → `h3`).

**Fase 3 — estructura:**
10. Rutas reales sin `#` + generación estática o prerender (para que Google reciba HTML completo).
11. JSON-LD de menú/ofertas con precios, sitemap de imágenes, `404.html`.
12. Lighthouse en el flujo de despliegue (`.github/workflows/deploy.yml`).

**Continuo:** reseñas, publicaciones de temporada, directorios locales.

## 8. Recursos oficiales (Google y afines)

| Recurso | Para qué |
|---|---|
| Guía de inicio de SEO — Google Search Central (`developers.google.com/search/docs/fundamentals/seo-starter-guide`) | El "manual" base de Google; cubre los 4 tipos |
| Google Search Console (`search.google.com/search-console`) | Verificar el sitio, enviar sitemap, ver consultas y errores de indexación |
| Datos estructurados: `LocalBusiness`, `Product`, `Menu` — Search Central → "Structured data" | Cómo escribir el JSON-LD |
| Rich Results Test (`search.google.com/test/rich-results`) | Probar el JSON-LD |
| Fundamentos de SEO con JavaScript — Search Central → "JavaScript SEO basics" | Específico para sitios React/SPA como este |
| Sitemaps (incluidos los de imágenes) — Search Central | Formato y envío |
| Google Business Profile Help (`support.google.com/business`) | Ficha local y reseñas |
| PageSpeed Insights y Lighthouse (repo `GoogleChrome/lighthouse`) | Medir velocidad y SEO técnico |
| web.dev — Core Web Vitals (`web.dev/vitals`) | Qué significan LCP, INP, CLS |
| Schema.org (`schema.org/Bakery`) | Vocabulario del marcado |
| AAIP — Ley 25.326 (`argentina.gob.ar/aaip`) | Referencia de protección de datos personales en Argentina |

Las URLs son las rutas habituales de cada producto; confirmarlas al abrirlas, porque Google reorganiza su documentación con frecuencia.

## 9. Cómo medir los resultados

- **Search Console:** impresiones, clics, páginas indexadas, estado del sitemap.
- **Lighthouse (SEO ≥ 95, Rendimiento ≥ 90 en móvil)** al terminar cada fase.
- **Rich Results Test** sobre la portada.
- **Google Business Profile:** vistas, llamadas, clics a WhatsApp.
- Búsquedas de control: "pastelería artesanal La Plata", "tortas personalizadas La Plata", "box desayuno La Plata".

## 10. Estado de las correcciones

Actualizado 2026-10-27 · commits en `desarrollo` (sin push).

**Hecho en código:**

| Hallazgo | Corrección |
|---|---|
| `robots.txt`, `sitemap.xml` (con fotos del menú), `404.html` | `scripts/prerender.ts`; el workflow verifica que existan |
| Canonical, `og:url`, `og:image`, `twitter:card`, título y descripción con La Plata | `index.html` + `src/data/rutas.ts` (cada ruta con su título y descripción) |
| JSON-LD (`Bakery`, `Menu`, ofertas en ARS, `BreadcrumbList`) | `src/lib/jsonld.ts`, inyectado en el build; omite las descripciones «Lorem» |
| Contenido visible sin JavaScript | HTML prerenderizado por ruta (`react-dom/server`) |
| Rutas con `#` | Rutas reales (`/privacidad/`, `/terminos/`, `/tortas-personalizadas/`); el hash viejo redirige |
| Typekit bloqueante | Carga asíncrona con `<noscript>` |
| Jerarquía de títulos | `h1` con La Plata, `h2` «Menú», `h3` en el pie |
| Política de privacidad, términos | `/privacidad/` y `/terminos/` (borrador: validar con un profesional) |
| Preguntas frecuentes | Sección con pestaña propia (faltan alérgenos y conservación) |
| Archivos sueltos | Movidos a `docs/archivo/prototipos/` |
| Medición | `npm run auditar` (Lighthouse móvil) y paso informativo en el workflow |

Lighthouse local (móvil, 2026-10-27): SEO 100 · Rendimiento 98 · Accesibilidad 100 · Buenas prácticas 100.

**Pendiente, con tarea del usuario:** Google Business Profile, Search Console (verificar y enviar el sitemap **después** de pasar `VITE_EN_CONSTRUCCION=false`), enlace en la bio de Instagram, directorios y reseñas, reemplazar los 12 «Lorem ipsum», contenido de la página de tortas personalizadas (después pasar `indexar: true` en `src/data/rutas.ts`), alérgenos y conservación, horarios, validar el JSON-LD con el Rich Results Test una vez publicado.

**Pendiente con AppGestion (sesión aparte):** que `imgAlt` sea `"{producto} – Canela Elaborados"` (≤ 125) en vez de repetir la descripción.

**Pendiente menor:** `alt` descriptivos del portfolio de tortas (`src/data/trabajos.ts`) cuando se carguen las fotos; datos de precio/horario en JSON-LD si se quieren mostrar.
