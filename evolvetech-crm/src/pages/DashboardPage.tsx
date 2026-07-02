import React from 'react';
import KpiCard from '../components/dashboard/KpiCard';
import FunilChart from '../components/dashboard/FunilChart';
import EvolucaoMensalChart from '../components/dashboard/EvolucaoMensalChart';
import AtividadesRecentes from '../components/dashboard/AtividadesRecentes';
import { useAuth } from '../hooks/useAuth';
import { Users, DollarSign, Target, CheckSquare } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400">Bem-vindo de volta, {user?.nome.split(' ')[0]}. Aqui está o resumo das suas vendas.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Leads Ativos"
          value="123"
          icon={<Users size={24} />}
          trend={{ value: 12, isPositive: true }}
        />
        <KpiCard
          title="Receita Prevista"
          value="R$ 45.2K"
          icon={<DollarSign size={24} />}
          trend={{ value: 8, isPositive: true }}
        />
        <KpiCard
          title="Taxa de Conversão"
          value="18.5%"
          icon={<Target size={24} />}
          trend={{ value: 2.1, isPositive: false }}
        />
        <KpiCard
          title="Tarefas de Hoje"
          value="8"
          icon={<CheckSquare size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EvolucaoMensalChart />
        </div>
        <div className="lg:col-span-1">
          <FunilChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AtividadesRecentes />
        {/* Espaço para outro componente futuro, como Ranking de Vendedores */}
      </div>
    </div>
  );
};

export default DashboardPage;
