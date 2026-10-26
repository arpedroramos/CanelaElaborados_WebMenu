import type { MenuCategory } from './menu_types';
import { completarPedidos } from './pedido';
import menu from '../../data/menu.json';

/** `data/menu.json` lo publica la app de gestión; los textos de pedido se completan acá. */
export const MENU: MenuCategory[] = completarPedidos(menu as MenuCategory[]);

export const HAY_MENU = MENU.length > 0;
