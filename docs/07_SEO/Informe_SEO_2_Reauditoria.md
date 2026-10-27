# Informe SEO 2 — Reauditoría de Canela Elaborados (WebMenu)

Fecha: 2026-10-27 · Rama: `desarrollo` (commit `4230ce7`) · Medido sobre el build local (`npm run build`), no sobre el sitio publicado.
Compara con el [primer informe](Informe_SEO.md) (2026-10-26). Leyenda: ✔ bien · ⚠ mejorable · ✘ falta. Prioridad: **P1** · **P2** · **P3**.

## 1. Resumen

El sitio pasó de «casi invisible para Google» a **técnicamente listo para indexarse**. Lo que impide hoy un buen posicionamiento ya no es código: es **contenido real** (descripciones, fotos de tortas) y **presencia externa** (Google Business Profile, reseñas), más pasar el sitio de «en construcción» a producción.

| Tipo de SEO | Antes | Ahora | Lo que queda |
|---|---|---|---|
| Técnico | ⚠ | ✔ | Publicar, verificar en Search Console, validar JSON-LD ya en línea |
| On-Page | ⚠ | ⚠ | `alt` del menú con texto de relleno, descripciones cortas de legales, marca «Canela» vs «Canela Elaborados» |
| Contenidos | ✘ | ⚠ | 12 «Lorem ipsum», página de tortas vacía, sin alérgenos, sin contenido por ocasión |
| Off-Page | ✘ | ✘ | Todo pendiente (tareas tuyas): ficha de Google, reseñas, directorios |
| Legal y confianza | ✘ | ⚠ | Validar textos con un profesional; horarios; alérgenos |

Medición local (Lighthouse móvil): **SEO 100 · Rendimiento 98 · Accesibilidad 100 · Buenas prácticas 100** (LCP ≈ 1,7 s).

## 2. SEO Técnico

| Ítem | Estado | Evidencia | Prio |
|---|---|---|---|
| HTTPS, dominio propio, adaptado a móvil | ✔ | `public/CNAME`, `viewport` | — |
| HTML visible sin JavaScript (prerender) | ✔ | `dist/index.html` trae `h1`, menú y FAQ ya dibujados | — |
| URLs reales con barra final, 404 propio | ✔ | `/privacidad/`, `/terminos/`, `/tortas-personalizadas/`, `dist/404.html` | — |
| `robots.txt` y `sitemap.xml` (con fotos) | ✔ | generados en el build; el workflow verifica `robots.txt` y `404.html` | — |
| Canonical por página | ✔ | todas menos el 404 (a propósito) | — |
| JSON-LD | ✔ | `Bakery` + `Menu` + ofertas ARS en la portada; `BreadcrumbList` en legales | — |
| `noindex` donde corresponde | ✔ | `/tortas-personalizadas/` y 404 | — |
| Imagen social y Open Graph | ✔ | `og-canela-elaborados.png` 1200×630 | — |
| **Sitio en modo construcción en `main`** | ⚠ | con `enConstruccion: true` en `data/sitio.json` todo queda `noindex` y sin sitemap: correcto hoy, pero hay que apagarlo al lanzar | **P1** |
| Validación del JSON-LD en el Rich Results Test | ⚠ | solo se puede con el sitio publicado | P1 |
| Search Console verificado + sitemap enviado | ✘ | tarea manual | P1 |
| `www` → dominio sin `www`, «Enforce HTTPS» en Pages | ⚠ | no verificable desde el código: revisar en GitHub Pages y Cloudflare | P2 |
| Fuentes de Adobe (terceros) | ⚠ | cargan asíncronas; sin ellas se ve la tipografía de respaldo unos instantes | P3 |
| Datos de JSON-LD ausentes: horarios, `priceRange`, calificaciones | ⚠ | sin dato real todavía; sumarlos cuando existan | P3 |
| Auditoría automática | ✔ | `npm run auditar` + paso informativo en el workflow (no bloquea) | — |

## 3. SEO On-Page

| Ítem | Estado | Evidencia | Prio |
|---|---|---|---|
| Un `h1` por página, jerarquía ordenada | ✔ | portada: `h1` → `h2` Menú → `h3` categorías → `h4` productos; legales `h1` + `h2` | — |
| Títulos (40–53 caracteres) | ✔ | únicos por página, con marca y ciudad en la portada | — |
| Meta descriptions | ⚠ | portada 132 (bien); `/terminos/` 85 y `/tortas-personalizadas/` 104 son cortas: ampliar a ~120–155 | P3 |
| Palabra clave local «La Plata» | ✔ | título, descripción, `h1`, pie y JSON-LD | — |
| `alt` de imágenes del menú | ⚠ | las 7 fotos llevan `alt` «producto – Lorem ipsum… – Canela Elaborados»: el relleno se indexa. Se corrige al cargar las descripciones y con la nota de contrato para AppGestion | **P1** (al lanzar) |
| `alt` del portfolio de tortas | ⚠ | `trabajos.ts` tiene 4 textos genéricos y ninguna foto: no se renderiza ninguna imagen | P2 |
| Marca consistente | ⚠ | título y datos dicen «Canela Elaborados»; logo (`alt="Canela"`), textos y mensajes de WhatsApp dicen «Canela» | P2 |
| Enlaces internos | ⚠ | la portada enlaza a las 3 páginas; las páginas legales solo vuelven al inicio (sin enlace al menú ni a tortas) | P3 |
| Anclajes de la portada (`#menu`, `#preguntas`…) | ✔ | funcionan y no afectan al sitemap | — |

## 4. SEO de Contenidos

Búsquedas objetivo y su cobertura actual:

| Intención de búsqueda | Dónde se responde hoy | Estado |
|---|---|---|
| «pastelería artesanal La Plata» | portada (`h1`, título) | ⚠ texto breve; falta desarrollo (qué hacen, ocasiones, cómo trabajan) |
| «tortas personalizadas La Plata» | `/tortas-personalizadas/` (vacía, `noindex`) | ✘ sin contenido ni fotos |
| «box de desayuno La Plata», «box día de la madre» | categoría Desayunos del menú | ⚠ ficha mínima; sin descripciones reales |
| «cómo pedir / cuánto tarda / se entrega» | preguntas frecuentes y términos | ✔ |
| «tortas sin gluten / alérgenos / conservación» | — | ✘ sin datos verificados |
| Ocasiones (cumpleaños, Día de la Madre, Pascuas, Navidad) | — | ✘ |

| Ítem | Estado | Prio |
|---|---|---|
| Descripciones reales de productos (12 «Lorem ipsum» en `data/menu.json`) | ✘ — lo harás al pasar a producción | **P1** |
| Contenido y fotos de tortas personalizadas (luego `indexar: true`) | ✘ — pendiente | **P1** |
| Texto propio de la portada más desarrollado (200–300 palabras útiles, sin relleno) | ⚠ | P2 |
| Alérgenos y conservación en las preguntas frecuentes | ✘ | P2 |
| Textos por categoría (`note`) | ⚠ solo Desayunos | P2 |
| Contenido de temporada / novedades (puede ser solo Instagram al principio) | ✘ | P3 |
| Historia «Nosotros» | ✔ | — |
| `data/destacados.json` con texto de ejemplo | ⚠ hoy no se publica (bloque desactivado): dejarlo en `[]` o con contenido real antes de mergear a `main` | P1 |

## 5. SEO Off-Page

Todo depende de ti; el sitio ya está preparado (JSON-LD con `sameAs`, datos de contacto coherentes).

| Ítem | Estado | Prio |
|---|---|---|
| Ficha de Google Business Profile (negocio de zona de servicio, sin mostrar domicilio si no atienden al público) | ✘ | **P1** |
| Reseñas en Google (mensaje de pedido al entregar) | ✘ | **P1** |
| Enlace al sitio en la bio de Instagram y WhatsApp Business (catálogo/enlace) | ✘ | P1 |
| Directorios y redes: Facebook, Pinterest, guías locales de La Plata | ✘ | P2 |
| Menciones: proveedores, ferias de emprendedores, notas locales | ✘ | P3 |

**Datos para usar iguales en todas las fichas (NAP):** nombre «Canela Elaborados» · WhatsApp +54 9 221 399-0505 · Instagram @canelaelaborados · zona centro, La Plata, Buenos Aires · sitio `https://canelaelaborados.com.ar`.

## 6. Legal y confianza

| Ítem | Estado | Prio |
|---|---|---|
| Política de privacidad y términos publicados y enlazados desde el pie | ✔ (borrador) | — |
| Revisión por un profesional antes de producción | ⚠ pendiente | P1 |
| Aviso de terceros (Adobe Fonts, GitHub Pages, WhatsApp/Meta) | ✔ dentro de la política | — |
| Banner de cookies | ✔ no hace falta mientras no haya analítica ni píxeles (el sitio solo guarda tu nombre en el navegador si lo escribís en la consulta, y la política lo dice) | — |
| Horarios y forma de contacto | ⚠ solo WhatsApp e Instagram | P2 |
| Alérgenos / información de alimentos | ✘ verificar requisitos locales | P2 |

## 7. Qué queda para el lanzamiento (orden sugerido)

1. Cargar descripciones reales (reemplaza los 12 «Lorem ipsum» y limpia los `alt`).
2. Dejar `data/destacados.json` en `[]` o con contenido real.
3. Revisar textos legales con un profesional.
4. Pasar `enConstruccion` a `false` en `data/sitio.json` de `main` (o desde la app) y publicar.
5. Search Console: verificar el dominio, enviar `sitemap.xml`, probar el JSON-LD en el Rich Results Test.
6. Crear la ficha de Google Business Profile y pedir las primeras reseñas.
7. Cargar fotos y texto de tortas personalizadas y pasar `indexar: true`.
8. Ampliar el texto de la portada y las preguntas frecuentes (alérgenos, conservación).
9. Corregir `imgAlt` desde AppGestion (`"{producto} – Canela Elaborados"`).

## 8. Seguimiento a 30–90 días

- Search Console: páginas indexadas (esperado: 3 URLs, más tortas cuando se active), consultas, clics e impresiones.
- Google Business Profile: vistas, clics a WhatsApp, cantidad de reseñas.
- Búsquedas de control: «pastelería artesanal La Plata», «tortas personalizadas La Plata», «box desayuno La Plata».
- Repetir `npm run auditar` tras cada cambio importante (mínimos: SEO ≥ 95, Rendimiento ≥ 90).
