import logoCanela from '@/assets/logo_canela.svg';
import { HAY_MENU } from '@/data/menu';
import { ConsultaProvider } from '../consulta/ConsultaContext';
import { ConsultaBar } from '../components/layout/ConsultaBar';
import { ContactFooter } from '../components/layout/ContactFooter';
import { SectionTabs } from '../components/layout/SectionTabs';
import { AboutSection } from '../components/sections/AboutSection';
import { Hero } from '../components/sections/Hero';
import { MenuSection } from '../components/sections/MenuSection';
import { WorksSection } from '../components/sections/WorksSection';

export const HomeView = () => (
  <ConsultaProvider>
    <header id="inicio" className="flex flex-col items-center gap-2 px-5 pt-6 pb-4 sm:px-8">
      <img src={logoCanela} alt="Canela" width={702} height={175.5} className="h-11 w-auto sm:h-14" />
      <p className="font-hand text-[22px] leading-[26px] tracking-[0.06em] text-lila-deep uppercase">
        Artesanal · Calidad · Delicado
      </p>
    </header>
    <SectionTabs />
    <main>
      <Hero />
      {HAY_MENU && <MenuSection />}
      <WorksSection />
      <AboutSection />
    </main>
    <ContactFooter />
    <ConsultaBar />
  </ConsultaProvider>
);
