# Menú desde la app

El menú (categorías, productos, precios y fotos) se carga en la app de gestión (**AppGestion**) y se publica con un botón. Este sitio no tiene Excel ni scripts de carga: solo lee lo que la app deja en el repo.

## Contrato de datos

Es lo único que une a la app con el sitio:

| Archivo | Quién lo escribe | Quién lo lee |
| :--- | :--- | :--- |
| `data/menu.json` | la app | el sitio (`src/data/menu.ts`) |
| `public/img/menu/*.webp` | la app | el sitio |

No se editan a mano: la próxima publicación de la app los sobrescribe.

### Formato de `data/menu.json`

Una lista de categorías (`MenuCategory[]`, ver `src/data/menu_types.ts`):

| Campo | Uso |
| :--- | :--- |
| `id`, `label`, `title`, `note` | Identificador, texto de la pestaña, título y nota de la categoría. |
| `items[]` | Productos de la categoría. |
| `items[].title`, `description`, `price` | Título, texto y precio ya formateado (ej. `$12.000`). |
| `items[].imgSrc`, `imgAlt`, `imgWidth`, `imgHeight` | Foto, texto alternativo (sin él se usa el título) y medidas en píxeles (sin ellas el sitio reserva 800 × 600). |
| `items[].options[]` | Presentaciones: un chip por opción (`label`). |

El campo `order` (cómo se escribe el producto en WhatsApp) **no lo manda la app**: el sitio lo completa solo.

## Mensaje de pedido por WhatsApp

Lo arma el sitio con una plantilla única en `src/data/pedido.ts`: `Hola Canela! Quiero pedir: {producto}` (con la presentación entre paréntesis si hay chips). Para cambiar el texto, se edita ahí y se despliega.

## Validación

`npm run validar` revisa `data/menu.json` (formato, medidas, textos) y que cada foto exista en `public/img/menu/`. Corre automáticamente al inicio de `npm run build`: **si el menú está roto, el build falla y el sitio publicado no cambia**. Un menú vacío (`[]`) es válido y oculta la sección Menú.

## Flujo de trabajo

1. En la app: cargar los productos (pestaña «Menú web» de cada receta) y revisar las categorías en Ajustes › Web Menu.
2. Ajustes › Web Menu › Publicar: ver la vista previa y tocar **Publicar menú**. La app hace **un solo commit** en la rama configurada con los archivos que cambiaron.
3. Si la rama es `main`, GitHub Actions despliega el sitio (ver [Despliegue](./01_Pagina_En_Construccion_y_Despliegue_DNS.md)).
4. Para probar sin publicar el sitio: apuntar la app a la rama `menu-test`, que no despliega.

## Ver el sitio con el menú en local

`npm run dev` usa el `data/menu.json` y las fotos que haya en tu copia del repo. Si la app publicó en GitHub, hacé `git pull` de esa rama antes.
