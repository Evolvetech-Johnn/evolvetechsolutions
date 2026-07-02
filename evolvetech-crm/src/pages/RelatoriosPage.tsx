import React, { useState } from 'react';
import VendasPorOrigemChart from '../components/relatorios/VendasPorOrigemChart';
import MetasVsRealizadoChart from '../components/relatorios/MetasVsRealizadoChart';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import { Download, FileText, FileSpreadsheet, Filter } from 'lucide-react';
import Select from '../components/ui/Select';
import EvolucaoMensalChart from '../components/dashboard/EvolucaoMensalChart';

const RelatoriosPage = () => {
  const [periodo, setPeriodo] = useState('ultimos-6-meses');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = (tipo: 'pdf' | 'excel') => {
    setIsExporting(true);
    // Simula o tempo de geração do relatório
    setTimeout(() => {
      setIsExporting(false);
      alert(`Relatório em ${tipo.toUpperCase()} gerado com sucesso! (Simulação)`);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white">Relatórios e BI</h1>
          <p className="text-slate-400">Analise o desempenho de vendas e exporte dados.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Select
            options={[
              { value: 'este-mes', label: 'Este Mês' },
              { value: 'ultimos-3-meses', label: 'Últimos 3 Meses' },
              { value: 'ultimos-6-meses', label: 'Últimos 6 Meses' },
              { value: 'este-ano', label: 'Este Ano' },
            ]}
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="w-40 bg-slate-900 border-slate-700"
          />
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            Filtros
          </Button>
          <div className="flex gap-2 bg-slate-900 border border-slate-800 p-1 rounded-lg">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
              className="text-slate-400 hover:text-white"
            >
              <FileText size={16} className="mr-1.5" /> PDF
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleExport('excel')}
              disabled={isExporting}
              className="text-slate-400 hover:text-white"
            >
              <FileSpreadsheet size={16} className="mr-1.5" /> Excel
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EvolucaoMensalChart />
        <MetasVsRealizadoChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <VendasPorOrigemChart />
        </div>
        
        <div className="lg:col-span-2">
          <Card className="h-full">
             <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                <h3 className="font-semibold text-white">Top Vendedores</h3>
             </div>
             <CardContent className="p-0">
               <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                   <thead className="text-xs text-slate-400 bg-slate-900/50 uppercase border-b border-slate-800">
                     <tr>
                       <th className="px-6 py-3 font-medium">Vendedor</th>
                       <th className="px-6 py-3 font-medium">Leads Convertidos</th>
                       <th className="px-6 py-3 font-medium">Receita Gerada</th>
                       <th className="px-6 py-3 font-medium">Taxa de Conversão</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-800/50">
                     <tr className="hover:bg-slate-800/30">
                       <td className="px-6 py-4 font-medium text-slate-200">Carlos Vendedor</td>
                       <td className="px-6 py-4">45</td>
                       <td className="px-6 py-4 text-success">R$ 150.000</td>
                       <td className="px-6 py-4">32%</td>
                     </tr>
                     <tr className="hover:bg-slate-800/30">
                       <td className="px-6 py-4 font-medium text-slate-200">Marina Vendas</td>
                       <td className="px-6 py-4">38</td>
                       <td className="px-6 py-4 text-success">R$ 125.500</td>
                       <td className="px-6 py-4">28%</td>
                     </tr>
                     <tr className="hover:bg-slate-800/30">
                       <td className="px-6 py-4 font-medium text-slate-200">Admin User</td>
                       <td className="px-6 py-4">12</td>
                       <td className="px-6 py-4 text-success">R$ 45.000</td>
                       <td className="px-6 py-4">15%</td>
                     </tr>
                   </tbody>
                 </table>
               </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RelatoriosPage;
