import React, { useState } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Lead, LeadStatus } from '../../types/lead';
import KanbanColumn from './KanbanColumn';
import LeadCard from './LeadCard';

const COLUMNS: { id: LeadStatus; title: string }[] = [
  { id: 'Novo', title: 'Novo' },
  { id: 'Qualificado', title: 'Qualificado' },
  { id: 'Proposta', title: 'Proposta' },
  { id: 'Negociação', title: 'Negociação' },
  { id: 'Ganho', title: 'Ganho' },
  { id: 'Perdido', title: 'Perdido' },
];

interface KanbanBoardProps {
  leads: Lead[];
  onLeadMove: (leadId: string, newStatus: LeadStatus) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ leads, onLeadMove }) => {
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current?.type === 'Lead') {
      setActiveLead(active.data.current.lead);
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    // Para simplificar a demo, lidaremos apenas com onDragEnd para mover de coluna.
    // Reordenação na mesma coluna não é o foco principal agora.
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveLead(null);
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isOverAColumn = over.data.current?.type === 'Column';
    const isOverALead = over.data.current?.type === 'Lead';

    const activeLeadData = active.data.current?.lead as Lead;

    if (!activeLeadData) return;

    let targetStatus: LeadStatus | null = null;

    if (isOverAColumn) {
      targetStatus = over.data.current?.columnId as LeadStatus;
    } else if (isOverALead) {
      targetStatus = over.data.current?.lead.status as LeadStatus;
    }

    if (targetStatus && targetStatus !== activeLeadData.status) {
      onLeadMove(activeLeadData.id, targetStatus);
    }
  };

  return (
    <div className="flex h-full w-full overflow-x-auto overflow-y-hidden pb-4 gap-6 scrollbar-thin">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            leads={leads.filter((l) => l.status === col.id)}
          />
        ))}
        <DragOverlay>
          {activeLead ? <LeadCard lead={activeLead} isDragging /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
