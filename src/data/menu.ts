import type { MenuCategory } from './menu_types';
import seed from './menu.seed.json';

/** `npm run contenido` genera este archivo desde contenido/menu.xlsx; si no existe se usa el seed versionado. */
const generado = import.meta.glob<MenuCategory[]>('./menu.generated.json', {
  eager: true,
  import: 'default',
});

const BASE: MenuCategory[] = Object.values(generado)[0] ?? (seed as MenuCategory[]);

// TEMPORAL: 10 categorías de prueba para ver cómo reacciona la interfaz. Borrar este bloque y usar BASE.
const NOMBRES_PRUEBA = [
  'Alfajores',
  'Galletitas',
  'Panadería',
  'Saladitos',
  'Tortas personalizadas',
  'Cheesecakes',
  'Brownies y blondies',
  'Desayunos y meriendas',
  'Vegano y sin TACC',
  'Fiestas y eventos',
];

const PRUEBA: MenuCategory[] = NOMBRES_PRUEBA.map((nombre, i) => ({
  id: `prueba-${i + 1}`,
  label: nombre,
  title: nombre,
  note: `Categoría de prueba ${i + 1}.`,
  items: [1, 2, 3].map((n) => ({
    title: `${nombre} ${n}`,
    description: 'Descripción de ejemplo para probar el diseño.',
    order: `${nombre} ${n}`,
    cta: 'Pedir',
  })),
}));

export const MENU: MenuCategory[] = [...BASE, ...PRUEBA];
