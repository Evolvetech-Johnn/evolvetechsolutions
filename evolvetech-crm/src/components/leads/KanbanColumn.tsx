import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Lead, LeadStatus } from '../../types/lead';
import LeadCard from './LeadCard';
import { cn } from '@/utils/cn';

interface KanbanColumnProps {
  id: LeadStatus;
  title: string;
  leads: Lead[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ id, title, leads }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
    data: {
      type: 'Column',
      columnId: id,
    }
  });

  return (
    <div className="flex flex-col flex-shrink-0 w-80 bg-slate-900/50 rounded-xl border border-slate-800 h-full overflow-hidden">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900 sticky top-0 z-10">
        <h3 className="font-semibold text-slate-200">{title}</h3>
        <span className="bg-slate-800 text-slate-400 text-xs font-medium px-2 py-1 rounded-md">
          {leads.length}
        </span>
      </div>
      
      <div 
        ref={setNodeRef}
        className={cn(
          "flex-1 p-3 overflow-y-auto space-y-3 transition-colors",
          isOver && "bg-slate-800/30"
        )}
      >
        <SortableContext items={leads.map(l => l.id)} strategy={verticalListSortingStrategy}>
          {leads.map(lead => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </SortableContext>
        
        {/* Helper text when empty */}
        {leads.length === 0 && (
          <div className="h-24 border-2 border-dashed border-slate-800 rounded-lg flex items-center justify-center text-sm text-slate-500">
            Arraste leads para cá
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
