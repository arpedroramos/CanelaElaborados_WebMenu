import type { DocumentoLegal } from '@/data/legal';
import { ContactFooter } from '@modules/home/components/layout/ContactFooter';

export const LegalLayout = ({ documento }: { documento: DocumentoLegal }) => (
  <>
    <main className="mx-auto max-w-[760px] px-5 py-14 sm:px-8">
      <a href="/" className="text-sm font-bold text-lila-deep underline">
        ← Volver al inicio
      </a>
      <h1 className="mt-4 font-title text-[32px] leading-[38px] font-bold text-azul lg:text-[44px] lg:leading-[50px]">
        {documento.titulo}
      </h1>
      <p className="mt-2 text-sm text-texto-suave">Última actualización: {documento.actualizado}</p>
      {documento.secciones.map((seccion) => (
        <section key={seccion.titulo} className="mt-8">
          <h2 className="font-title text-[22px] leading-[28px] font-bold text-azul">{seccion.titulo}</h2>
          {seccion.parrafos.map((parrafo) => (
            <p key={parrafo} className="mt-2 text-[15px]">
              {parrafo}
            </p>
          ))}
        </section>
      ))}
    </main>
    <ContactFooter />
  </>
);
