import { useEffect, useRef, useState } from 'react';

export const DescripcionPlegable = ({ texto }: { texto: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [abierta, setAbierta] = useState(false);
  const [cortada, setCortada] = useState(false);

  useEffect(() => {
    const parrafo = ref.current;
    if (!parrafo) return;
    const medir = () => {
      if (!abierta) setCortada(parrafo.scrollHeight > parrafo.clientHeight + 1);
    };
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(parrafo);
    return () => observador.disconnect();
  }, [texto, abierta]);

  return (
    <>
      <p
        ref={ref}
        className={`mt-1 text-[13px] leading-[18px] text-texto-suave sm:text-sm sm:leading-[22px] ${abierta ? '' : 'line-clamp-2 sm:line-clamp-none'}`}
      >
        {texto}
      </p>
      {(cortada || abierta) && (
        <button
          type="button"
          aria-expanded={abierta}
          onClick={() => setAbierta((valor) => !valor)}
          className="-my-1 inline-flex min-h-11 items-center text-[13px] font-bold text-azul underline underline-offset-4 outline-none hover:text-carbon focus-visible:ring-3 focus-visible:ring-lavanda sm:hidden"
        >
          {abierta ? 'Ver menos' : 'Ver más'}
        </button>
      )}
    </>
  );
};
