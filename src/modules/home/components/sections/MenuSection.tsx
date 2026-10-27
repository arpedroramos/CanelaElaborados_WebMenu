import { useState } from 'react';
import { buttonClass } from '@/components/ui/button';
import { MENU as CATEGORIES } from '@/data/menu';
import type { MenuCategory } from '@/data/menu_types';
import { buildOrderUrl } from '@/lib/whatsapp';
import { MenuCard } from '../menu/MenuCard';
import { ALL_ID, MenuTabs } from '../menu/MenuTabs';

const CategoryBlock = ({ category, showDivider }: { category: MenuCategory; showDivider: boolean }) => (
  <div className={showDivider ? 'mb-12 last:mb-0' : undefined}>
    <div className="mb-5 text-center">
      <h3 className="font-title text-[30px] leading-[36px] font-bold text-azul">{category.title}</h3>
      <p className="text-sm text-texto-suave">
        {category.note}
        {category.priceNote && (
          <>
            {' '}
            <span className="font-bold text-lila-deep">{category.priceNote}</span>
          </>
        )}
      </p>
    </div>
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {category.items.map((item) => (
        <div key={item.title} className="w-full sm:w-[calc((100%-2rem)/3)]">
          <MenuCard item={item} />
        </div>
      ))}
    </div>
    {category.footerCta && (
      <div className="mt-6 flex justify-center">
        <a
          className={buttonClass({ variant: 'azul', size: 'pill' })}
          href={buildOrderUrl(category.footerCta.order ?? category.title)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {category.footerCta.label}
        </a>
      </div>
    )}
  </div>
);

export const MenuSection = () => {
  const [activeId, setActiveId] = useState(ALL_ID);
  const isAll = activeId === ALL_ID;
  const category = CATEGORIES.find((item) => item.id === activeId);
  const visible = isAll || !category ? CATEGORIES : [category];

  return (
    <section id="menu" className="bg-crema py-14">
      <div className="mx-auto max-w-wrap px-5 sm:px-8">
        <MenuTabs categories={CATEGORIES} activeId={activeId} onChange={setActiveId} />
        <div
          role="tabpanel"
          id={`panel-${category?.id ?? ALL_ID}`}
          aria-labelledby={`tab-${category?.id ?? ALL_ID}`}
          tabIndex={0}
          className="outline-none focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-lavanda"
        >
          {visible.map((item) => (
            <CategoryBlock key={item.id} category={item} showDivider={visible.length > 1} />
          ))}
        </div>
      </div>
    </section>
  );
};
