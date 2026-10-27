import { useState } from 'react';
import { buttonClass } from '@/components/ui/button';
import { buildConsultaMessage, formatPesos } from '@/lib/consulta';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { useConsulta } from '../../consulta/ConsultaContext';

const NOMBRE_KEY = 'canela:consulta-nombre';

const leerNombre = (): string => {
  try {
    return localStorage.getItem(NOMBRE_KEY) ?? '';
  } catch {
    return '';
  }
};

const guardarNombre = (nombre: string) => {
  try {
    localStorage.setItem(NOMBRE_KEY, nombre);
  } catch {
    // sin almacenamiento: el nombre solo vive en esta visita
  }
};

export const ConsultaBar = () => {
  const { lineas, totalUnidades, total, vaciar } = useConsulta();
  const [nombre, setNombre] = useState(leerNombre);

  if (totalUnidades === 0) return null;

  const listo = nombre.trim().length > 0;
  const aConsultar = lineas.some((linea) => linea.precio === null);

  return (
    <>
    <div aria-hidden="true" className="h-40 sm:h-24" />
    <div
      role="region"
      aria-label="Tu consulta"
      className="fixed inset-x-0 bottom-0 z-50 border-t-[1.5px] border-linea bg-crema pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="mx-auto flex max-w-wrap flex-col gap-2 px-5 py-2 sm:flex-row sm:items-center sm:gap-5 sm:px-8">
        <div className="flex items-center justify-between gap-4 sm:block sm:min-w-44">
          <p className="text-sm font-bold text-carbon" aria-live="polite">
            {totalUnidades} {totalUnidades === 1 ? 'producto' : 'productos'}
          </p>
          <div className="text-right sm:text-left">
            <p className="text-sm font-bold text-lila-deep">
              Presupuesto: {formatPesos(total)}
              {aConsultar && ' + a consultar'}
            </p>
            <p className="text-[11px] leading-4 text-texto-suave">Estimado, puede sufrir modificaciones</p>
          </div>
        </div>
        <label className="flex-1">
          <span className="sr-only">Tu nombre</span>
          <input
            type="text"
            value={nombre}
            onChange={(event) => {
              setNombre(event.target.value);
              guardarNombre(event.target.value);
            }}
            placeholder="Tu nombre"
            autoComplete="given-name"
            className="min-h-11 w-full rounded-full border-[1.5px] border-lila bg-crema px-4 text-sm text-carbon outline-none placeholder:text-texto-suave focus-visible:ring-3 focus-visible:ring-lavanda"
          />
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={vaciar}
            className="min-h-11 px-3 text-[13px] font-bold text-azul underline underline-offset-4 outline-none hover:text-carbon focus-visible:ring-3 focus-visible:ring-lavanda"
          >
            Vaciar
          </button>
          <a
            className={`${buttonClass({ variant: 'azul', size: 'pill-sm' })} flex-1 sm:flex-none ${listo ? '' : 'pointer-events-none opacity-50'}`}
            href={listo ? buildWhatsAppUrl(buildConsultaMessage(nombre, lineas)) : undefined}
            aria-disabled={!listo}
            target="_blank"
            rel="noopener noreferrer"
          >
            {listo ? 'Enviar por WhatsApp' : 'Completá tu nombre'}
          </a>
        </div>
      </div>
    </div>
    </>
  );
};
