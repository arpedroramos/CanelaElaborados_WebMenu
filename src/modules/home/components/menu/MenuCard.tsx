import { buttonClass } from '@/components/ui/button';
import type { MenuItem } from '@/data/menu_types';
import { buildOrderUrl } from '@/lib/whatsapp';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export const MenuCard = ({ item }: { item: MenuItem }) => (
  <article className="rounded-[20px] border-[1.5px] border-linea bg-crema p-5">
    <div className="mb-3.5 aspect-[4/3] overflow-hidden rounded-[14px] bg-lavanda">
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
      <div className="mt-3 flex flex-wrap gap-2">
        {item.options.map((option) => (
          <a
            key={option.label}
            className={buttonClass({ variant: 'chip', size: 'chip' })}
            href={buildOrderUrl(option.order ?? option.label)}
            {...external}
          >
            {option.label}
          </a>
        ))}
      </div>
    )}
    {item.order && (
      <a
        className="mt-1.5 inline-flex min-h-11 items-center text-[13px] font-bold tracking-[0.04em] text-azul underline underline-offset-4 outline-none hover:text-carbon focus-visible:ring-3 focus-visible:ring-lavanda"
        href={buildOrderUrl(item.order)}
        {...external}
      >
        {item.cta ?? 'Pedir'}
      </a>
    )}
  </article>
);
