---
name: code-auditor
description: Auditoría estática y code review de Canela Elaborados (calidad, TypeScript, composición de componentes, accesibilidad, rendimiento, dependencias y límites de GitHub Pages). Usar cuando el usuario pida revisar código, un diff o un PR, auditar el cumplimiento de las reglas globales, revisar dependencias o antes de publicar en producción.
license: MIT
metadata:
  author: app-canela
  version: "4.0.0"
---

# Auditor de Código (Canela Elaborados)

Define **qué revisar**; las reglas viven en `.agents/AGENTS.md`.

## Cuándo aplicar esta habilidad

- Revisar código propuesto, un diff o un Pull Request.
- Auditar el cumplimiento de las reglas globales.
- Revisar dependencias antes de un upgrade o de publicar.
- Chequeo previo a un merge o push a `main` (que despliega por GitHub Actions).

## Reglas Estrictas

- Solo lectura: no modifiques código durante la auditoría. Propón las correcciones y aplícalas con aprobación del usuario.
- Si el usuario pide un informe formal, créalo según la Regla 2.

## Checklist

### 1. Versiones y APIs vigentes (Regla 0)
- APIs deprecadas o de una versión mayor anterior a la instalada.
- Dependencias sin uso o listadas en `dependencies` cuando son de desarrollo. Compruébalo buscando sus imports en `src/` y con `npm ls`.
- Estado de actualizaciones con `npm outdated`; las versiones mayores se proponen, no se aplican.
- Para auditar una librería, contrasta su uso con la documentación oficial de la versión instalada (Regla 3).

### 2. UI y diseño (Regla 1)
- Colores y tipografías fuera de `@theme`, hex sueltos, segunda librería de componentes o de iconos.
- Fuentes distintas de la hoja Typekit oficial (Regla 1), incluidas Google Fonts, paquetes npm de fuentes y fuentes de iconos como Material Symbols.
- Títulos (`h1`–`h4`) sin `font-title` (optima-nova-lt-pro) o con peso distinto de 400/700, únicos que trae el kit.
- Cumplimiento de `ui-ux-designer`: tokens, radios, objetivos táctiles de 44px, contraste AA.
- Composición: props booleanas en cascada, componentes definidos dentro de otros componentes, `forwardRef`.

### 3. Arquitectura y datos (Reglas 5 y 6)
- Archivos fuera de su módulo, más de 3 archivos sueltos en `components/`, imports relativos profundos, nombres fuera de ISO/IEC 646.
- Datos del menú hardcodeados en componentes en lugar de `src/data/`; tipos inconsistentes entre categorías.
- Alias o carpetas declarados en configuración que no existen (ej. `@common` sin `src/common`).

### 4. Calidad idiomática
- TypeScript estricto: `npm run build` sin errores; rechaza `any` injustificado.
- Efectos innecesarios (`useEffect` para estado derivado), `key` con índice, listas sin `key` estable.
- SOLID/DRY: responsabilidad única y reutilización de lo existente.

### 5. Accesibilidad y SEO
- Imágenes con `alt` útil; controles con nombre accesible; foco visible; orden de encabezados lógico.
- `<title>`, meta descripción, `lang="es"` y Open Graph en `index.html`.
- Enlaces `wa.me`/`mailto:` válidos.

### 6. Rendimiento y límites de GitHub Pages (Regla 9)
- Peso de `dist/` tras `npm run build`; imágenes >200 KB, formatos sin optimizar, falta de `loading="lazy"`.
- Tamaño del bundle JS; imports de librerías completas; carga diferida de lo que no está en el primer viewport.
- Sin secretos, tokens ni URLs privadas en el código ni en `dist/` (busca `key`, `token`, `secret`, `.env`).
- `CNAME` presente en `public/` y rutas coherentes con `base`.
- Scrolls anidados o evitables (Regla 8).

### 7. Verificación automática
```bash
npm run lint && npm run build
```

## Formato del Resultado

Lista de hallazgos por severidad (Crítico / Alto / Medio / Bajo), cada uno con archivo y línea, regla incumplida y corrección propuesta.

## Referencias

- `.agents/AGENTS.md`: reglas globales.
- Skills `ui-ux-designer`, `senior-programmer`.
