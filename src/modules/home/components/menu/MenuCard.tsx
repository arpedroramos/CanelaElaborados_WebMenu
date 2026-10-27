import { buttonClass } from '@/components/ui/button';
import type { MenuItem } from '@/data/menu_types';
import { keyDe, useConsulta } from '../../consulta/ConsultaContext';
import { StepperCantidad } from './StepperCantidad';

export const MenuCard = ({ item }: { item: MenuItem }) => {
  const { cantidadDe, agregar, cambiar } = useConsulta();
  const simple = cantidadDe(keyDe(item.title));

  return (
  <article className="rounded-[20px] border-[1.5px] border-linea bg-crema p-5 text-center">
    <div className="mb-3.5 aspect-[3/4] overflow-hidden rounded-[14px] bg-lavanda">
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
    <h4 className="font-title text-[22px] leading-[28px] font-bold tracking-[0.02em] text-carbon uppercase">
      {item.title}
    </h4>
    <p className="mt-1 text-sm leading-[22px] text-texto-suave">{item.description}</p>
    {item.price && <p className="mt-1 text-sm font-bold text-lila-deep">{item.price}</p>}
    {item.options && (
      <>
        <p className="mt-3 text-xs font-bold tracking-[0.14em] text-lila-deep uppercase">Opciones</p>
        <div className="mt-2 flex flex-col items-center gap-2">
          {item.options.map((option) => {
            const key = keyDe(item.title, option.label);
            const cantidad = cantidadDe(key);
            return (
              <div key={option.label} className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  className={buttonClass({ variant: 'chip', size: 'chip' })}
                  onClick={() => agregar(item, option.label)}
                >
                  {option.label}
                </button>
                {cantidad > 0 && (
                  <StepperCantidad
                    cantidad={cantidad}
                    nombre={`${item.title} ${option.label}`}
                    onChange={(delta) => cambiar(key, delta)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </>
    )}
    {!item.options &&
      (simple > 0 ? (
        <div className="mt-2">
          <StepperCantidad cantidad={simple} nombre={item.title} onChange={(delta) => cambiar(item.title, delta)} />
        </div>
      ) : (
        <button type="button" className={`mt-2 ${buttonClass({ variant: 'azul', size: 'pill-sm' })}`} onClick={() => agregar(item)}>
          {item.cta ?? 'Agregar'}
        </button>
      ))}
  </article>
  );
};
