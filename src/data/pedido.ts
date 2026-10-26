import type { MenuCategory } from './menu_types';

/** Plantilla única: `buildOrderUrl` antepone "Hola Canela! Quiero ". */
const producto = (titulo: string, presentacion?: string): string =>
  `pedir: ${presentacion ? `${titulo} (${presentacion})` : titulo}`;

/** Completa `order` donde venga vacío, con la plantilla genérica del sitio. */
export const completarPedidos = (categorias: MenuCategory[]): MenuCategory[] =>
  categorias.map((categoria) => ({
    ...categoria,
    items: categoria.items.map((item) => ({
      ...item,
      order: item.order ?? (item.options ? undefined : producto(item.title)),
      options: item.options?.map((opcion) => ({
        ...opcion,
        order: opcion.order ?? producto(item.title, opcion.label),
      })),
    })),
    footerCta: categoria.footerCta && {
      ...categoria.footerCta,
      order: categoria.footerCta.order ?? producto(categoria.title),
    },
  }));
