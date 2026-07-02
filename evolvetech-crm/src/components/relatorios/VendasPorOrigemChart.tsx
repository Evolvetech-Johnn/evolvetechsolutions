import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';

const data = [
  { name: 'Site / Orgânico', value: 45 },
  { name: 'Indicação', value: 25 },
  { name: 'LinkedIn', value: 20 },
  { name: 'Eventos', value: 10 },
];

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];

const VendasPorOrigemChart = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Leads por Origem</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                stroke="transparent"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendasPorOrigemChart;
