import { buttonClass } from '@/components/ui/button';
import { CONTACTO } from '@/data/contacto';
import { buildOrderUrl, buildWhatsAppUrl } from '@/lib/whatsapp';

const linkClass = 'outline-none hover:text-lavanda focus-visible:ring-3 focus-visible:ring-lavanda';
const headingClass = 'mb-2.5 text-xs font-bold tracking-[0.14em] text-lavanda uppercase';
const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export const ContactFooter = () => (
  <footer id="contacto" className="bg-azul pt-14 pb-8 text-crema">
    <div className="mx-auto max-w-wrap px-5 sm:px-8">
      <div className="grid justify-items-center gap-9 text-center lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col items-center gap-3">
          <span className="font-hand text-[28px] tracking-[0.06em] text-lavanda uppercase">
            Artesanal · Calidad · Delicado
          </span>
          <p className="max-w-[340px] text-[15px]">
            Pedidos con {CONTACTO.plazoPedido} de anticipación. Escribinos y armamos tu encargo.
          </p>
          <div>
            <a
              className={buttonClass({ variant: 'crema', size: 'pill-sm' })}
              href={buildOrderUrl('hacer un encargo')}
              {...external}
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
        <div>
          <h4 className={headingClass}>Contacto</h4>
          <ul className="m-0 list-none p-0 text-[15px]">
            <li className="mb-2">
              <a className={linkClass} href={buildWhatsAppUrl()} {...external}>
                {CONTACTO.whatsappVisible}
              </a>
            </li>
            <li className="mb-2">
              <a className={linkClass} href={CONTACTO.instagramUrl} {...external}>
                @{CONTACTO.instagramUsuario}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);
