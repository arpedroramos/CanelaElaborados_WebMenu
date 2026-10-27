import type { KeyboardEvent } from 'react';
import type { MenuCategory } from '@/data/menu_types';

export const ALL_ID = 'todo';

interface MenuTabsProps {
  categories: Pick<MenuCategory, 'id' | 'label'>[];
  activeId: string;
  onChange: (id: string) => void;
}

export const MenuTabs = ({ categories: base, activeId, onChange }: MenuTabsProps) => {
  const categories = [{ id: ALL_ID, label: 'Todo el menú' }, ...base];
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = categories[(index + step + categories.length) % categories.length];
    onChange(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Categorías del menú"
      className="sticky top-12 z-20 -mx-5 mb-4 flex gap-2 overflow-x-auto bg-crema/95 px-5 py-2 [scrollbar-width:none] sm:static sm:mx-0 sm:mb-6 sm:flex-wrap sm:justify-center sm:overflow-visible sm:bg-transparent sm:px-0 sm:py-0 [&::-webkit-scrollbar]:hidden"
    >
      {categories.map((category, index) => {
        const isActive = category.id === activeId;
        return (
          <button
            key={category.id}
            id={`tab-${category.id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${category.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(category.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`flex min-h-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-[1.5px] px-4 text-[13px] sm:px-5 font-bold tracking-[0.1em] uppercase outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-lavanda ${
              isActive
                ? 'border-azul bg-azul text-crema'
                : 'border-linea bg-crema text-texto-suave hover:border-azul'
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
};
