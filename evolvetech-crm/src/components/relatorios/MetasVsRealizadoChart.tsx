import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';

const data = [
  { name: 'Jan', meta: 40, real: 24 },
  { name: 'Fev', meta: 45, real: 38 },
  { name: 'Mar', meta: 45, real: 48 },
  { name: 'Abr', meta: 50, real: 42 },
  { name: 'Mai', meta: 50, real: 55 },
  { name: 'Jun', meta: 55, real: 62 },
];

const MetasVsRealizadoChart = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Metas vs Realizado (Vendas)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#334155', opacity: 0.4 }}
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
              <Bar dataKey="meta" name="Meta" fill="#475569" radius={[4, 4, 0, 0]} />
              <Bar dataKey="real" name="Realizado" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetasVsRealizadoChart;
