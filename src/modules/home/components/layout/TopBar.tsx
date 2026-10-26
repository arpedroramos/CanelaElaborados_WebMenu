import logoCanela from '@/assets/logo_canela.png';
import { buttonClass } from '@/components/ui/button';
import { buildOrderUrl } from '@/lib/whatsapp';

export const TopBar = () => (
  <header className="mx-auto flex min-h-[60px] max-w-wrap items-center justify-between gap-3 px-5 py-2 sm:px-8">
    <a href="#inicio" aria-label="Canela, inicio">
      <img src={logoCanela} alt="Canela" width={117} height={30} className="h-[30px] w-auto" />
    </a>
    <a
      className={buttonClass({ variant: 'azul', size: 'pill-sm' })}
      href={buildOrderUrl('hacer un encargo')}
      target="_blank"
      rel="noopener noreferrer"
    >
      Encargar
    </a>
  </header>
);
