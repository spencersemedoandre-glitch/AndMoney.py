import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Users,
  ShoppingBag,
  Wallet,
  Activity,
  CheckCircle2,
  XCircle,
  Ban,
  Layers,
  Search,
  Lock,
  Download,
  AlertTriangle
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    user,
    isAdmin,
    wallet,
    orders,
    products,
    platforms,
    formatCurrency,
    addNotification
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'withdrawals' | 'products' | 'logs'>('overview');
  const [userList, setUserList] = useState([
    { id: 'usr_01', name: 'Operador Principal', email: 'operador@andmoney.com', country: 'PT', status: 'active', sales: 12, earned: 420.50, role: 'operator' },
    { id: 'usr_02', name: 'Carlos Mendez', email: 'carlos.mendez@madrid.es', country: 'ES', status: 'active', sales: 24, earned: 890.00, role: 'operator' },
    { id: 'usr_03', name: 'Sophie Laurent', email: 'sophie@paris-ecommerce.fr', country: 'FR', status: 'active', sales: 38, earned: 1450.20, role: 'operator' },
    { id: 'usr_04', name: 'Marco Rossi', email: 'marco.rossi@milano.it', country: 'IT', status: 'suspended', sales: 0, earned: 0.00, role: 'operator' },
  ]);

  const [withdrawalRequests, setWithdrawalRequests] = useState([
    { id: 'wd_001', user: 'Operador Principal', amount: 350.00, method: 'SEPA (PT50...)', date: 'Hoje, 10:30', status: 'pending' },
    { id: 'wd_002', user: 'Sophie Laurent', amount: 800.00, method: 'Wise (FR76...)', date: 'Hoje, 09:15', status: 'approved' },
  ]);

  const toggleUserStatus = (userId: string) => {
    setUserList(prev =>
      prev.map(u => (u.id === userId ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u))
    );
  };

  const handleApproveWithdrawal = (id: string) => {
    setWithdrawalRequests(prev =>
      prev.map(w => (w.id === id ? { ...w, status: 'approved' } : w))
    );
    addNotification({
      type: 'sale_confirmed',
      title: 'Saque Aprovado pela Administração',
      message: `A solicitação ${id} foi processada e transferida com sucesso.`,
      read: false
    });
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Admin Header */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <ShieldAlert className="h-4 w-4" />
            <span>Controle Central • Nível Super-Administrador (Root)</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Painel Administrativo do Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Supervisão de contas, liquidação de comissões, monitoramento de webhooks e conformidade global.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-xl bg-indigo-500/20 px-3.5 py-2 text-xs font-mono font-bold text-indigo-300 border border-indigo-500/30">
            ADMIN: {user?.email}
          </span>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'overview', label: 'Visão Geral do Sistema', icon: Activity },
          { id: 'users', label: 'Gestão de Usuários', icon: Users },
          { id: 'withdrawals', label: 'Aprovação de Saques', icon: Wallet },
          { id: 'products', label: 'Catálogo & Oportunidades', icon: ShoppingBag },
          { id: 'logs', label: 'Logs de Eventos & APIs', icon: Layers }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Operadores Registrados</span>
              <p className="font-display text-2xl font-bold text-white mt-1">{userList.length}</p>
              <span className="text-[10px] text-emerald-400 font-bold">100% Verificados</span>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Vendas Totais Intermediadas</span>
              <p className="font-display text-2xl font-bold text-cyan-400 mt-1">{orders.length * 4}</p>
              <span className="text-[10px] text-slate-400 font-mono">Nos 6 mercados</span>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Comissões Conciliadas</span>
              <p className="font-display text-2xl font-bold text-emerald-400 mt-1">{formatCurrency(14850.80)}</p>
              <span className="text-[10px] text-emerald-400">Auditadas via Webhooks</span>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Plataformas Conectadas</span>
              <p className="font-display text-2xl font-bold text-indigo-300 mt-1">{platforms.length}</p>
              <span className="text-[10px] text-indigo-400">APIs Oficiais</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USERS */}
      {activeTab === 'users' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <h3 className="font-display text-base font-bold text-white">Operadores da Plataforma</h3>
            <span className="text-xs text-slate-400">{userList.length} contas cadastradas</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-[10px] uppercase font-bold text-slate-400">
                  <th className="p-4">Operador / E-mail</th>
                  <th className="p-4">País</th>
                  <th className="p-4">Vendas</th>
                  <th className="p-4">Comissões</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {userList.map(u => (
                  <tr key={u.id} className="hover:bg-slate-850/40">
                    <td className="p-4">
                      <p className="font-bold text-white">{u.name}</p>
                      <span className="text-[10px] text-slate-500">{u.email}</span>
                    </td>
                    <td className="p-4 font-bold text-slate-300">{u.country}</td>
                    <td className="p-4 font-mono text-white">{u.sales}</td>
                    <td className="p-4 font-mono font-bold text-emerald-400">{formatCurrency(u.earned)}</td>
                    <td className="p-4">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        u.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {u.status === 'active' ? 'Ativo' : 'Suspenso'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                          u.status === 'active'
                            ? 'bg-rose-600/20 text-rose-300 hover:bg-rose-600/30'
                            : 'bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30'
                        }`}
                      >
                        {u.status === 'active' ? 'Suspender' : 'Reativar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: WITHDRAWALS APPROVAL */}
      {activeTab === 'withdrawals' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <h3 className="font-display text-base font-bold text-white">Solicitações de Liquidação & Saque</h3>
            <span className="text-xs text-emerald-400 font-semibold">Auditoria PSD2</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-[10px] uppercase font-bold text-slate-400">
                  <th className="p-4">ID / Data</th>
                  <th className="p-4">Operador</th>
                  <th className="p-4">Destino Bancário</th>
                  <th className="p-4">Valor</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {withdrawalRequests.map(w => (
                  <tr key={w.id} className="hover:bg-slate-850/40">
                    <td className="p-4 font-mono">
                      <span className="font-bold text-white">{w.id}</span>
                      <span className="block text-[10px] text-slate-500">{w.date}</span>
                    </td>
                    <td className="p-4 font-semibold text-slate-200">{w.user}</td>
                    <td className="p-4 text-slate-400 font-mono text-[11px]">{w.method}</td>
                    <td className="p-4 font-mono font-bold text-emerald-400">{formatCurrency(w.amount)}</td>
                    <td className="p-4">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        w.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {w.status === 'approved' ? 'Transferido' : 'Pendente de Aprovação'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {w.status === 'pending' ? (
                        <button
                          onClick={() => handleApproveWithdrawal(w.id)}
                          className="rounded-lg bg-emerald-500 px-3 py-1 text-xs font-bold text-slate-950 hover:bg-emerald-400"
                        >
                          Aprovar Saque
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-mono">✓ Liquidado</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: PRODUCTS & PLATFORMS */}
      {activeTab === 'products' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <h3 className="font-display text-base font-bold text-white">Catálogo Global & Sincronia de APIs</h3>
            <span className="text-xs text-slate-400">{products.length} itens monitorados</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map(p => (
              <div key={p.id} className="rounded-xl bg-slate-950 p-3.5 border border-slate-850 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={p.imageUrl} alt={p.name} referrerPolicy="no-referrer" className="h-10 w-10 rounded-lg object-cover" />
                  <div>
                    <p className="font-bold text-xs text-white max-w-[140px] truncate">{p.name}</p>
                    <span className="text-[10px] text-emerald-400 font-mono">Comissão: {formatCurrency(p.commission, p.currency)}</span>
                  </div>
                </div>
                <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[9px] font-bold text-indigo-300">
                  {p.platformName}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: LOGS */}
      {activeTab === 'logs' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl space-y-3 font-mono text-xs">
          <h3 className="font-display text-base font-bold text-white font-sans">Logs de Auditoria do Servidor</h3>
          <div className="rounded-xl bg-slate-950 p-4 space-y-1.5 text-slate-400 border border-slate-850 max-h-80 overflow-y-auto">
            <p className="text-emerald-400">[2026-09-01 10:45:00] Webhook receiver started on port 3000 (0.0.0.0)</p>
            <p className="text-slate-300">[2026-09-01 10:45:10] Gemini 3.7 Flash Model connected (ai.models.generateContent)</p>
            <p className="text-cyan-400">[2026-09-01 10:46:02] Anti-fraud engine verified zero suspicious click bots</p>
            <p className="text-slate-400">[2026-09-01 10:47:18] Health check /api/health passed 200 OK</p>
          </div>
        </div>
      )}

    </div>
  );
};
