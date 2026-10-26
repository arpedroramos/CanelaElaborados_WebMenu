import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import ExcelJS from 'exceljs';
import sharp from 'sharp';
import type { MenuCategory, MenuItem } from '../src/data/menu_types.ts';
import {
  DIR_FOTOS,
  DIR_IMG_SALIDA,
  EXCEL,
  HOJA_CATEGORIAS,
  HOJA_PRODUCTOS,
  JSON_GENERADO,
  parsearOpciones,
} from './contenido_comun.ts';

const ANCHO_MAX = 800;
const errores: string[] = [];

type Fila = Record<string, string>;

const celda = (valor: ExcelJS.CellValue): string => {
  if (valor == null) return '';
  if (typeof valor === 'object') {
    if ('richText' in valor) return valor.richText.map((t) => t.text).join('').trim();
    if ('text' in valor) return String(valor.text).trim();
    if ('result' in valor) return String(valor.result ?? '').trim();
    return '';
  }
  return String(valor).trim();
};

const leerHoja = (libro: ExcelJS.Workbook, nombre: string): Fila[] => {
  const hoja = libro.getWorksheet(nombre);
  if (!hoja) {
    errores.push(`Falta la hoja "${nombre}" en el Excel.`);
    return [];
  }
  const encabezados = (hoja.getRow(1).values as ExcelJS.CellValue[]).map((v) => celda(v));
  const filas: Fila[] = [];
  hoja.eachRow((fila, n) => {
    if (n === 1) return;
    const datos: Fila = { _fila: String(n) };
    encabezados.forEach((enc, i) => {
      if (enc) datos[enc] = celda(fila.getCell(i).value);
    });
    if (Object.entries(datos).some(([k, v]) => k !== '_fila' && v)) filas.push(datos);
  });
  return filas;
};

const visible = (fila: Fila) => (fila.visible ?? 'SI').toUpperCase() !== 'NO';
const porOrden = (a: Fila, b: Fila) => (Number(a.orden) || 0) - (Number(b.orden) || 0);

if (!existsSync(EXCEL)) {
  console.error(`No existe ${EXCEL}. Creá la plantilla con: npm run contenido:plantilla`);
  process.exit(1);
}

const libro = new ExcelJS.Workbook();
await libro.xlsx.readFile(EXCEL);

const filasCategorias = leerHoja(libro, HOJA_CATEGORIAS).filter(visible).sort(porOrden);
const filasProductos = leerHoja(libro, HOJA_PRODUCTOS).filter(visible).sort(porOrden);

const idsCategorias = new Set(filasCategorias.map((f) => f.categoria));
const fotosDisponibles = existsSync(DIR_FOTOS) ? new Set(readdirSync(DIR_FOTOS)) : new Set<string>();
const fotosUsadas = new Set<string>();
const nombresVistos = new Set<string>();

const categorias: MenuCategory[] = filasCategorias.map((f) => {
  if (!f.categoria) errores.push(`Categorias fila ${f._fila}: falta "categoria".`);
  if (!f.etiqueta) errores.push(`Categorias fila ${f._fila}: falta "etiqueta".`);
  return {
    id: f.categoria,
    label: f.etiqueta,
    title: f.titulo || f.etiqueta,
    note: f.nota,
    ...(f.precio_nota && { priceNote: f.precio_nota }),
    ...(f.boton_texto && f.boton_pedido && { footerCta: { label: f.boton_texto, order: f.boton_pedido } }),
    items: [],
  };
});

for (const f of filasProductos) {
  const donde = `Productos fila ${f._fila}`;
  const categoria = categorias.find((c) => c.id === f.categoria);
  if (!categoria) {
    if (!idsCategorias.has(f.categoria)) {
      errores.push(`${donde}: la categoría "${f.categoria}" no existe (o está oculta) en la hoja Categorias.`);
    }
    continue;
  }
  if (!f.nombre) {
    errores.push(`${donde}: falta "nombre".`);
    continue;
  }
  const clave = `${f.categoria}/${f.nombre}`;
  if (nombresVistos.has(clave)) errores.push(`${donde}: "${f.nombre}" está repetido en "${f.categoria}".`);
  nombresVistos.add(clave);

  const item: MenuItem = { title: f.nombre, description: f.descripcion };
  if (f.precio) item.price = f.precio;
  if (f.imagen) {
    const archivo = f.imagen.endsWith('.webp') ? f.imagen : `${f.imagen}.webp`;
    if (!fotosDisponibles.has(archivo)) errores.push(`${donde}: no existe la foto contenido/fotos/${archivo}.`);
    else {
      fotosUsadas.add(archivo);
      item.imgSrc = `/img/menu/${archivo}`;
    }
  }
  if (f.pedido) item.order = f.pedido;
  if (f.boton) item.cta = f.boton;
  if (f.opciones) {
    const opciones = parsearOpciones(f.opciones);
    if (opciones.some((o) => !o.label || !o.order)) {
      errores.push(`${donde}: las opciones deben tener el formato "Etiqueta|pedido; Etiqueta|pedido".`);
    }
    item.options = opciones;
  }
  categoria.items.push(item);
}

if (errores.length) {
  console.error(`\nNo se generó nada. Corregí estos problemas en el Excel:\n\n - ${errores.join('\n - ')}\n`);
  process.exit(1);
}

rmSync(DIR_IMG_SALIDA, { recursive: true, force: true });
mkdirSync(DIR_IMG_SALIDA, { recursive: true });
for (const archivo of fotosUsadas) {
  await sharp(path.join(DIR_FOTOS, archivo))
    .resize({ width: ANCHO_MAX, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(DIR_IMG_SALIDA, archivo));
}

writeFileSync(JSON_GENERADO, JSON.stringify(categorias, null, 2) + '\n');
const total = categorias.reduce((n, c) => n + c.items.length, 0);
console.log(`Listo: ${categorias.length} categorías, ${total} productos, ${fotosUsadas.size} fotos.`);
