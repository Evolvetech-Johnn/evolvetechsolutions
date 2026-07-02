import React, { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  description?: string;
  onClose?: () => void;
}

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = 'info', title, description, onClose, ...props }, ref) => {
    const icons = {
      success: <CheckCircle className="text-success" size={20} />,
      error: <XCircle className="text-error" size={20} />,
      warning: <AlertCircle className="text-warning" size={20} />,
      info: <Info className="text-primary" size={20} />,
    };

    const borders = {
      success: 'border-success/30',
      error: 'border-error/30',
      warning: 'border-warning/30',
      info: 'border-primary/30',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-start gap-3 w-full max-w-sm bg-slate-800 border p-4 rounded-lg shadow-xl',
          borders[variant],
          className
        )}
        {...props}
      >
        <div className="flex-shrink-0 mt-0.5">{icons[variant]}</div>
        <div className="flex-1 flex flex-col gap-1">
          {title && <h4 className="text-sm font-semibold text-slate-100">{title}</h4>}
          {description && <p className="text-sm text-slate-400">{description}</p>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';
export default Toast;
