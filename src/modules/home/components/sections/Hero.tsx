import logoMascota from '@/assets/logo_mascota_canela.png';
import { buttonClass } from '@/components/ui/button';
import { CONTACTO } from '@/data/contacto';
import { HAY_MENU } from '@/data/menu';
import { buildOrderUrl } from '@/lib/whatsapp';

export const Hero = () => (
  <section id="inicio" className="pt-8 pb-14">
    <div className="mx-auto grid max-w-wrap gap-7 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
      <img
        src={logoMascota}
        alt="Canela: mascota conejo dentro de un molde de budín"
        width={1000}
        height={678}
        className="mx-auto h-auto w-full max-w-[560px]"
      />
      <div className="flex flex-col items-center gap-[18px] text-center">
        <p className="font-hand text-[26px] leading-[30px] tracking-[0.06em] text-lila-deep uppercase">
          Artesanal · Calidad · Delicado
        </p>
        <h1 className="max-w-[560px] font-title text-[30px] leading-[38px] font-normal text-azul">
          <b className="font-bold">Canela es un emprendimiento que realiza pastelería artesanal.</b>{' '}
          Quienes consumen los productos lo hacen por ser caseros, artesanales y personalizados a la
          necesidad de cada persona.
        </h1>
        <div className="max-w-[420px] rounded-2xl border-2 border-dashed border-lila bg-crema px-[18px] py-3.5 text-[15px]">
          Pedidos con <b>{CONTACTO.plazoPedido}</b> de anticipación.
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {HAY_MENU && (
            <a className={buttonClass({ variant: 'azul', size: 'pill' })} href="#menu">
              Ver el menú
            </a>
          )}
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
    </div>
  </section>
);
