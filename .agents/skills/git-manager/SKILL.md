---
name: Gestor de Git
description: Un skill interactivo para guiar y confirmar las operaciones de preparación (git add .) y creación de commits en el repositorio de manera controlada y segura, interactuando con el usuario para definir el mensaje del commit.
---

# Gestor de Git

Este skill proporciona un flujo interactivo y controlado para preparar cambios y realizar commits en Git. El objetivo es evitar que se ejecuten comandos automáticamente sin la confirmación y participación activa del usuario.

## Cuándo usar este skill
Utiliza este skill siempre que se requiera guardar el progreso, registrar cambios en el repositorio o cuando el usuario solicite un commit.

## Instrucciones y Flujo de Trabajo

El agente debe seguir estrictamente los siguientes pasos ordenados de manera secuencial:

1. **Analizar el Estado y los Cambios**:
   - Ejecuta `git status` y, de ser necesario, `git diff` (o `git diff --cached`) para analizar profundamente y estrictamente todos los archivos modificados, nuevos o eliminados.
   - Comprende con precisión qué cambios se han realizado en el código.

2. **Construir Automáticamente el Mensaje de Commit**:
   - Basado en el análisis estricto de los cambios, construye automáticamente un mensaje de commit apropiado, descriptivo y conciso.
   - Asegúrate de seguir las convenciones de commits, consultando los manuales si es necesario.

3. **Confirmación de Comandos y Mensaje**:
   - Presenta al usuario un resumen de los archivos que han cambiado.
   - Muestra los comandos exactos que planeas ejecutar, incluyendo el mensaje de commit generado automáticamente:
     ```bash
     git add .
     git commit -m "[Prefijo]: [Mensaje generado automáticamente]"
     ```
   - Solicita la aprobación explícita del usuario antes de proceder a proponer o ejecutar los comandos. Permite al usuario modificar el mensaje si lo desea.

4. **Ejecución**:
   - Tras recibir el visto bueno, ejecuta los comandos confirmados.

## Documentación de Referencia

Cuando el contexto de la tarea lo requiera, asegúrate de consultar los siguientes manuales en el directorio `docs/`:
- `05_Control_de_Versiones_Git/01_Flujo_Commits.md`: Para guiar al usuario en la escritura del mensaje de commit (convenciones, prefijos como feat/fix).
- `00_Indice_General.md`: Para buscar otros manuales relevantes antes de integrar operaciones complejas de Git.
