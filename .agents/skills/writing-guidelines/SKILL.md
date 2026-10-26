---
name: writing-guidelines
description: Pautas de redacción técnica, voz y estilo para documentación, informes, bitácoras y manuales de Canela Elaborados. Usar al crear o editar archivos en docs/, informes en docs/Informes, el changelog o planes y resúmenes técnicos para el usuario.
license: MIT
metadata:
  author: app-canela
  version: "4.0.0"
---

# Writing Guidelines (Canela Elaborados)

Directrices de redacción para maximizar claridad, concisión y rigor en `docs/`, bitácoras, informes y resúmenes técnicos. La ubicación y nomenclatura de los archivos las definen las Reglas 2, 4 y 5 de `.agents/AGENTS.md`; este skill solo cubre el **estilo**.

## Cuándo aplicar esta skill

- Redactar o revisar informes en `docs/Informes/`.
- Actualizar manuales técnicos o de usuario.
- Escribir entradas en `docs/Changelog.md`.
- Redactar planes de implementación, resúmenes ejecutivos o recorridos técnicos.

---

## 1. Voz, Tono y Concisión

- **Voz activa**:
  - *Evitar:* "El componente de botón es renderizado por la vista."
  - *Correcto:* "La vista renderiza el botón."
- **Instrucciones directas**: segunda persona o imperativo ("Haz clic en **Guardar**", no "El usuario debe proceder a hacer clic").
- **Palabras prohibidas**:
  - Marketing: `fácil`, `simple`, `rápido`, `intuitivo`. Reemplazar por descripciones operativas ("requiere un solo comando").
  - Calificadores vagos: `muy`, `realmente`, `típicamente`, `generalmente`. Dar métricas o afirmaciones concretas.
- **Longitud**: oraciones de menos de 20-25 palabras; párrafos de más de 3-4 oraciones se dividen en listas.

## 2. Estructura y Encabezados

- **Resumen inicial**: todo documento o sección mayor abre con 2-3 oraciones de objetivo, alcance y resultado.
- **Encabezados descriptivos en sentence case**: `## Configuración de variables de entorno`, no `## Variables` ni `## Configuración De Variables`.
- **Listas**: 3 o más elementos → lista. Formato **Término en negrita + dos puntos**:
  ```markdown
  - **Parámetro**: Explicación concisa de su función.
  ```
  Listas numeradas solo para pasos secuenciales.

## 3. Bloques de Código

- **Lenguaje obligatorio** en cada bloque (`typescript`, `bash`, `powershell`, `json`, `sql`, `diff`).
- **Snippets breves**: máximo 25-30 líneas; ancho ≤ 80 columnas.
- **Placeholders semánticos** en `snake_case`: `tu_api_key_aqui`, `usuario_prueba_id`. Evitar `xxx` o `asdf`.
- **Versiones**: al mencionar librerías, usar la versión instalada (tabla de la Regla 0), nunca una de memoria.

## 4. Referencias

- `.agents/AGENTS.md`: Reglas 2 (informes), 4 (registro de errores; formato en el skill `error-documenter`) y 5 (nomenclatura ISO).
