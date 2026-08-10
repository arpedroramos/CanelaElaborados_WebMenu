import React from 'react';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-surface-container-lowest border-b-2 border-primary">
      <div className="w-full md:max-w-[85%] mx-auto px-margin-mobile md:px-margin-desktop py-stack-md">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          {/* Logo Canela */}
          <Logo />

          {/* Social and Contact Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-2">
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors font-body-2"
            >
              <span className="material-symbols-outlined text-[20px] text-canela-detail1">photo_camera</span>
              <span>Instagram</span>
            </a>
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors font-body-2"
            >
              <span className="material-symbols-outlined text-[20px] text-canela-green">chat</span>
              <span>WhatsApp</span>
            </a>
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors font-body-2"
            >
              <span className="material-symbols-outlined text-[20px] text-canela-detail2">location_on</span>
              <span>Avenida Arturo Illia 2180</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
