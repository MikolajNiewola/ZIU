import { useRef } from "react";
import type { ReactNode } from "react";
import { FocusTrap } from "./FocusTrap";

interface ModalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  hideFooter?: boolean;
}

export default function ModalDialog({ isOpen, onClose, title, children, hideFooter }: ModalDialogProps) {
  const triggerRef = useRef<HTMLElement>(null);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      aria-hidden="true"
    >
      <FocusTrap onEscape={onClose} triggerRef={triggerRef}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="bg-white rounded-xl shadow-2xl p-6 mx-4 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="flex items-center justify-between mb-4">
            <p id="modal-title" className="text-lg font-bold text-gray-900 m-0">
              {title}
            </p>
            <button
              onClick={onClose}
              aria-label="Zamknij okno dialogowe"
              className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </header>
          <div>{children}</div>
          {!hideFooter && (
          <footer className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
            >
              Zamknij
            </button>
          </footer>
          )}
        </div>
      </FocusTrap>
    </div>
  );
}
