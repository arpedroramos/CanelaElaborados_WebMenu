import React, { useState } from 'react';
import { Header } from '../components/Header';
import { CategorySelector } from '../components/CategorySelector';
import { ProductItem } from '../components/ProductItem';

// Import local product data files
import alfajores from '../../../../src/data/alfajores';
import tortasYTartas from '../../../../src/data/tortas_y_tartas';
import tortasPersonalizadas from '../../../../src/data/tortas_personalizadas';
import budines from '../../../../src/data/budines';
import saladito from '../../../../src/data/saladito';
import panaderia from '../../../../src/data/panaderia';
import galletitas from '../../../../src/data/galletitas';

const getProductsForCategory = (category: string) => {
  switch (category) {
    case 'alfajores':
      return alfajores;
    case 'tortas-y-tartas':
      return tortasYTartas;
    case 'tortas-personalizadas':
      return tortasPersonalizadas;
    case 'budines':
      return budines;
    case 'saladito':
      return saladito;
    case 'panaderia':
      return panaderia;
    case 'galletitas':
      return galletitas;
    default:
      return [];
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'alfajores':
      return 'Alfajores';
    case 'tortas-y-tartas':
      return 'Tortas y Tartas';
    case 'tortas-personalizadas':
      return 'Tortas personalizadas';
    case 'budines':
      return 'Budines';
    case 'saladito':
      return 'Saladito';
    case 'panaderia':
      return 'Panadería';
    case 'galletitas':
      return 'Galletitas';
    default:
      return '';
  }
};

export const HomeView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('alfajores');
  const products = getProductsForCategory(activeCategory);

  return (
    <div className="w-full bg-surface min-h-screen relative flex flex-col">
      {/* Header (Logo, Brand, Store Info) */}
      <Header />

      {/* Category Selector (Sticky Navigation) */}
      <CategorySelector activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

      {/* Main Content: Adaptive grid of products */}
      <main className="flex-grow w-full md:max-w-[85%] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <section className="mb-stack-lg">
          <h2 className="font-headline-md text-headline-md text-primary mb-stack-md border-b border-outline-variant pb-2">
            {getCategoryLabel(activeCategory)}
          </h2>

          {products.length === 0 ? (
            <p className="font-body-1 text-secondary text-center py-8">
              No hay productos cargados en esta categoría aún.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {products.map((product, idx) => (
                <ProductItem
                  key={`${product.title}-${idx}`}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  imgSrc={product.imgSrc}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
