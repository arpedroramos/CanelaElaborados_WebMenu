import { CONTACTO } from '@/data/contacto';
import { buttonClass } from '@/components/ui/button';
import { buildOrderUrl } from '@/lib/whatsapp';

export const Hero = () => (
  <section className="bg-crema pt-8 pb-14">
    <div className="mx-auto flex max-w-wrap flex-col items-center gap-[18px] px-5 text-center sm:px-8">
      <h1 className="max-w-[560px] font-title text-[30px] leading-[38px] font-normal text-azul">
        <b className="font-bold">Canela es un emprendimiento que realiza pastelería artesanal.</b>{' '}
        Quienes consumen los productos lo hacen por ser caseros, artesanales y personalizados a la
        necesidad de cada persona.
      </h1>
      <div className="max-w-[420px] rounded-2xl border-2 border-dashed border-lila bg-crema px-[18px] py-3.5 text-[15px]">
        Pedidos con <b>{CONTACTO.plazoPedido}</b> de anticipación.
      </div>
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
