import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Flame,
  Bot,
  BarChart3,
  Wallet,
  Menu,
  X,
  Globe2,
  Link2,
  Sparkles,
  Send,
  Target,
  ShoppingBag,
  ShieldCheck,
  HelpCircle,
  Settings,
  ShieldAlert
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentView, setCurrentView, automation } = useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const primaryItems = [
    { id: 'dashboard', label: 'Início', icon: LayoutDashboard },
    { id: 'trending_products', label: 'Produtos', icon: Flame },
    { id: 'automation', label: 'Automação', icon: Bot, isSpecial: true },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'wallet', label: 'Carteira', icon: Wallet },
  ];

  const moreItems = [
    { id: 'markets', label: 'Mercados & Cidades', icon: Globe2 },
    { id: 'platforms', label: 'Plataformas & Integrações', icon: Link2 },
    { id: 'ai_marketing', label: 'AndMoney AI (Marketing)', icon: Sparkles },
    { id: 'campaigns', label: 'Campanhas', icon: Send },
    { id: 'goals', label: 'Metas Financeiras', icon: Target },
    { id: 'sales', label: 'Vendas & Pedidos Reais', icon: ShoppingBag },
    { id: 'antifraud', label: 'Anti-Fraude & Logs', icon: ShieldCheck },
    { id: 'support', label: 'Central de Ajuda & FAQ', icon: HelpCircle },
    { id: 'profile', label: 'Perfil & Configurações', icon: Settings },
    { id: 'admin', label: 'Painel Administrativo', icon: ShieldAlert },
  ];

  return (
    <>
      {/* Drawer overlay for additional menu items */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden animate-in fade-in" onClick={() => setDrawerOpen(false)}>
          <div
            className="fixed inset-x-0 bottom-16 max-h-[75vh] overflow-y-auto rounded-t-2xl border-t border-slate-800 bg-slate-900 p-4 shadow-2xl animate-in slide-in-from-bottom"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-display font-bold text-sm text-slate-200">Mais Recursos do Hub</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              {moreItems.map(item => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setDrawerOpen(false);
                    }}
                    className={`flex items-center gap-2.5 rounded-xl p-2.5 text-left text-xs transition-all ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                        : 'bg-slate-850/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800/60'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main bottom navigation bar */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-center justify-around border-t border-slate-800/80 bg-slate-950/95 px-2 backdrop-blur-lg lg:hidden">
        {primaryItems.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          if (item.isSpecial) {
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className="relative flex flex-col items-center justify-center -top-3 focus:outline-none"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform active:scale-95 ${
                  automation.isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30 ring-4 ring-slate-950'
                    : 'bg-slate-800 text-emerald-400 border border-emerald-500/30 ring-4 ring-slate-950'
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className={`text-[10px] font-bold mt-1 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-1 flex-col items-center justify-center py-1 text-center transition-colors ${
                isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="h-5 w-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}

        {/* More button */}
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className={`flex flex-1 flex-col items-center justify-center py-1 text-center transition-colors ${
            drawerOpen ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Menu className="h-5 w-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Mais</span>
        </button>
      </nav>
    </>
  );
};
