interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export const SectionHeading = ({ eyebrow, title, description }: SectionHeadingProps) => (
  <div className="mb-6 flex flex-col items-center gap-2 text-center">
    <span className="text-xs font-bold tracking-[0.14em] text-lila-deep uppercase">{eyebrow}</span>
    <h2 className="font-title text-[36px] leading-[42px] font-bold text-azul lg:text-[48px] lg:leading-[54px]">
      {title}
    </h2>
    <p className="text-[15px] text-texto-suave">{description}</p>
  </div>
);
