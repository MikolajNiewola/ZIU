import type { Variants } from 'framer-motion';

export function createPageVariants(shouldReduce: boolean): Variants {
  return {
    initial: { opacity: 0, x: shouldReduce ? 0 : -16 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.28, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      x: shouldReduce ? 0 : 16,
      transition: { duration: 0.18, ease: 'easeIn' },
    },
  };
}

export function createContainerVariants(shouldReduce: boolean): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.08,
        delayChildren: shouldReduce ? 0 : 0.1,
      },
    },
  };
}

export function createItemVariants(shouldReduce: boolean): Variants {
  return {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduce ? 0.15 : 0.25 },
    },
  };
}

export const toastVariants: Variants = {
  initial: { opacity: 0, x: 48, scale: 0.9 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  exit: {
    opacity: 0,
    x: 48,
    scale: 0.85,
    transition: { duration: 0.18 },
  },
};
