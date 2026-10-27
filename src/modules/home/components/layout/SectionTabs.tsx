import { HAY_MENU } from '@/data/menu';

const TABS = [
  { href: '#inicio', label: 'Inicio' },
  ...(HAY_MENU ? [{ href: '#menu', label: 'Menú' }] : []),
  { href: '#trabajos', label: 'Tortas personalizadas' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
];

export const SectionTabs = () => (
  <nav
    aria-label="Secciones"
    className="sticky top-0 z-30 overflow-x-auto border-b border-linea bg-avena/95 whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
  >
    <div className="mx-auto flex w-max min-w-full justify-center gap-0.5 px-5 sm:px-8">
      {TABS.map((tab) => (
        <a
          key={tab.href}
          href={tab.href}
          className="inline-flex min-h-12 shrink-0 items-center border-b-[3px] border-transparent px-4 text-[13px] font-bold tracking-[0.08em] text-texto-suave uppercase outline-none hover:border-lavanda hover:text-azul focus-visible:ring-3 focus-visible:ring-lavanda"
        >
          {tab.label}
        </a>
      ))}
    </div>
  </nav>
);
