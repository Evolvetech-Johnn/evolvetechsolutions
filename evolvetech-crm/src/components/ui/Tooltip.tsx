import React, { HTMLAttributes, forwardRef, useState } from 'react';
import { cn } from '@/utils/cn';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content: string | React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, content, position = 'top', children, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const positions = {
      top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
      bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
      left: 'right-full mr-2 top-1/2 -translate-y-1/2',
      right: 'left-full ml-2 top-1/2 -translate-y-1/2',
    };

    return (
      <div 
        className="relative inline-flex" 
        onMouseEnter={() => setIsVisible(true)} 
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
        {isVisible && (
          <div
            ref={ref}
            className={cn(
              'absolute z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-slate-700 rounded-md shadow-lg whitespace-nowrap',
              positions[position],
              className
            )}
            {...props}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
export default Tooltip;
