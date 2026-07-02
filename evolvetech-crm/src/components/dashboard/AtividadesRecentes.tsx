import React from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import { Phone, Mail, Calendar, CheckSquare } from 'lucide-react';

const atividades = [
  {
    id: 1,
    tipo: 'reuniao',
    titulo: 'Reunião com TechCorp',
    data: 'Hoje, 14:30',
    status: 'pendente',
  },
  {
    id: 2,
    tipo: 'email',
    titulo: 'Enviar proposta Comercial SoftSys',
    data: 'Hoje, 16:00',
    status: 'pendente',
  },
  {
    id: 3,
    tipo: 'ligacao',
    titulo: 'Follow-up com João Silva',
    data: 'Ontem',
    status: 'concluido',
  },
  {
    id: 4,
    tipo: 'tarefa',
    titulo: 'Atualizar CRM com dados do cliente',
    data: 'Ontem',
    status: 'concluido',
  },
];

const getIcon = (tipo: string) => {
  switch (tipo) {
    case 'reuniao': return <Calendar size={16} className="text-primary" />;
    case 'email': return <Mail size={16} className="text-secondary" />;
    case 'ligacao': return <Phone size={16} className="text-success" />;
    default: return <CheckSquare size={16} className="text-accent" />;
  }
};

const AtividadesRecentes = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividades Recentes & Próximas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {atividades.map((ativ) => (
            <div key={ativ.id} className="flex gap-4">
              <div className="mt-1 h-8 w-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                {getIcon(ativ.tipo)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-200">{ativ.titulo}</p>
                  <span className="text-xs text-slate-500">{ativ.data}</span>
                </div>
                <div>
                  <Badge variant={ativ.status === 'concluido' ? 'success' : 'warning'}>
                    {ativ.status === 'concluido' ? 'Concluída' : 'Pendente'}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AtividadesRecentes;
