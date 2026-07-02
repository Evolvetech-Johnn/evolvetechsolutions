import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserSquare2, CheckSquare, BarChart3, Settings, Palette, X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Leads', path: '/leads', icon: <Users size={20} /> },
    { name: 'Contatos', path: '/contatos', icon: <UserSquare2 size={20} /> },
    { name: 'Tarefas', path: '/tarefas', icon: <CheckSquare size={20} /> },
    { name: 'Relatórios', path: '/relatorios', icon: <BarChart3 size={20} /> },
    { name: 'Configurações', path: '/configuracoes', icon: <Settings size={20} /> },
    { name: 'Styleguide', path: '/styleguide', icon: <Palette size={20} /> },
  ];

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full transform transition-transform duration-300 ease-in-out lg:transform-none lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
          <h1 className="text-xl font-bold text-white tracking-tight">
            Evolve<span className="text-primary">CRM</span>
          </h1>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => onClose()}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary hover:bg-primary/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                )
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-800 shrink-0">
          <div className="text-xs text-slate-500 text-center">
            &copy; 2024 EvolveTech
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
