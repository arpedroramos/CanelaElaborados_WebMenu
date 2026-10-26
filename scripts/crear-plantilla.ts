import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import ExcelJS from 'exceljs';
import type { MenuCategory } from '../src/data/menu_types.ts';
import {
  COLUMNAS_CATEGORIAS,
  COLUMNAS_PRODUCTOS,
  DIR_CONTENIDO,
  DIR_FOTOS,
  EXCEL,
  HOJA_CATEGORIAS,
  HOJA_PRODUCTOS,
  JSON_SEED,
  formatearOpciones,
} from './contenido_comun.ts';

if (existsSync(EXCEL) && !process.argv.includes('--forzar')) {
  console.error(`Ya existe ${EXCEL}. Usá --forzar para reemplazarlo (se pierden los cambios).`);
  process.exit(1);
}

const categorias: MenuCategory[] = JSON.parse(readFileSync(JSON_SEED, 'utf8'));
const libro = new ExcelJS.Workbook();

const hojaCategorias = libro.addWorksheet(HOJA_CATEGORIAS);
hojaCategorias.columns = COLUMNAS_CATEGORIAS.map((c) => ({ header: c, key: c, width: 22 }));
categorias.forEach((cat, i) =>
  hojaCategorias.addRow({
    categoria: cat.id,
    etiqueta: cat.label,
    titulo: cat.title,
    nota: cat.note,
    precio_nota: cat.priceNote ?? '',
    boton_texto: cat.footerCta?.label ?? '',
    boton_pedido: cat.footerCta?.order ?? '',
    orden: i + 1,
    visible: 'SI',
  }),
);

const hojaProductos = libro.addWorksheet(HOJA_PRODUCTOS);
hojaProductos.columns = COLUMNAS_PRODUCTOS.map((c) => ({ header: c, key: c, width: 24 }));
for (const cat of categorias) {
  cat.items.forEach((item, i) =>
    hojaProductos.addRow({
      categoria: cat.id,
      nombre: item.title,
      descripcion: item.description,
      precio: item.price ?? '',
      imagen: item.imgSrc ?? '',
      pedido: item.order ?? '',
      boton: item.cta ?? '',
      opciones: item.options ? formatearOpciones(item.options) : '',
      orden: i + 1,
      visible: 'SI',
    }),
  );
}

for (const hoja of [hojaCategorias, hojaProductos]) hoja.getRow(1).font = { bold: true };

mkdirSync(DIR_FOTOS, { recursive: true });
mkdirSync(DIR_CONTENIDO, { recursive: true });
await libro.xlsx.writeFile(EXCEL);
console.log(`Plantilla creada: ${EXCEL}\nPonés las fotos .webp en: ${DIR_FOTOS}`);
