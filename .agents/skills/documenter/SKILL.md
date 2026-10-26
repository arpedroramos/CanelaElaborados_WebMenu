---
name: documenter
description: Auditoría de cobertura y redacción de la documentación técnica y de usuario en docs/ de Canela Elaborados, manteniendo sincronizado docs/00_Indice_General.md. Usar cuando el usuario pida documentar una funcionalidad, actualizar manuales, auditar la cobertura documental o sincronizar el índice tras cambios de código.
license: MIT
metadata:
  author: app-canela
  version: "4.0.0"
---

# Documenter (Canela Elaborados)

Procedimiento para auditar, redactar y mantener sincronizada la documentación de Canela Elaborados con el código real.

## Cuándo aplicar esta habilidad

- Auditar la cobertura de la documentación contra el código fuente.
- Crear o actualizar documentos en `docs/` (marca, diseño, despliegue, datos del menú).
- Sincronizar `docs/00_Indice_General.md` tras agregar o mover documentos.
- Actualizar `docs/Changelog.md`.

## Reglas Estrictas

1. **Solo lectura sobre el código**: no modificar `src/`.
2. **Escritura exclusiva en `docs/`**: únicamente archivos Markdown (y sus adjuntos) dentro de `docs/`.
3. **Informes**: las auditorías de cobertura siguen la Regla 2 de `.agents/AGENTS.md`.
4. **Estilo**: seguir el skill `writing-guidelines`.
5. **Versiones**: al documentar librerías, citar la versión instalada según la Regla 0.
6. **Nomenclatura**: carpetas y archivos según la Regla 5 (ISO/IEC 646, sin espacios ni tildes).

## Estructura de `docs/`

| Carpeta | Contenido |
|---|---|
| `00_Indice_General.md` | Índice maestro. Se actualiza en cada cambio. |
| `05_Control_de_Versiones_Git/` | Ramas, despliegue a GitHub Pages, DNS. |
| `06_Interfaz_Grafica/` | Marca, sistema de diseño, componentes, responsive (cinco capítulos (00 a 04) y `README.md`). |
| `Informes/` | Informes y auditorías fechados (Regla 2). |
| `Registro_Errores.md`, `Changelog.md` | Registros continuos. |

## Flujo de Trabajo

1. **Brechas**: compara `src/` (módulos, componentes, `src/data/`) y `src/index.css` (tokens) con lo documentado en `docs/`.
2. **Redacción**: tablas descriptivas, bloques de código con lenguaje, estilo de `writing-guidelines`.
3. **Trazabilidad**: todo componente transversal, token o proceso de despliegue nuevo debe aparecer en `docs/`.
4. **Sincronización del índice (crítico)**: actualizar `docs/00_Indice_General.md`.

## Referencias

- `docs/00_Indice_General.md`: índice maestro.
- Skill `writing-guidelines`.
