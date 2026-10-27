import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Destacado } from '../src/data/destacados_types.ts';

const RUTA = 'data/destacados.json';
const CARPETA_FOTOS = 'public/img/destacados';
const MAXIMO = 3;

const errores: string[] = [];
const avisos: string[] = [];

if (!existsSync(RUTA)) {
  console.error(`No existe ${RUTA}.`);
  process.exit(1);
}

let destacados: Destacado[];
try {
  destacados = JSON.parse(readFileSync(RUTA, 'utf8'));
} catch (e) {
  console.error(`${RUTA} no es un JSON válido: ${(e as Error).message}`);
  process.exit(1);
}
if (!Array.isArray(destacados)) {
  console.error(`${RUTA} debe ser una lista de destacados.`);
  process.exit(1);
}
if (destacados.length > MAXIMO) {
  errores.push(`Hay ${destacados.length} destacados y el máximo es ${MAXIMO}.`);
}

const usadas = new Set<string>();

for (const [i, item] of destacados.entries()) {
  const nombre = item.title || `n.º ${i + 1}`;
  if (!item.title) errores.push(`El destacado n.º ${i + 1} no tiene título.`);
  for (const campo of ['imgWidth', 'imgHeight'] as const) {
    const valor = item[campo];
    if (valor !== undefined && (!Number.isInteger(valor) || valor <= 0)) {
      errores.push(`"${campo}" de "${nombre}" debe ser un entero mayor que 0.`);
    }
  }
  if (item.imgAlt !== undefined && typeof item.imgAlt !== 'string') {
    errores.push(`"imgAlt" de "${nombre}" debe ser texto.`);
  }
  if (!item.imgSrc) {
    avisos.push(`El destacado "${nombre}" no tiene foto.`);
    continue;
  }
  const archivo = item.imgSrc.replace(/^\/?(img\/destacados\/)?/, '');
  usadas.add(archivo);
  if (!existsSync(join(CARPETA_FOTOS, archivo))) {
    errores.push(`La foto "${item.imgSrc}" de "${nombre}" no existe en ${CARPETA_FOTOS}/.`);
  }
}

if (existsSync(CARPETA_FOTOS)) {
  for (const archivo of readdirSync(CARPETA_FOTOS)) {
    if (archivo.startsWith('.') || usadas.has(archivo)) continue;
    avisos.push(`Foto huérfana (no se usa en los destacados): ${archivo}`);
  }
}

for (const aviso of avisos) console.warn(`Aviso: ${aviso}`);
if (errores.length) {
  for (const error of errores) console.error(`Error: ${error}`);
  process.exit(1);
}
console.log(`Destacados válidos: ${destacados.length}.`);
