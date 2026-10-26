---
name: error-documenter
description: Registro continuo de errores resueltos (bugs, fallos de UI, errores de compilación o linter) en docs/Registro_Errores.md. Usar obligatoriamente después de solucionar un fallo reportado por el usuario ("pantalla en blanco", "crasheó", "no funciona") o por el compilador/linter.
license: MIT
metadata:
  author: app-canela
  version: "4.0.0"
---

# Documentador de Errores (Canela Elaborados)

Construye memoria a largo plazo registrando causa raíz, solución y prevención de cada fallo resuelto, para que futuros agentes no repitan los mismos errores. Implementa la Regla 4 de `.agents/AGENTS.md`.

## Cuándo aplicar esta habilidad

Inmediatamente después de que:
- El usuario reporte un fallo y este haya sido solucionado.
- Se resuelvan errores de compilación, TypeScript o linter.
- Se corrija una regresión de frontend, de datos del menú o de despliegue.

## Archivo Maestro

`docs/Registro_Errores.md`

> Excepción a la Regla 2: es un documento único y continuo. **No** crear una subcarpeta por error.

## Formato Requerido (fuente única)

```markdown
### [YYYY-MM-DD] - [Título descriptivo del error]
- **Síntoma:** [Qué vio el usuario o qué mensaje arrojó la consola/compilador]
- **Causa Raíz:** [Origen técnico del fallo]
- **Solución Aplicada:** [Archivos modificados y lógica del cambio]
- **Prevención:** [Regla o lección para evitar su recurrencia]
```

## Instrucciones

1. Lee el archivo maestro (créalo si no existe).
2. Agrega la entrada respetando el orden cronológico ya usado en el archivo.
3. Sé conciso y preciso. Si el error se debió a una API deprecada o a una versión de librería, indica la versión instalada (Regla 0).
