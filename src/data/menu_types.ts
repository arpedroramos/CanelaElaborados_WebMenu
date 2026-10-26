export interface MenuOption {
  label: string;
  /** Producto tal como se escribe en el mensaje de WhatsApp. */
  order: string;
}

export interface MenuItem {
  title: string;
  description: string;
  /** Ruta de la foto; vacío muestra el espacio reservado. */
  imgSrc?: string;
  /** Precio ya formateado (ej. "$12.000"); vacío no muestra nada. */
  price?: string;
  /** Producto tal como se escribe en el mensaje de WhatsApp. Sin él ni opciones, no hay botón de pedido. */
  order?: string;
  /** Texto del enlace de pedido. */
  cta?: string;
  /** Variantes que se piden con un chip cada una. */
  options?: MenuOption[];
}

export interface MenuCategory {
  id: string;
  label: string;
  title: string;
  note: string;
  /** Se muestra junto a la nota cuando haya precio real (ej. "$12.000"). */
  priceNote?: string;
  items: MenuItem[];
  /** Botón de pedido general al final de la categoría. */
  footerCta?: { label: string; order: string };
}
