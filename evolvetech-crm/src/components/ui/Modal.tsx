import React, { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { X } from 'lucide-react';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ className, isOpen, onClose, title, size = 'md', children, ...props }, ref) => {
    if (!isOpen) return null;

    const sizes = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
        <div
          ref={ref}
          className={cn(
            'w-full rounded-xl bg-slate-800 border border-slate-700 shadow-2xl flex flex-col',
            sizes[size],
            className
          )}
          {...props}
        >
          {title && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-slate-700"
              >
                <X size={20} />
              </button>
            </div>
          )}
          <div className="p-6 overflow-y-auto max-h-[80vh]">{children}</div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';
export default Modal;
