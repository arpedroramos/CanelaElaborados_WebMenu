---
name: senior-programmer
description: Flujo de desarrollo de Canela Elaborados (análisis, plan, implementación en TypeScript estricto y verificación) para el sitio estático React 19 + Vite + Tailwind 4. Usar cuando el usuario pida crear una funcionalidad o sección, refactorizar, corregir un bug o diseñar un plan de implementación.
license: MIT
metadata:
  author: app-canela
  version: "4.0.0"
---

# Programador Senior (Canela Elaborados)

Guía el diseño, la codificación, la corrección de bugs y la verificación del sitio. Las reglas globales están en `.agents/AGENTS.md` y no se repiten aquí.

## Cuándo aplicar esta habilidad

- Crear secciones, componentes o vistas.
- Refactorizar o hacer cambios estructurales.
- Resolver bugs o errores de tipos.
- Diseñar un plan de implementación para aprobación del usuario.

## Proceso de Trabajo

### 1. Análisis
- Lee el código del módulo afectado en `src/modules/` y los datos en `src/data/`.
- Verifica las versiones instaladas de las librerías involucradas (Regla 0) y usa solo sus APIs vigentes.
- Revisa `docs/00_Indice_General.md` y `docs/06_Interfaz_Grafica/` para decisiones de diseño.
- Antes de crear un componente o utilidad, busca si ya existe en `src/components/ui/`, `src/modules/*/components/` o `src/lib/`.

### 2. Plan
- **Cambios no triviales** (varios archivos, nuevas dependencias, cambios de estructura de datos): presenta un plan con objetivo, archivos a crear o modificar, riesgos y verificación; espera aprobación antes de editar.
- **Cambios triviales** (un texto, un precio, un fix evidente): ejecútalos directamente y explica lo hecho.

### 3. Implementación
- **Arquitectura y nomenclatura**: Regla 5. **UI**: Regla 1 y skill `ui-ux-designer`. **Datos del menú**: Regla 6. **Límites de hosting**: Regla 9.
- **TypeScript estricto**: sin `any` injustificado; tipos por uniones discriminadas cuando una variante tenga campos propios.
- **Composición de componentes**:
  - Evita acumular props booleanas (`isFeatured`, `isCompact`); crea variantes explícitas (`variant="featured"`) con `class-variance-authority`.
  - Prefiere `children` sobre props `renderX`.
  - Para componentes con partes relacionadas, usa compuestos (`Card`, `Card.Header`) en lugar de una prop por cada parte.
  - En React 19 `ref` es una prop; no uses `forwardRef`.
- **Rendimiento (sitio estático de móvil)**:
  - No definas componentes dentro de otros componentes.
  - Calcula valores derivados durante el render; no los guardes en estado ni en `useEffect`.
  - Importa directamente desde el módulo (`lucide-react` por icono, sin barrel files propios) y carga con `React.lazy` lo que no está en el primer viewport.
  - Usa `key` estables, nunca el índice, en listas del menú.
  - Listas largas: `content-visibility: auto` en las secciones fuera de pantalla.
  - Imágenes optimizadas (Regla 9) con `width`/`height` para evitar saltos de layout.
- **Sin duplicación**: prefiere soluciones simples sobre arquitecturas sobrediseñadas.
- Respeta los comentarios existentes salvo que deban actualizarse.

### 4. Verificación
```bash
npm run lint     # oxlint
npm run build    # tsc -b && vite build
npm run preview  # revisar dist/ como lo servirá GitHub Pages
```
Revisa además la vista en ancho móvil (360px). Reporta al usuario el resultado real de cada comando y los pasos manuales.

### 5. Cierre
- Error resuelto: skill `error-documenter`.
- Comportamiento o diseño documentado que cambió: skill `documenter`.
- Commits: skill `git-manager`.
