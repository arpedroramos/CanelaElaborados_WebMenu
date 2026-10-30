import sitio from '../../data/sitio.json';

const forzado = import.meta.env.VITE_EN_CONSTRUCCION;

/**
 * `data/sitio.json` lo publica la app de gestión. `VITE_EN_CONSTRUCCION` (en `.env.local`) solo sirve
 * para probar en la PC y, si está definida, manda sobre el archivo.
 */
export const EN_CONSTRUCCION: boolean = forzado === undefined ? sitio.enConstruccion : forzado === 'true';
