export interface LineaConsulta {
  key: string;
  titulo: string;
  opcion?: string;
  /** Precio unitario en pesos; `null` si el producto no tiene precio publicado. */
  precio: number | null;
  cantidad: number;
}

const PRECIO = /\$\s*([\d.]+)/;

/** "$3.500" → 3500; `null` si no hay un monto. */
export const parsePrecio = (texto?: string): number | null => {
  const monto = texto?.match(PRECIO)?.[1]?.replace(/\./g, '');
  return monto ? Number(monto) : null;
};

/** Quita el sufijo de precio de una opción: "X 350g – $3.500" → "X 350g". */
export const nombreOpcion = (label: string): string => label.replace(/\s*[–-]?\s*\$\s*[\d.]+\s*$/, '').trim();

export const formatPesos = (monto: number): string => `$${new Intl.NumberFormat('es-AR').format(monto)}`;

export const totalConsulta = (lineas: LineaConsulta[]): number =>
  lineas.reduce((suma, linea) => suma + (linea.precio ?? 0) * linea.cantidad, 0);

export const buildConsultaMessage = (nombre: string, lineas: LineaConsulta[]): string => {
  const detalle = lineas.map((linea) => {
    const opcion = linea.opcion ? ` (${linea.opcion})` : '';
    const costo = linea.precio === null ? 'a consultar' : formatPesos(linea.precio * linea.cantidad);
    return `• ${linea.cantidad} x *${linea.titulo}*${opcion} — ${costo}`;
  });
  const aConsultar = lineas.some((linea) => linea.precio === null) ? ' + productos a consultar' : '';

  return [
    `Hola *${nombre.trim()}*, quería consultar por:`,
    '',
    ...detalle,
    '',
    `💰 *Presupuesto total: ${formatPesos(totalConsulta(lineas))}${aConsultar}*`,
    '_*Presupuesto estimado: los precios pueden sufrir modificaciones._',
  ].join('\n');
};
