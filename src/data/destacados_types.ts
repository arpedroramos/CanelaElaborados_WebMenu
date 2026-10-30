export interface Destacado {
  title: string;
  description: string;
  /** Ruta de la foto (3:2); vacío muestra un bloque de color como espacio reservado. */
  imgSrc?: string;
  /** Texto alternativo de la foto; sin él se usa el título. */
  imgAlt?: string;
  /** Medidas reales de la foto en píxeles, para que el navegador reserve el espacio. */
  imgWidth?: number;
  imgHeight?: number;
}
