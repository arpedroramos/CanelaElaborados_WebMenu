import { buttonClass } from '@/components/ui/button';
import { buildOrderUrl } from '@/lib/whatsapp';

export const Hero = () => (
  <section className="bg-crema pt-5 pb-8 sm:pt-8 sm:pb-14">
    <div className="mx-auto flex max-w-wrap flex-col items-center gap-3 px-5 text-center sm:gap-[18px] sm:px-8">
      <h1 className="font-title text-[22px] leading-[30px] font-normal text-azul sm:text-[30px] sm:leading-[38px]">
        <b className="font-bold">Canela es un emprendimiento que realiza pastelería artesanal.</b>{' '}
        Quienes consumen los productos lo hacen por ser caseros, artesanales y personalizados a la
        necesidad de cada persona.
      </h1>
      <div className="flex flex-wrap justify-center gap-3">
        <a
          className={buttonClass({ variant: 'linea', size: 'pill' })}
          href={buildOrderUrl('hacer un pedido')}
          target="_blank"
          rel="noopener noreferrer"
        >
          Pedir por WhatsApp
        </a>
      </div>
    </div>
  </section>
);
