import React from 'react';

interface ProductItemProps {
  title: string;
  description: string;
  price?: string | number;
  imgSrc?: string;
}

const isPriceZero = (val?: string | number): boolean => {
  if (val === undefined || val === null || val === '') return true;
  if (typeof val === 'number') return val === 0;
  // Remove currency symbols, spaces and dots/commas to check if it represents a zero value
  const clean = val.toString().replace(/[^0-9]/g, '');
  return clean === '0' || clean === '00' || clean === '';
};

export const ProductItem: React.FC<ProductItemProps> = ({ title, description, price, imgSrc }) => {
  const showPrice = !isPriceZero(price);

  return (
    <>
      {/* Mobile Card Layout (< md): Horizontal, compact */}
      <div className="flex gap-4 p-4 border border-outline-variant rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors md:hidden">
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-title text-title-lg text-primary font-bold mb-1">{title}</h3>
            <p className="font-body-1 text-body-sm text-primary mb-3">{description}</p>
          </div>
          {showPrice && <div className="font-price-tag text-price-tag text-primary">{price}</div>}
        </div>
        {imgSrc && imgSrc.trim() !== '' && (
          <div className="w-24 h-24 shrink-0 rounded border border-outline-variant/50 overflow-hidden bg-surface-container flex items-center justify-center">
            <img className="w-full h-full object-cover" src={imgSrc} alt={title} />
          </div>
        )}
      </div>

      {/* Desktop Card Layout (>= md): Grid card layout */}
      <article className="hidden md:flex group border border-outline hover:border-primary transition-colors bg-surface-container-lowest p-stack-sm flex-col h-full relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-grow pr-4">
            <h3 className="font-title text-title-lg text-primary font-bold mb-2">{title}</h3>
            <p className="font-body-1 text-body-sm text-primary line-clamp-3">{description}</p>
          </div>
          {imgSrc && imgSrc.trim() !== '' && (
            <div className="w-24 h-24 shrink-0 border border-outline-variant relative overflow-hidden bg-surface-variant flex items-center justify-center">
              <img className="w-full h-full object-cover" src={imgSrc} alt={title} />
            </div>
          )}
        </div>
        {showPrice && (
          <div className="mt-auto pt-2 border-t border-outline-variant flex justify-between items-center">
            <span className="font-price-tag text-price-tag text-primary">{price}</span>
          </div>
        )}
      </article>
    </>
  );
};

