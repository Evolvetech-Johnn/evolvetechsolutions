import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const checkboxId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : Math.random().toString());

    return (
      <div className="flex items-start gap-3">
        <div className="flex h-6 items-center">
          <input
            id={checkboxId}
            type="checkbox"
            ref={ref}
            className={cn(
              'h-4 w-4 rounded border-slate-700 bg-slate-900/50 text-primary focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors',
              'checked:bg-primary checked:border-primary',
              className
            )}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label htmlFor={checkboxId} className="text-sm font-medium text-slate-200 cursor-pointer select-none">
                {label}
              </label>
            )}
            {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
