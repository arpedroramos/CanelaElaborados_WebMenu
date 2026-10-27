import { ContactFooter } from '@modules/home/components/layout/ContactFooter';

export const TortasView = () => (
  <>
    <main className="mx-auto max-w-wrap px-5 py-14 text-center sm:px-8">
      <a href="#inicio" className="text-sm font-bold text-lila-deep underline">
        ← Volver al inicio
      </a>
      <h1 className="mt-4 font-title text-[36px] leading-[42px] font-bold text-azul lg:text-[48px] lg:leading-[54px]">
        Tortas personalizadas
      </h1>
    </main>
    <ContactFooter />
  </>
);
