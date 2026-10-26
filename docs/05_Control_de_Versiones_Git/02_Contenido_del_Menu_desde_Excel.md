# Contenido del menú desde Excel

El menú (categorías, productos, precios y fotos) se edita en una carpeta local **fuera de git** y se publica con un solo comando. No hace falta tocar código.

## Carpeta `contenido/` (ignorada por git)

```
contenido/
  menu.xlsx        hojas: Categorias y Productos
  fotos/*.webp     las fotos originales
```

> [!WARNING]
> `contenido/` no está en git, así que **no tiene respaldo automático**. Copiala periódicamente a la nube o a un pendrive.

Primera vez: `npm run contenido:plantilla` crea `menu.xlsx` con el menú actual (usa `--forzar` para reemplazarlo; se pierden los cambios).

## Hoja `Categorias` (las pestañas del menú)

| Columna | Uso |
| :--- | :--- |
| `categoria` | Identificador corto sin espacios (ej. `tartas`). Lo usa la hoja Productos. |
| `etiqueta` | Texto de la pestaña. |
| `titulo` | Título grande de la categoría (si está vacío, usa la etiqueta). |
| `nota` | Texto bajo el título. |
| `precio_nota` | Opcional. Se muestra junto a la nota (ej. `$12.000`). |
| `boton_texto` / `boton_pedido` | Opcional. Botón de pedido general al final de la categoría. |
| `orden` | Orden de las pestañas. |
| `visible` | `SI` o `NO`. Con `NO` la categoría y sus productos no se publican. |

## Hoja `Productos`

| Columna | Uso |
| :--- | :--- |
| `categoria` | Debe existir en la hoja Categorias. |
| `nombre` | Título de la tarjeta. No se puede repetir dentro de la categoría. |
| `descripcion` | Texto de la tarjeta. |
| `precio` | Opcional (ej. `$9.000`). |
| `imagen` | Opcional. Nombre del archivo en `contenido/fotos/` (con o sin `.webp`). |
| `pedido` | Opcional. Cómo se escribe el producto en el mensaje de WhatsApp. Sin esto (ni opciones) no hay botón. |
| `boton` | Opcional. Texto del enlace de pedido (por defecto "Pedir"). |
| `opciones` | Opcional. Variantes, una por chip: `Etiqueta\|pedido; Etiqueta\|pedido`. |
| `orden` | Orden dentro de la categoría. |
| `visible` | `SI` o `NO`. |

Ejemplo de `opciones`: `Membrillo|la Pastafrola de Membrillo; Batata|la Pastafrola de Batata`.

## Flujo de trabajo

1. Editá `contenido/menu.xlsx` y copiá las fotos `.webp` a `contenido/fotos/`.
2. `npm run contenido` (opcional): genera los datos y valida. Si hay errores (foto inexistente, categoría desconocida, nombre repetido) lo dice con la fila y **no genera nada**.
3. `npm run dev` para ver el resultado local.
4. `npm run publicar`: genera, compila, comprueba que `dist/` tenga `CNAME`, pide confirmación y publica `dist/` en la rama `gh-pages`.

Las fotos se reducen a 800 px de ancho y se recomprimen a webp (calidad 80) en `public/img/menu/`; los originales no se tocan. Esa carpeta y `src/data/menu.generated.json` son salidas generadas y están ignoradas por git.

## Respaldo si no hay Excel

`src/data/menu.seed.json` (versionado) es el menú de respaldo. Si `menu.generated.json` no existe (por ejemplo, un clon nuevo del repo), la web usa el seed.
