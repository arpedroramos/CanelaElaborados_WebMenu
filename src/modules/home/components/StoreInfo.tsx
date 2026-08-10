import React from 'react';

export const StoreInfo: React.FC = () => {
  return (
    <section className="py-stack-md px-margin-mobile border-b border-outline-variant/30 bg-surface-container-lowest">
      <div className="grid grid-cols-2 gap-stack-sm text-on-surface-variant font-body-sm text-body-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">location_on</span>
          <span>Avenida Arturo Illia 2180</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">schedule</span>
          <span>8:30 a 23:00</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">phone</span>
          <span>3541609556</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">mail</span>
          <span>info@canelaelaborados.com</span>
        </div>
      </div>
    </section>
  );
};
