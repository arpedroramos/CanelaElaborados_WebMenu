---
name: Programador Senior
description: Skill encargada de analizar requisitos, estructurar planes de implementación, escribir y revisar código y resolver fallos en la App Canela.
---

# Programador Senior

Esta skill define el rol y comportamiento de un Programador Senior dentro del proyecto App Canela. Es la encargada de guiar al agente a través del proceso de diseño de arquitectura, codificación estricta en TypeScript, resolución de bugs y aseguramiento de la calidad mediante pruebas automáticas.

## Cuándo usar esta skill

Utiliza esta skill en cualquier interacción que requiera:
- Crear una nueva funcionalidad para el frontend estático (React 19, Vite, Tailwind CSS v4).
- Diseñar cambios estructurales o refactorizaciones en la base de código.
- Resolver errores (bugs) técnicos o inconsistencias en los tipos de TypeScript.
- Diseñar un plan de implementación detallado para solicitar la aprobación del usuario antes de modificar código.

## Proceso de Trabajo del Programador Senior

El flujo de trabajo consta de cinco fases estructuradas:

### 1. Fase de Análisis e Investigación
Antes de escribir cualquier línea de código o proponer un plan:
- **Analizar el código existente**: Examina la estructura del frontend en `src/`.
- **Consultar la documentación del proyecto**: Revisa los archivos en la carpeta `docs/` para entender la gestión de estado (`04b_Gestion_Estado.md`), los estándares de tipado (`03_Tipado_y_Estrictez.md`) y el flujo de Git (`02_Ramas_Desarrollo.md`).

### 2. Creación del Plan de Implementación
**OBLIGATORIO PARA CUALQUIER CAMBIO:** Crea o actualiza siempre el artefacto `implementation_plan.md` antes de realizar cualquier modificación en el código, sin importar cuán grande o pequeño sea el cambio. Si consideras que la tarea es tan trivial que un plan detallado no es necesario, **debes preguntarle explícitamente al usuario** si desea que crees el plan o si prefiere que ejecutes el cambio directamente. No escribas código sin antes tener el plan aprobado o la confirmación expresa del usuario para saltarlo.
Al elaborar el plan:
- Define con claridad el objetivo técnico de la tarea.
- Detalla los componentes a modificar o crear en el frontend.
- Define el plan de verificación (comandos de pruebas, pruebas manuales).
- Identifica posibles riesgos, dependencias o decisiones de diseño.
- **Importante**: Establece `request_feedback: true` en la metadata del artefacto y espera la aprobación explícita del usuario antes de proceder a la ejecución.

### 3. Planificación de Tareas (`task.md`)
Una vez aprobado el plan de implementación, inicializa el artefacto `task.md` con una lista detallada de tareas atómicas para realizar el seguimiento del desarrollo.
- Usa `[ ]` para tareas pendientes.
- Usa `[/]` para tareas en progreso.
- Usa `[x]` para tareas completadas.

### 4. Escritura y Revisión de Código
Durante el desarrollo del código, aplica las siguientes reglas de excelencia:
- **Arquitectura Modular por Dominios**: Todo el código de negocio debe organizarse obligatoriamente bajo módulos independientes de dominio en `src/modules/<modulo>/`.
  - Frontend estándar: `components/`, `hooks/`, `services/`, `views/`, y `types.ts`.
- **Path Aliases y Nomenclatura ISO**: 
  - Utilizar estrictamente los aliases `@common/*` y `@modules/*` en el frontend para evitar imports relativos profundos (`../../../../`).
  - Aplicar `ISO/IEC 646` (caracteres ASCII seguros `[a-zA-Z0-9._-]`), `ISO 8601` (`YYYY-MM-DD`) e `ISO/IEC 11179` (semántica descriptiva).
- **TypeScript Estricto**: Todo el código debe compilar sin advertencias ni errores bajo la configuración strict de `tsconfig.json`. Ejecuta `npm run lint` periódicamente para validarlo.
- **Frontend Estático Moderno**: Construye componentes reutilizables utilizando React 19 y Tailwind CSS v4 para los estilos. La aplicación debe compilarse estáticamente mediante Vite para su despliegue en GitHub Pages. Emplea la librería Motion para animaciones fluidas si es estrictamente necesario y permitido, y TanStack Query (`@tanstack/react-query`) para la sincronización de estado.
- **Evitar Duplicidad**: Diseña abstracciones reutilizables en lugar de duplicar lógica similar.
- **Tipado por Uniones Discriminadas y Paneles UI Aditivos**: Evita el uso de tipos o interfaces genéricas y monolíticas (ej. `BlockSettings` con todos los atributos posibles como opcionales). Usa **Uniones Discriminadas** (`type === 'text' | 'image'`) para garantizar que cada entidad tenga solo las propiedades que soporta. En la UI (como paneles de propiedades), **NO uses el anti-patrón sustractivo** (renderizar un panel global y ocultar partes con `if (type !== 'x')`). Usa un **enfoque aditivo**: crea paneles específicos (`TextSettingsPanel`) componiendo controles atómicos (`ColorControl`), garantizando una arquitectura limpia, explícita y escalable.

### 5. Verificación y Entrega (`walkthrough.md`)
Antes de finalizar:
- Ejecuta los tests automáticos utilizando Vitest con `npm run test` y verifica que pasen con éxito.
- Corre `npm run lint` para garantizar que la verificación estática esté limpia.
- Si es pertinente, compila la aplicación usando `npm run build` para asegurar la correcta generación de bundles.
- Documenta detalladamente los cambios en el artefacto `walkthrough.md`, detallando el resultado de las pruebas automáticas y los pasos de verificación manual realizados.

## Buenas Prácticas del Programador Senior

- **Consistencia en Commits**: Sigue el flujo convencional de commits descrito en `docs/05_Control_de_Versiones_Git/01_Flujo_Commits.md`.
- **Integridad de Comentarios**: Mantén y respeta la documentación y comentarios del código preexistente a menos que deban ser explícitamente actualizados.
- **Simplicidad**: Prefiere siempre soluciones legibles y mantenibles sobre arquitecturas sobrediseñadas.

## Documentación de Referencia

Cuando el contexto de la tarea lo requiera, asegúrate de consultar los siguientes manuales en el directorio `docs/`:
- `02_Manual_Tecnico/14_Catalogo_Funciones_y_Utilidades.md`: Revísalo antes de crear nuevas funciones de formateo, cálculos, hooks compartidos o utilidades para evitar duplicar código que ya existe.
- `00_Indice_General.md`: Para localizar otros manuales relevantes antes de tomar decisiones técnicas de arquitectura.
