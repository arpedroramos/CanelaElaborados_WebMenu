import React from 'react';

interface CategorySelectorProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORIES = [
  { id: 'alfajores', label: 'Alfajores', icon: 'cookie' },
  { id: 'tortas-y-tartas', label: 'Tortas y Tartas', icon: 'cake' },
  { id: 'tortas-personalizadas', label: 'Tortas personalizadas', icon: 'celebration' },
  { id: 'budines', label: 'Budines', icon: 'breakfast_dining' },
  { id: 'saladito', label: 'Saladito', icon: 'lunch_dining' },
  { id: 'panaderia', label: 'Panadería', icon: 'bakery_dining' },
  { id: 'galletitas', label: 'Galletitas', icon: 'cookie' }
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <nav className="w-full bg-surface/95 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-10">
      <div className="w-full md:max-w-[85%] mx-auto px-margin-mobile md:px-margin-desktop overflow-x-auto no-scrollbar">
        <ul className="flex gap-gutter md:gap-stack-md py-3 md:py-4 w-max md:w-full md:justify-center">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <li key={cat.id} className="shrink-0">
                {/* Mobile Button */}
                <button
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex flex-col items-center gap-1 group md:hidden cursor-pointer transition-opacity ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 ${
                      isActive
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-high text-on-surface border border-outline-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined">{cat.icon}</span>
                  </div>
                  <span className={`font-label-caps text-label-caps ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
                    {cat.label}
                  </span>
                </button>
                {/* Desktop Button */}
                <button
                  onClick={() => onSelectCategory(cat.id)}
                  className={`hidden md:flex flex-col items-center gap-2 group cursor-pointer transition-colors ${
                    isActive
                      ? 'text-primary border-b-2 border-primary pb-2 px-2'
                      : 'text-secondary hover:text-primary pb-2 px-2'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
                  <span className="font-label-caps text-label-caps">{cat.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
