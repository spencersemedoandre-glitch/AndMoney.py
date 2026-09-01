import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OrderSale } from '../types';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Truck,
  ExternalLink,
  ShieldCheck,
  Zap,
  ArrowDownToLine
} from 'lucide-react';

export const SalesView: React.FC = () => {
  const {
    orders,
    formatCurrency,
    simulateIncomingOrder,
    selectedCountry
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all');
  const [isSimulating, setIsSimulating] = useState(false);

  const filteredOrders = (orders || []).filter(o => {
    if (!o) return false;
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (
      searchTerm &&
      !(o.orderNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) &&
      !(o.productName || '').toLowerCase().includes(searchTerm.toLowerCase()) &&
      !(o.platformName || '').toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleSimulateSale = () => {
    setIsSimulating(true);
    simulateIncomingOrder();
    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/20 p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <ShoppingBag className="h-4 w-4" />
            <span>Livro de Vendas & Comissões Auditadas</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Vendas & Pedidos Reais
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Registros oficiais recebidos via webhooks criptografados das plataformas conectadas.
          </p>
        </div>

        {/* Live Webhook Simulator Trigger */}
        <button
          onClick={handleSimulateSale}
          disabled={isSimulating}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-5 py-3 text-xs font-extrabold text-slate-950 hover:from-emerald-400 hover:to-teal-300 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
        >
          <Zap className="h-4 w-4 fill-slate-950" />
          <span>{isSimulating ? 'Recebendo Webhook...' : 'Simular Webhook de Venda Oficial'}</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar por nº de pedido, produto ou plataforma..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-colors ${
              statusFilter === 'all' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            Todos ({orders.length})
          </button>
          <button
            onClick={() => setStatusFilter('confirmed')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-colors ${
              statusFilter === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            Confirmados ({orders.filter(o => o.status === 'confirmed').length})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-colors ${
              statusFilter === 'pending' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            Em Análise ({orders.filter(o => o.status === 'pending').length})
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="p-4">Nº Pedido / Data</th>
                <th className="p-4">Produto & Destino</th>
                <th className="p-4">Plataforma</th>
                <th className="p-4">Valor Bruto</th>
                <th className="p-4">Comissão Líquida</th>
                <th className="p-4">Status & Pagamento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500">
                    Nenhuma venda encontrada para os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-850/40 transition-colors">
                    
                    {/* Order Number & Date */}
                    <td className="p-4">
                      <p className="font-mono font-bold text-white">{order.orderNumber}</p>
                      <span className="text-[10px] text-slate-500 block">{order.createdAt}</span>
                    </td>

                    {/* Product & Destination */}
                    <td className="p-4">
                      <p className="font-bold text-slate-200">{order.productName}</p>
                      <span className="text-[10px] text-slate-400">
                        {order.country} ({order.city})
                      </span>
                    </td>

                    {/* Platform */}
                    <td className="p-4">
                      <span className="rounded-md bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/20">
                        {order.platformName}
                      </span>
                    </td>

                    {/* Gross Sale Amount */}
                    <td className="p-4 font-mono font-medium text-slate-300">
                      {formatCurrency(order.orderTotal || (order as any).amount, order.currency)}
                    </td>

                    {/* Commission */}
                    <td className="p-4 font-mono font-bold text-emerald-400">
                      +{formatCurrency(order.commissionAmount || (order as any).commissionEarned, order.currency)}
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        order.status === 'confirmed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : order.status === 'pending'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {order.status === 'confirmed' && <CheckCircle2 className="h-3 w-3" />}
                        {order.status === 'pending' && <Clock className="h-3 w-3" />}
                        {order.status === 'cancelled' && <XCircle className="h-3 w-3" />}
                        <span className="capitalize">
                          {order.status === 'confirmed' ? 'Confirmado (Disponível)' : order.status === 'pending' ? 'Em Análise (Pendente)' : 'Cancelado'}
                        </span>
                      </span>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
