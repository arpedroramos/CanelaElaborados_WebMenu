import { existsSync, readFileSync } from 'node:fs';

const RUTA = 'data/sitio.json';

if (!existsSync(RUTA)) {
  console.error(`No existe ${RUTA}.`);
  process.exit(1);
}

let sitio: unknown;
try {
  sitio = JSON.parse(readFileSync(RUTA, 'utf8'));
} catch (e) {
  console.error(`${RUTA} no es un JSON válido: ${(e as Error).message}`);
  process.exit(1);
}

if (typeof sitio !== 'object' || sitio === null || Array.isArray(sitio)) {
  console.error(`${RUTA} debe ser un objeto.`);
  process.exit(1);
}
if (typeof (sitio as { enConstruccion?: unknown }).enConstruccion !== 'boolean') {
  console.error(`"enConstruccion" de ${RUTA} debe ser true o false.`);
  process.exit(1);
}
console.log(`Sitio válido: ${(sitio as { enConstruccion: boolean }).enConstruccion ? 'en construcción' : 'abierto'}.`);
