import { Plus } from 'lucide-react';
import { buttonClass } from '@/components/ui/button';
import type { MenuItem } from '@/data/menu_types';
import { formatPesos, nombreOpcion, parsePrecio } from '@/lib/consulta';
import { keyDe, useConsulta } from '../../consulta/ConsultaContext';
import { DescripcionPlegable } from './DescripcionPlegable';
import { StepperCantidad } from './StepperCantidad';

export const MenuCard = ({ item }: { item: MenuItem }) => {
  const { cantidadDe, agregar, cambiar } = useConsulta();
  const simple = cantidadDe(keyDe(item.title));

  return (
    <article className="flex gap-3 rounded-[20px] border-[1.5px] border-linea bg-crema p-3 text-left sm:block sm:p-5 sm:text-center">
      <div className="aspect-[3/4] w-24 shrink-0 self-start overflow-hidden rounded-[14px] bg-lavanda sm:mb-3.5 sm:w-auto">
        {item.imgSrc && (
          <img
            src={item.imgSrc}
            alt={item.imgAlt || item.title}
            loading="lazy"
            width={item.imgWidth ?? 800}
            height={item.imgHeight ?? 600}
            className="size-full object-cover"
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-title text-base leading-5 font-bold tracking-[0.02em] text-carbon uppercase sm:text-[22px] sm:leading-[28px]">
          {item.title}
        </h4>
        <DescripcionPlegable texto={item.description} />
        {item.options && (
          <ul className="mt-2 divide-y divide-linea border-y border-linea">
            {item.options.map((option) => {
              const key = keyDe(item.title, option.label);
              const cantidad = cantidadDe(key);
              const precio = parsePrecio(option.label);
              return (
                <li
                  key={option.label}
                  className={`flex min-h-12 items-center gap-2 px-1 py-1.5 ${cantidad > 0 ? 'bg-lavanda/40' : ''}`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-5 font-bold text-carbon">{nombreOpcion(option.label)}</p>
                    {precio !== null && (
                      <p className="text-[13px] leading-4 font-bold text-lila-deep">{formatPesos(precio)}</p>
                    )}
                  </div>
                  {cantidad > 0 ? (
                    <StepperCantidad
                      cantidad={cantidad}
                      compacto
                      nombre={`${item.title} ${option.label}`}
                      onChange={(delta) => cambiar(key, delta)}
                    />
                  ) : (
                    <button
                      type="button"
                      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-azul text-crema outline-none hover:bg-carbon focus-visible:ring-3 focus-visible:ring-lavanda"
                      onClick={() => agregar(item, option.label)}
                      aria-label={`Agregar ${item.title} ${option.label}`}
                    >
                      <Plus className="size-5" aria-hidden="true" />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {!item.options && (
          <div className="mt-2 flex items-center justify-between gap-2 sm:flex-col sm:justify-center">
            {item.price && <p className="text-sm font-bold text-lila-deep">{item.price}</p>}
            {simple > 0 ? (
              <StepperCantidad cantidad={simple} nombre={item.title} onChange={(delta) => cambiar(item.title, delta)} />
            ) : (
              <button type="button" className={buttonClass({ variant: 'azul', size: 'pill-sm' })} onClick={() => agregar(item)}>
                {item.cta ?? 'Agregar'}
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
