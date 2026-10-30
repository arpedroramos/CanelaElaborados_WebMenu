---
name: skill-creator
description: Meta-skill para crear o refactorizar skills de agentes en .agents/skills/ siguiendo el estándar Agent Skills (agentskills.io) y las convenciones de Canela Elaborados. Usar cuando el usuario pida crear una skill nueva, estandarizar un flujo recurrente o actualizar skills existentes.
license: MIT
metadata:
  author: app-canela
  version: "4.0.0"
---

# Skill Creator (Canela Elaborados)

Guía para crear y mantener skills en `.agents/skills/` conforme al estándar [Agent Skills](https://agentskills.io/) y a las convenciones del proyecto.

## Cuándo aplicar esta habilidad

- Crear una skill nueva o empaquetar un flujo recurrente.
- Refactorizar o actualizar skills existentes.

## Estructura

```text
.agents/skills/<skill-name>/
├── SKILL.md      # Obligatorio
├── templates/    # Opcional
├── rules/        # Opcional: una regla por archivo en skills grandes
└── scripts/      # Opcional
```

## Reglas Obligatorias

1. **Nombre de carpeta**: kebab-case `[a-z0-9-]` (ej. `api-client`).
2. **Frontmatter**:
   ```yaml
   ---
   name: <skill-name>          # idéntico al nombre de la carpeta, kebab-case
   description: <qué hace>. Usar cuando <detonantes concretos>.
   license: MIT
   metadata:
     author: app-canela
     version: "1.0.0"
   ---
   ```
   La `description` es lo que el agente usa para decidir si activa la skill: debe incluir los detonantes ("Usar cuando...").
3. **Sin duplicar reglas globales**: citar las reglas de `.agents/AGENTS.md` por número (ej. "Regla 1") en lugar de copiarlas.
4. **Sin solapamiento**: antes de crear una skill, revisar las existentes; si el alcance ya está cubierto, ampliar la existente.
5. **Versiones vigentes**: los ejemplos de código deben usar las APIs de las versiones instaladas (Regla 0). No citar números de versión que no estén en la tabla de la Regla 0.
6. **Rutas**: relativas a la raíz del repo, nunca `file:///` absolutas.
7. **Agnóstica de herramienta**: no depender de herramientas propias de un agente concreto; describir la acción ("buscar en la web", "pedir aprobación al usuario").
8. **Skills de terceros**: no editarlas a mano; se actualizan desde su origen.

## Secciones Estándar del SKILL.md

1. Título y resumen de 2-3 frases.
2. Cuándo aplicar.
3. Reglas con ejemplos `❌` / `✅`.
4. Flujo de ejecución.
5. Referencias (`docs/`, `.agents/AGENTS.md`, otras skills).

Plantilla: `.agents/skills/skill-creator/templates/SKILL_TEMPLATE.md`.

## Pasos

1. Definir alcance y verificar que no se solape con otra skill.
2. Crear la carpeta en kebab-case y copiar la plantilla.
3. Redactar triggers y reglas con ejemplos del stack actual.
4. Agregar la skill a la lista de `Estructura de .agents/` en este archivo y verificar que su `name` coincida con la carpeta.

## Estructura de .agents/

| Skill | Uso |
|---|---|
| `senior-programmer` | Desarrollo, refactor y bugs. |
| `ui-ux-designer` | Identidad de marca y responsive. |
| `code-auditor` | Revisión de código, dependencias y chequeo previo a publicar. |
| `git-manager` | Commits y despliegue por GitHub Actions (`main`). |
| `documenter` | Documentación en `docs/`. |
| `error-documenter` | Registro de errores resueltos. |
| `writing-guidelines` | Estilo de redacción. |
| `skill-creator` | Creación y mantenimiento de skills. |
