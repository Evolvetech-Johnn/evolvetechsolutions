import React from 'react';
import Card, { CardContent } from '../ui/Card';
import { cn } from '@/utils/cn';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon, trend, className }) => {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-white">{value}</h3>
              {trend && (
                <span className={cn(
                  'text-xs font-medium px-2 py-0.5 rounded-full',
                  trend.isPositive ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
                )}>
                  {trend.isPositive ? '+' : '-'}{trend.value}%
                </span>
              )}
            </div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
