import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { useAuth } from '../../hooks/useAuth';

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  
  return (
    <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onMenuClick} className="lg:hidden text-slate-400 hover:text-white">
          <Menu size={24} />
        </button>
        <div className="flex-1 max-w-md relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Buscar no CRM..."
            className="w-full bg-slate-800 border-none rounded-full pl-10 pr-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        {/* Busca no mobile (ícone apenas) */}
        <button className="sm:hidden relative p-2 text-slate-400 hover:text-slate-200 transition-colors">
          <Search size={20} />
        </button>

        <button className="relative p-2 text-slate-400 hover:text-slate-200 transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-slate-900"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-slate-800">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-medium text-slate-200 leading-tight">{user?.nome || 'Admin User'}</span>
            <span className="text-xs text-slate-500 capitalize">{user?.role === 'admin' ? 'Administrador' : 'Vendedor'}</span>
          </div>
          <Avatar initials={user?.nome?.substring(0, 2).toUpperCase() || 'AD'} className="bg-primary/20 text-primary border-primary/30" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
