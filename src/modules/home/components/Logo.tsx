import React from 'react';
import { motion } from 'motion/react';
import { LogoCanela } from './LogoCanela';

export const Logo: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex justify-center items-center w-full mb-4 text-canela-logo"
    >
      <LogoCanela
        className="w-[40%] min-w-[220px] max-w-[500px] h-auto drop-shadow-sm"
        aria-label="Canela Text"
      />
    </motion.div>
  );
};

