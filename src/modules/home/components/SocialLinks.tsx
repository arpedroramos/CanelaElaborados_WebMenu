import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

const InstagramIcon: React.FC<{ size?: number; strokeWidth?: number }> = ({ size = 30, strokeWidth = 1.5 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const SocialLinks: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      className="flex items-center justify-center gap-6 mt-4 text-[#ede4da]"
    >
      <a 
        href="https://wa.me/message/JYR2EYWPLX7ME1" 
        target="_blank" 
        rel="noopener noreferrer"
        className="opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle size={30} strokeWidth={1.5} />
      </a>
      
      <span className="opacity-40 font-light text-2xl mb-1">|</span>

      <a 
        href="https://www.instagram.com/canelaelaborados/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-110"
        aria-label="Instagram"
      >
        <InstagramIcon size={30} strokeWidth={1.5} />
      </a>
    </motion.div>
  );
};
