export interface Trabajo {
  alt: string;
  /** Ruta de la foto; vacío muestra el espacio reservado. */
  imgSrc?: string;
}

export const trabajos: Trabajo[] = [
  { alt: 'Tarta de cumpleaños' },
  { alt: 'Budines en fila' },
  { alt: 'Mesa dulce' },
  { alt: 'Tiramisú' },
];
