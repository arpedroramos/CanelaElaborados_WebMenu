import { CONTACTO } from '@/data/contacto';

export const buildWhatsAppUrl = (message?: string): string => {
  const base = `https://wa.me/${CONTACTO.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const buildOrderUrl = (product: string): string =>
  buildWhatsAppUrl(`Hola Canela! Quiero pedir: ${product}`);
