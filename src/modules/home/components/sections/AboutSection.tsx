import mascota from '@/assets/mascota_canela.png';

export const AboutSection = () => (
  <section id="nosotros" className="bg-lavanda py-14">
    <div className="mx-auto grid max-w-wrap items-center gap-7 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
      {/* La imagen trae el fondo avena incrustado: va en un panel para no verse como un recuadro suelto. */}
      <div className="mx-auto w-3/5 max-w-[260px] overflow-hidden rounded-[20px] bg-avena">
        <img src={mascota} alt="Mascota de Canela" width={500} height={599} className="h-auto w-full" />
      </div>
      <div className="flex flex-col gap-3.5">
        <span className="text-xs font-bold tracking-[0.14em] text-carbon uppercase">Nosotros</span>
        <h2 className="font-title text-[34px] leading-[40px] font-bold text-azul">
          Soy Yesi, mis amigxs ya me dicen Canela.
        </h2>
        <p>
          Empecé de chica haciendo los bizcochuelos y muffins que me enseñó mi mamá, luego comencé a
          explorar el mundo de la pastelería a través de redes sociales y videos. Con el paso de los
          años fui adquiriendo práctica y conocimientos, y hasta el día de hoy sigo buscando cosas
          nuevas para probar y seguir creciendo.
        </p>
        <p>
          Si bien yo soy la que cocina la mayoría de las cosas, siempre tuve ayudantes: mis papás, mi
          hermana y hoy mi novio, cada vez más partícipe de la cocina, el packaging, el armado de
          pedidos y los repartos.
        </p>
        <p className="font-title text-[22px] leading-[30px] text-azul italic">
          Ayudándome en todo y apoyándome a seguir dando pasos con Canela.
        </p>
      </div>
    </div>
  </section>
);
