import type { Destacado } from './destacados_types';
import destacados from '../../data/destacados.json';

export const MAX_DESTACADOS = 3;

/** `data/destacados.json` lo publica la app de gestión; sin elementos, el bloque no se muestra. */
export const DESTACADOS: Destacado[] = (destacados as Destacado[]).slice(0, MAX_DESTACADOS);

export const HAY_DESTACADOS = DESTACADOS.length > 0;
