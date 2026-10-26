import { HAY_MENU } from '@/data/menu';
import { ContactFooter } from '../components/layout/ContactFooter';
import { SectionTabs } from '../components/layout/SectionTabs';
import { TopBar } from '../components/layout/TopBar';
import { AboutSection } from '../components/sections/AboutSection';
import { Hero } from '../components/sections/Hero';
import { MenuSection } from '../components/sections/MenuSection';
import { WorksSection } from '../components/sections/WorksSection';

export const HomeView = () => (
  <>
    <TopBar />
    <SectionTabs />
    <main>
      <Hero />
      {HAY_MENU && <MenuSection />}
      <WorksSection />
      <AboutSection />
    </main>
    <ContactFooter />
  </>
);
