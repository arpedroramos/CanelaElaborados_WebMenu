# Capítulo 3: Componentes y datos del menú

## 1. Botones (`src/components/ui/button.tsx`)

`Button` (shadcn sobre `@base-ui/react`) con variantes de marca. Para enlaces `<a>` usa `buttonClass({ variant, size })`.

| Variante | Aspecto |
|---|---|
| `azul` | Fondo azul, texto crema, hover carbón |
| `linea` | Borde azul de 2 px, hover crema |
| `crema` | Fondo crema, texto azul (sobre el pie azul) |
| `chip` | Borde lila, texto lila profundo, hover lavanda |

Tamaños: `pill` (48 px), `pill-sm` (44 px) y `chip` (44 px). Foco con anillo lavanda de 3 px.

## 2. Componentes de la página (`src/modules/home/components/`)

| Carpeta | Componentes |
|---|---|
| `layout/` | `TopBar`, `SectionTabs` (pestañas fijas), `ContactFooter` |
| `sections/` | `Hero`, `MenuSection`, `WorksSection`, `AboutSection`, `SectionHeading` |
| `menu/` | `MenuTabs` (Tartas/Budines, accesible por teclado), `MenuCard` |

`HomeView` los ensambla en el orden Inicio, Menú, Trabajos, Nosotros, Contacto.

## 3. Datos (`src/data/`)

| Archivo | Contenido |
|---|---|
| `tartas.ts`, `budines.ts` | Categorías del menú (`MenuCategory`). |
| `menu_types.ts` | Tipos `MenuCategory`, `MenuItem`, `MenuOption`. |
| `trabajos.ts` | Fotos de la galería. |
| `contacto.ts` | WhatsApp, Instagram, web, plazo de pedido. |
| `archivo/` | Categorías anteriores, fuera de uso. |

```typescript
{
  title: 'Lemon pie',
  description: 'Masa sablée, curd de limón…',
  order: 'el Lemon Pie',           // arma el mensaje de WhatsApp
  cta: 'Pedir esta tarta',
  imgSrc: '/fotos/lemon_pie.webp', // opcional
  options: [{ label: 'Membrillo', order: 'la Pastafrola de Membrillo' }], // opcional: un chip por variante
}
```

- **Precio**: se muestra si la categoría define `priceNote` (ej. `'$12.000'`).
- **Foto**: sin `imgSrc` se ve el espacio lavanda 4:3.
- **Pedidos**: `buildOrderUrl(order)` en `src/lib/whatsapp.ts` genera `https://wa.me/<número>?text=Hola Canela! Quiero <order>`. El número vive solo en `contacto.ts`.
