import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const DIR_CONTENIDO = path.join(RAIZ, 'contenido');
export const EXCEL = path.join(DIR_CONTENIDO, 'menu.xlsx');
export const DIR_FOTOS = path.join(DIR_CONTENIDO, 'fotos');
export const DIR_IMG_SALIDA = path.join(RAIZ, 'public', 'img', 'menu');
export const JSON_GENERADO = path.join(RAIZ, 'src', 'data', 'menu.generated.json');
export const JSON_SEED = path.join(RAIZ, 'src', 'data', 'menu.seed.json');

export const HOJA_PRODUCTOS = 'Productos';
export const HOJA_CATEGORIAS = 'Categorias';

export const COLUMNAS_PRODUCTOS = [
  'categoria',
  'nombre',
  'descripcion',
  'precio',
  'imagen',
  'pedido',
  'boton',
  'opciones',
  'orden',
  'visible',
] as const;

export const COLUMNAS_CATEGORIAS = [
  'categoria',
  'etiqueta',
  'titulo',
  'nota',
  'precio_nota',
  'boton_texto',
  'boton_pedido',
  'orden',
  'visible',
] as const;

/** Las opciones se escriben en una celda como "Etiqueta|pedido; Otra|otro pedido". */
export const formatearOpciones = (opciones: { label: string; order: string }[]) =>
  opciones.map((o) => `${o.label}|${o.order}`).join('; ');

export const parsearOpciones = (texto: string) =>
  texto
    .split(';')
    .map((parte) => parte.trim())
    .filter(Boolean)
    .map((parte) => {
      const [label, ...resto] = parte.split('|');
      return { label: label.trim(), order: resto.join('|').trim() };
    });
