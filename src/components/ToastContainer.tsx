import { AnimatePresence, motion } from 'framer-motion';
import { toastVariants } from '../animations/variants';
import type { Toast } from '../hooks/useToast';

interface Props {
  toasts: Toast[];
}

export function ToastContainer({ toasts }: Props) {
  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            className="toast-item"
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
