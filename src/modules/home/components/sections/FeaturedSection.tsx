import { DESTACADOS } from '@/data/destacados';

// Sin foto, cada tarjeta muestra un bloque de color distinto como espacio reservado.
const PLACEHOLDERS = ['bg-lavanda', 'bg-lila', 'bg-lila-deep'];

export const FeaturedSection = () => (
  <section id="destacados" className="bg-lavanda-suave py-14">
    <div className="mx-auto max-w-wrap px-5 sm:px-8">
      <h2 className="sr-only">Productos destacados</h2>
      <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-3 sm:gap-4">
        {DESTACADOS.map((item, index) => (
          <li key={item.title} className="rounded-[20px] border-[1.5px] border-linea bg-crema p-5">
            <div
              className={`mb-3.5 aspect-[3/2] overflow-hidden rounded-[14px] ${PLACEHOLDERS[index % PLACEHOLDERS.length]}`}
            >
              {item.imgSrc && (
                <img
                  src={item.imgSrc}
                  alt={item.imgAlt || item.title}
                  loading="lazy"
                  width={item.imgWidth ?? 600}
                  height={item.imgHeight ?? 400}
                  className="size-full object-cover"
                />
              )}
            </div>
            <h3 className="font-title text-[22px] leading-[28px] font-bold tracking-[0.02em] text-carbon uppercase">
              {item.title}
            </h3>
            <p className="mt-1 text-sm leading-[22px] text-texto-suave">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
