import React from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Mail, Phone, Calendar, CheckSquare } from 'lucide-react';

const mockHistorico = [
  { id: 1, tipo: 'ligacao', data: '15/10/2023 14:30', desc: 'Ligação de apresentação inicial realizada. Cliente demonstrou interesse.' },
  { id: 2, tipo: 'email', data: '16/10/2023 09:15', desc: 'Enviado e-mail com apresentação comercial em PDF.' },
  { id: 3, tipo: 'reuniao', data: '20/10/2023 10:00', desc: 'Reunião de alinhamento técnico.' },
  { id: 4, tipo: 'tarefa', data: '22/10/2023 16:45', desc: 'Criado cadastro completo no CRM.' },
];

const getIcon = (tipo: string) => {
  switch (tipo) {
    case 'ligacao': return <Phone size={16} className="text-success" />;
    case 'email': return <Mail size={16} className="text-secondary" />;
    case 'reuniao': return <Calendar size={16} className="text-primary" />;
    default: return <CheckSquare size={16} className="text-accent" />;
  }
};

const ContatoHistorico = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Histórico de Interações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative border-l border-slate-700 ml-4 space-y-6 pb-4">
          {mockHistorico.map((item) => (
            <div key={item.id} className="relative pl-6">
              <div className="absolute -left-4 top-0 h-8 w-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                {getIcon(item.tipo)}
              </div>
              <div className="space-y-1 pt-1">
                <span className="text-xs font-medium text-slate-500">{item.data}</span>
                <p className="text-sm text-slate-300">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContatoHistorico;
