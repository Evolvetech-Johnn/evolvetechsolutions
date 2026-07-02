import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Lead } from '../../types/lead';
import { DollarSign, Clock } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { cn } from '@/utils/cn';

interface LeadCardProps {
  lead: Lead;
  isDragging?: boolean;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, isDragging }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: lead.id, data: { type: 'Lead', lead } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(lead.valorEstimado);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'bg-slate-800 border border-slate-700 rounded-lg p-4 cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors',
        isDragging && 'opacity-50 border-primary shadow-lg ring-2 ring-primary/20'
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-white text-sm leading-tight">{lead.nome}</h4>
        <Badge variant="outline" className="text-[10px] py-0">{lead.origem}</Badge>
      </div>
      <p className="text-xs text-slate-400 mb-4">{lead.empresa}</p>
      
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-700/50">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
          <DollarSign size={14} className="text-success" />
          {formattedValue}
        </div>
        <Avatar initials={lead.responsavelId.replace('u-', 'U')} size="sm" />
      </div>
    </div>
  );
};

export default LeadCard;
