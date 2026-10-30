import { PREGUNTAS } from '@/data/preguntas';
import { SectionHeading } from './SectionHeading';

export const FaqSection = () => (
  <section id="preguntas" className="py-14">
    <div className="mx-auto max-w-[760px] px-5 sm:px-8">
      <SectionHeading
        eyebrow="Ayuda"
        title="Preguntas frecuentes"
        description="Lo que más nos consultan antes de hacer un pedido."
      />
      <div className="flex flex-col gap-2">
        {PREGUNTAS.map((item) => (
          <details key={item.pregunta} className="group rounded-[14px] border border-linea bg-crema">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-[14px] px-4 py-3 text-left text-[15px] font-bold text-azul outline-none focus-visible:ring-3 focus-visible:ring-lavanda [&::-webkit-details-marker]:hidden">
              <h3 className="m-0 text-[15px] font-bold">{item.pregunta}</h3>
              <span aria-hidden className="text-xl leading-none transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="px-4 pb-4 text-[15px] text-texto-suave">{item.respuesta}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);
