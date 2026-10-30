import { CONTACTO } from '@/data/contacto';
import { HAY_MENU, MENU } from '@/data/menu';
import type { MenuItem } from '@/data/menu_types';
import { rutaDe } from '@/data/rutas';
import { SITIO } from '@/data/sitio';
import { nombreOpcion, parsePrecio } from './consulta';

type Json = Record<string, unknown>;

const ID_NEGOCIO = `${SITIO.url}/#negocio`;

const oferta = (monto: number, nombre?: string): Json => ({
  '@type': 'Offer',
  ...(nombre ? { name: nombre } : {}),
  price: String(monto),
  priceCurrency: 'ARS',
});

const ofertasDe = (item: MenuItem): Json | Json[] | undefined => {
  if (item.options?.length) {
    const ofertas = item.options.flatMap((opcion) => {
      const monto = parsePrecio(opcion.label);
      return monto === null ? [] : [oferta(monto, nombreOpcion(opcion.label))];
    });
    if (ofertas.length) return ofertas;
  }
  const monto = parsePrecio(item.price);
  return monto === null ? undefined : oferta(monto);
};

const itemDelMenu = (item: MenuItem): Json => {
  const ofertas = ofertasDe(item);
  return {
    '@type': 'MenuItem',
    name: item.title,
    // El texto de relleno no se publica como dato estructurado.
    ...(item.description && !/^lorem/i.test(item.description) ? { description: item.description } : {}),
    ...(item.imgSrc ? { image: `${SITIO.url}${item.imgSrc}` } : {}),
    ...(ofertas ? { offers: ofertas } : {}),
  };
};

const menu = (): Json => ({
  '@type': 'Menu',
  name: `Menú de ${SITIO.nombre}`,
  hasMenuSection: MENU.map((categoria) => ({
    '@type': 'MenuSection',
    name: categoria.title,
    hasMenuItem: categoria.items.map(itemDelMenu),
  })),
});

const negocio = (): Json => ({
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  '@id': ID_NEGOCIO,
  name: SITIO.nombre,
  url: `${SITIO.url}/`,
  description: rutaDe('/')?.description,
  image: `${SITIO.url}${SITIO.imagenSocial}`,
  telephone: `+${CONTACTO.whatsapp}`,
  sameAs: [CONTACTO.instagramUrl],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'La Plata',
    addressRegion: 'Buenos Aires',
    addressCountry: 'AR',
  },
  areaServed: { '@type': 'City', name: 'La Plata' },
  ...(HAY_MENU ? { hasMenu: menu() } : {}),
});

const migas = (path: string, titulo: string): Json => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: SITIO.nombre, item: `${SITIO.url}/` },
    { '@type': 'ListItem', position: 2, name: titulo, item: `${SITIO.url}${path}` },
  ],
});

/** Datos estructurados de cada ruta, listos para `<script type="application/ld+json">`. */
export const jsonLdDe = (path: string): Json[] => {
  if (path === '/') return [negocio()];
  const ruta = rutaDe(path);
  return ruta?.indexar ? [migas(ruta.path, ruta.title)] : [];
};
