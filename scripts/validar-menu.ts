import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { MenuCategory } from '../src/data/menu_types.ts';

const RUTA_MENU = 'data/menu.json';
const CARPETA_FOTOS = 'public/img/menu';

const errores: string[] = [];
const avisos: string[] = [];

if (!existsSync(RUTA_MENU)) {
  console.error(`No existe ${RUTA_MENU}.`);
  process.exit(1);
}

let menu: MenuCategory[];
try {
  menu = JSON.parse(readFileSync(RUTA_MENU, 'utf8'));
} catch (e) {
  console.error(`${RUTA_MENU} no es un JSON válido: ${(e as Error).message}`);
  process.exit(1);
}
if (!Array.isArray(menu)) {
  console.error(`${RUTA_MENU} debe ser una lista de categorías.`);
  process.exit(1);
}

const ids = new Set<string>();
const usadas = new Set<string>();

for (const cat of menu) {
  const nombre = cat.title || cat.id || '(sin id)';
  if (!cat.id) errores.push(`Hay una categoría sin id (${nombre}).`);
  else if (ids.has(cat.id)) errores.push(`Id de categoría duplicado: "${cat.id}".`);
  ids.add(cat.id);
  if (!cat.title) errores.push(`La categoría "${cat.id}" no tiene título.`);
  if (!cat.items?.length) errores.push(`La categoría "${nombre}" no tiene productos.`);

  for (const item of cat.items ?? []) {
    if (!item.title) errores.push(`Hay un producto sin título en la categoría "${nombre}".`);
    for (const campo of ['imgWidth', 'imgHeight'] as const) {
      const valor = item[campo];
      if (valor !== undefined && (!Number.isInteger(valor) || valor <= 0)) {
        errores.push(`"${campo}" de "${item.title}" debe ser un entero mayor que 0.`);
      }
    }
    if (item.imgAlt !== undefined && typeof item.imgAlt !== 'string') {
      errores.push(`"imgAlt" de "${item.title}" debe ser texto.`);
    }
    if (!item.imgSrc) continue;
    const archivo = item.imgSrc.replace(/^\/?(img\/menu\/)?/, '');
    usadas.add(archivo);
    if (!existsSync(join(CARPETA_FOTOS, archivo))) {
      errores.push(`La foto "${item.imgSrc}" de "${item.title}" no existe en ${CARPETA_FOTOS}/.`);
    }
  }
}

if (existsSync(CARPETA_FOTOS)) {
  for (const archivo of readdirSync(CARPETA_FOTOS)) {
    if (archivo.startsWith('.') || usadas.has(archivo)) continue;
    avisos.push(`Foto huérfana (no se usa en el menú): ${archivo}`);
  }
}

for (const aviso of avisos) console.warn(`Aviso: ${aviso}`);
if (errores.length) {
  for (const error of errores) console.error(`Error: ${error}`);
  process.exit(1);
}
console.log(`Menú válido: ${menu.length} categorías.`);
