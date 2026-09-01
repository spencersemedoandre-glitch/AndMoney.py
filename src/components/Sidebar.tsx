import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Globe2,
  Flame,
  Link2,
  Bot,
  Sparkles,
  Send,
  Target,
  ShoppingBag,
  Wallet,
  BarChart3,
  ShieldCheck,
  HelpCircle,
  Settings,
  ShieldAlert,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, automation, isAdmin, products, orders, campaigns } = useApp();

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: undefined },
    { id: 'markets', label: 'Mercados', icon: Globe2, badge: '6 Países' },
    { id: 'trending_products', label: 'Produtos em Tendência', icon: Flame, badge: `${products.length}` },
    { id: 'platforms', label: 'Plataformas', icon: Link2, badge: 'Oficial' },
    {
      id: 'automation',
      label: 'Automação',
      icon: Bot,
      isSpecial: true,
      badge: automation.isActive ? 'ATIVO' : undefined
    },
    { id: 'ai_marketing', label: 'AndMoney AI', icon: Sparkles, badge: 'Gemini' },
    { id: 'campaigns', label: 'Campanhas', icon: Send, badge: `${campaigns.length}` },
    { id: 'goals', label: 'Metas', icon: Target, badge: undefined },
    { id: 'sales', label: 'Vendas', icon: ShoppingBag, badge: `${orders.length} reais` },
    { id: 'wallet', label: 'Carteira & Saques', icon: Wallet, badge: undefined },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: undefined }
  ];

  const secondaryNavItems = [
    { id: 'antifraud', label: 'Anti-Fraude & Logs', icon: ShieldCheck },
    { id: 'support', label: 'Central de Ajuda', icon: HelpCircle },
    { id: 'profile', label: 'Configurações & Perfil', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-slate-800/80 bg-slate-950/60 p-4 shrink-0 transition-colors duration-200">
      
      {/* Top Slogan Badge */}
      <div className="mb-4 rounded-xl border border-slate-800/80 bg-gradient-to-b from-slate-900 to-slate-900/50 p-3 shadow-inner">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Hub Global Ativo</span>
        </div>
        <p className="mt-1 text-[11px] text-slate-400 leading-tight">
          Oportunidades em tempo real com integrações oficiais auditadas.
        </p>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 space-y-1 overflow-y-auto pr-1">
        <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Operação & Vendas
        </p>

        {mainNavItems.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          if (item.isSpecial) {
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`group relative flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                    : 'bg-emerald-950/30 text-emerald-300/90 border border-emerald-500/20 hover:bg-emerald-900/40 hover:text-emerald-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {automation.isActive ? (
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  ) : (
                    <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300">
                      MOTOR
                    </span>
                  )}
                </div>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-slate-800 text-white font-semibold shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                  isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-850 text-slate-500'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Support & Security */}
        <p className="mt-5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Segurança & Suporte
        </p>

        {secondaryNavItems.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}

        {/* Dedicated Admin Panel Access */}
        <div className="pt-3">
          <button
            onClick={() => setCurrentView('admin')}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold border transition-all ${
              currentView === 'admin'
                ? 'bg-indigo-950/60 border-indigo-500/60 text-indigo-200'
                : 'bg-indigo-950/20 border-indigo-500/20 text-indigo-400 hover:bg-indigo-900/30'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-indigo-400" />
              <span>Painel Administrativo</span>
            </div>
            <ChevronRight className="h-3 w-3 text-indigo-400/60" />
          </button>
        </div>
      </div>

      {/* Compliance seal bottom */}
      <div className="mt-4 pt-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            Dados Oficiais Auditados
          </span>
          <span className="font-mono text-[10px] text-slate-400">v2.4.0</span>
        </div>
      </div>
    </aside>
  );
};
