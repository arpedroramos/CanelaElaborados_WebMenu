---
name: git-manager
description: Flujo interactivo de commits y despliegue de Canela Elaborados que analiza el 100% de los cambios (git status y git diff), redacta mensajes Conventional Commits con aprobación explícita del usuario y despliega por GitHub Actions al llegar a main. Usar cuando el usuario pida hacer un commit, guardar el progreso, cerrar un hito o publicar el sitio.
license: MIT
metadata:
  author: app-canela
  version: "4.0.0"
---

# Gestor de Git (Canela Elaborados)

Flujo controlado para registrar commits y publicar el sitio, garantizando que todos los archivos modificados queden descritos.

## Cuándo aplicar esta habilidad

- El usuario pide un commit, guardar el progreso o cerrar un hito.
- El usuario pide publicar o actualizar el sitio en producción.

> Nunca hagas commit, push ni despliegue sin aprobación explícita del usuario.

## Ramas

- `desarrollo`: rama de trabajo y código fuente.
- `main`: producción. Un push que cambie el sitio dispara GitHub Actions, que compila, valida y despliega a GitHub Pages.
- `menu-test`: pruebas de publicación desde la app; no despliega.
- Detalle y DNS en `docs/05_Control_de_Versiones_Git/01_Pagina_En_Construccion_y_Despliegue_DNS.md`.

## Flujo de Commit

### 1. Inspección exhaustiva
- `git status` para detectar archivos modificados, nuevos, eliminados y renombrados.
- `git diff` y `git diff --staged` ante cualquier duda.
- **Ningún archivo de `git status` puede quedar fuera de la descripción.**
- Verifica que no se incluyan secretos (`.env`), `node_modules/`, `dist/` ni archivos temporales (Regla 9: todo lo que se sube a Pages es público).

### 2. Mensaje (Conventional Commits)
- **Header**: `<tipo>(<alcance>): <resumen>`, máximo 72 caracteres. Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `build`, `chore`.
- Línea en blanco, luego viñetas archivo por archivo:
  ```text
  feat(menu): agregar categoría de alfajores

  - src/data/archivo/alfajores.ts: catálogo de alfajores.
  - src/modules/home/components/sections/MenuSection.tsx: nueva categoría en el menú.
  ```
- Si cambian dependencias, actualiza la tabla de la Regla 0 en `.agents/AGENTS.md` en el mismo commit.

### 3. Confirmación
Muestra los archivos y el mensaje propuesto y espera confirmación explícita.

### 4. Ejecución
Tras la confirmación: `git add` de los archivos listados y `git commit`. Haz push solo si el usuario lo pide.

## Flujo de Despliegue (GitHub Actions)

1. Verifica que el árbol esté limpio y ejecuta `npm run build` sin errores (revisión previa con el skill `code-auditor`).
2. Revisa `.env`: `VITE_EN_CONSTRUCCION` decide si el sitio real muestra el menú o "en construcción"; un merge a `main` no debe cambiarlo sin querer.
3. Presenta al usuario el merge o push a `main` antes de hacerlo: dispara el despliegue de inmediato. No hay que publicar `dist/` a mano.
4. Sigue el workflow **Deploy** en la pestaña Actions (`build` y `deploy` en verde; si `build` falla, el sitio no cambia).
5. Confirma el resultado en `https://canelaelaborados.com.ar` (tarda 1–2 minutos). Para volver atrás: revertir el commit en `main`.

## Referencias

- `docs/05_Control_de_Versiones_Git/01_Pagina_En_Construccion_y_Despliegue_DNS.md`.
- `.agents/AGENTS.md`: Reglas 0 y 9.
