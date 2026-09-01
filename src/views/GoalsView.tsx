import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Target,
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Zap
} from 'lucide-react';

export const GoalsView: React.FC = () => {
  const {
    goals,
    wallet,
    orders,
    formatCurrency,
    updateMonthlyGoal,
    selectedCurrency
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const targetVal = goals?.monthlyTarget ?? goals?.targetAmount ?? 2500;
  const [newTarget, setNewTarget] = useState(targetVal.toString());

  const confirmedSales = orders.filter(o => o.status === 'confirmed');
  const avgCommissionPerSale = confirmedSales.length > 0
    ? wallet.totalEarned / confirmedSales.length
    : 38.50;

  const currentEarned = wallet.totalEarned;
  const remainingAmount = Math.max(0, targetVal - currentEarned);
  const salesNeeded = Math.ceil(remainingAmount / (avgCommissionPerSale || 1));
  const goalPercentage = goals?.percentage ?? (targetVal > 0 ? Math.round((currentEarned / targetVal) * 100) : 0);

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newTarget);
    if (val > 0) {
      updateMonthlyGoal(val);
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/20 p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Target className="h-4 w-4" />
            <span>Planejamento & Disciplina Financeira</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Metas de Comissões
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Defina metas transparentes e acompanhe o ritmo necessário de vendas confirmadas.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-200 hover:text-white transition-colors"
        >
          {isEditing ? 'Cancelar Edição' : 'Ajustar Meta Mensal'}
        </button>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <form onSubmit={handleSaveGoal} className="rounded-2xl border border-emerald-500/40 bg-slate-900/90 p-5 shadow-xl animate-in fade-in space-y-3">
          <h3 className="font-display text-sm font-bold text-white">Redefinir Meta Mensal de Comissões</h3>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-2.5 font-bold text-emerald-400">{selectedCurrency}</span>
              <input
                type="number"
                min="100"
                step="50"
                value={newTarget}
                onChange={e => setNewTarget(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-12 pr-4 py-2 text-sm font-bold text-white focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-emerald-400 transition-all"
            >
              Salvar Nova Meta
            </button>
          </div>
        </form>
      )}

      {/* Main Monthly Goal Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold text-slate-400">Progresso da Meta Mensal</span>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="font-display text-4xl font-extrabold text-white">
                {formatCurrency(currentEarned)}
              </span>
              <span className="text-sm font-semibold text-slate-400">
                de {formatCurrency(targetVal)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-center">
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">Concluído</span>
              <span className="font-display text-2xl font-black text-emerald-400">{goalPercentage}%</span>
            </div>
            <div className="rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Faltam</span>
              <span className="font-display text-2xl font-black text-cyan-400">{formatCurrency(remainingAmount)}</span>
            </div>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="mt-6 space-y-2">
          <div className="h-4 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-700 shadow-lg shadow-emerald-500/30"
              style={{ width: `${Math.min(100, goalPercentage)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>Início do Mês: €0</span>
            <span>Meta: {formatCurrency(targetVal)}</span>
          </div>
        </div>

        {/* Actionable Insights */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-850 text-xs">
          <div className="rounded-xl bg-slate-950 p-3.5 border border-slate-850">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Vendas Necessárias</span>
            <p className="font-display text-lg font-bold text-white mt-1">~{salesNeeded} pedidos</p>
            <span className="text-[10px] text-slate-400">Calculado com base no ticket médio</span>
          </div>
          <div className="rounded-xl bg-slate-950 p-3.5 border border-slate-850">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Comissão Média por Venda</span>
            <p className="font-display text-lg font-bold text-emerald-400 mt-1">{formatCurrency(avgCommissionPerSale)}</p>
            <span className="text-[10px] text-slate-400">Média ponderada do catálogo</span>
          </div>
          <div className="rounded-xl bg-slate-950 p-3.5 border border-slate-850">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Ritmo Diário Recomendado</span>
            <p className="font-display text-lg font-bold text-indigo-300 mt-1">
              ~{Math.ceil(salesNeeded / 20)} vendas / dia
            </p>
            <span className="text-[10px] text-slate-400">Considerando 20 dias úteis</span>
          </div>
        </div>
      </div>

    </div>
  );
};
