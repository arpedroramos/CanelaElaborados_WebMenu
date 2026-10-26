import { buttonClass } from '@/components/ui/button';
import { CONTACTO } from '@/data/contacto';
import { trabajos } from '@/data/trabajos';
import { SectionHeading } from './SectionHeading';

export const WorksSection = () => (
  <section id="trabajos" className="py-14">
    <div className="mx-auto max-w-wrap px-5 sm:px-8">
      <SectionHeading
        eyebrow="Portfolio"
        title="Trabajos recientes"
        description="Tartas, budines y mesas dulces hechos a medida."
      />
      <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-4">
        {trabajos.map((trabajo, index) => (
          <li
            key={trabajo.alt}
            className={`aspect-[4/5] overflow-hidden rounded-[20px] sm:aspect-square ${index % 2 === 1 ? 'bg-lavanda-suave' : 'bg-lavanda'}`}
          >
            {trabajo.imgSrc && (
              <img src={trabajo.imgSrc} alt={trabajo.alt} loading="lazy" className="size-full object-cover" />
            )}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <a
          className={buttonClass({ variant: 'linea', size: 'pill' })}
          href={CONTACTO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver más en Instagram
        </a>
      </div>
    </div>
  </section>
);
