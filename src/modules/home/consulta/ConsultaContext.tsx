import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { MenuItem } from '@/data/menu_types';
import { nombreOpcion, parsePrecio, totalConsulta, type LineaConsulta } from '@/lib/consulta';

interface ConsultaValue {
  lineas: LineaConsulta[];
  totalUnidades: number;
  total: number;
  cantidadDe: (key: string) => number;
  agregar: (item: MenuItem, opcionLabel?: string) => void;
  cambiar: (key: string, delta: number) => void;
  vaciar: () => void;
}

const ConsultaContext = createContext<ConsultaValue | null>(null);

export const keyDe = (titulo: string, opcionLabel?: string): string =>
  opcionLabel ? `${titulo}|${opcionLabel}` : titulo;

export const ConsultaProvider = ({ children }: { children: ReactNode }) => {
  const [lineas, setLineas] = useState<LineaConsulta[]>([]);

  const cambiar = useCallback((key: string, delta: number) => {
    setLineas((actual) =>
      actual
        .map((linea) => (linea.key === key ? { ...linea, cantidad: linea.cantidad + delta } : linea))
        .filter((linea) => linea.cantidad > 0),
    );
  }, []);

  const agregar = useCallback(
    (item: MenuItem, opcionLabel?: string) => {
      const key = keyDe(item.title, opcionLabel);
      setLineas((actual) => {
        if (actual.some((linea) => linea.key === key)) {
          return actual.map((linea) => (linea.key === key ? { ...linea, cantidad: linea.cantidad + 1 } : linea));
        }
        return [
          ...actual,
          {
            key,
            titulo: item.title,
            opcion: opcionLabel && nombreOpcion(opcionLabel),
            precio: parsePrecio(opcionLabel ?? item.price),
            cantidad: 1,
          },
        ];
      });
    },
    [],
  );

  const vaciar = useCallback(() => setLineas([]), []);

  const value = useMemo<ConsultaValue>(
    () => ({
      lineas,
      totalUnidades: lineas.reduce((suma, linea) => suma + linea.cantidad, 0),
      total: totalConsulta(lineas),
      cantidadDe: (key) => lineas.find((linea) => linea.key === key)?.cantidad ?? 0,
      agregar,
      cambiar,
      vaciar,
    }),
    [lineas, agregar, cambiar, vaciar],
  );

  return <ConsultaContext value={value}>{children}</ConsultaContext>;
};

export const useConsulta = (): ConsultaValue => {
  const value = useContext(ConsultaContext);
  if (!value) throw new Error('useConsulta debe usarse dentro de ConsultaProvider');
  return value;
};
