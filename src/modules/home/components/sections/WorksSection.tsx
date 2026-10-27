import { buttonClass } from '@/components/ui/button';
import { trabajos } from '@/data/trabajos';
import { SectionHeading } from './SectionHeading';

export const WorksSection = () => (
  <section id="trabajos" className="py-14">
    <div className="mx-auto max-w-wrap px-5 sm:px-8">
      <SectionHeading
        eyebrow="Portfolio"
        title="Tortas personalizadas"
        description="Diseños a medida para cada ocasión."
      />
      <ul className="m-0 grid list-none grid-cols-4 gap-3 p-0">
        {trabajos.map((trabajo, index) => (
          <li
            key={trabajo.alt}
            className={`aspect-[3/4] overflow-hidden rounded-[20px] ${index % 2 === 1 ? 'bg-lavanda-suave' : 'bg-lavanda'}`}
          >
            {trabajo.imgSrc && (
              <img src={trabajo.imgSrc} alt={trabajo.alt} loading="lazy" className="size-full object-cover" />
            )}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center">
        <a className={buttonClass({ variant: 'linea', size: 'pill' })} href="#/tortas-personalizadas">
          Ver todas las tortas
        </a>
      </div>
    </div>
  </section>
);
