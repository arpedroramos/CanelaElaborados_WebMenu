import { buttonClass } from '@/components/ui/button';
import { ContactFooter } from '@modules/home/components/layout/ContactFooter';

export const NoEncontradaView = () => (
  <>
    <main className="mx-auto flex max-w-[760px] flex-col items-center gap-4 px-5 py-20 text-center sm:px-8">
      <h1 className="font-title text-[32px] leading-[38px] font-bold text-azul lg:text-[44px] lg:leading-[50px]">
        No encontramos esta página
      </h1>
      <p className="text-[15px] text-texto-suave">Puede que el enlace haya cambiado. Volvé al inicio para ver el menú.</p>
      <a href="/" className={buttonClass({ variant: 'azul', size: 'pill' })}>
        Ir al inicio
      </a>
    </main>
    <ContactFooter />
  </>
);
