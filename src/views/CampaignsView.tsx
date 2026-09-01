import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Campaign, Product } from '../types';
import {
  Send,
  Play,
  Pause,
  Trash2,
  ExternalLink,
  Plus,
  MousePointerClick,
  ShoppingBag,
  TrendingUp,
  Globe2,
  Sparkles,
  Layers
} from 'lucide-react';

interface CampaignsViewProps {
  onOpenNewCampaignModal: (product?: Product) => void;
}

export const CampaignsView: React.FC<CampaignsViewProps> = ({ onOpenNewCampaignModal }) => {
  const {
    campaigns,
    toggleCampaignStatus,
    deleteCampaign,
    formatCurrency
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'active' | 'paused'>('all');

  const filteredCampaigns = campaigns.filter(c => {
    if (filter === 'active') return c.status === 'active';
    if (filter === 'paused') return c.status === 'paused';
    return true;
  });

  const totalImpressions = campaigns.reduce((acc, c) => acc + c.impressions, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
  const totalConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0);
  const totalCommissionsEarned = campaigns.reduce((acc, c) => acc + c.commissionsEarned, 0);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/20 p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Send className="h-4 w-4" />
            <span>Gestão de Tráfego & Distribuição</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Minhas Campanhas Automatizadas
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Acompanhe o desempenho de anúncios, taxas de conversão e comissões geradas por cada campanha.
          </p>
        </div>

        <button
          onClick={() => onOpenNewCampaignModal()}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-xs font-extrabold text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
        >
          <Plus className="h-4 w-4" />
          <span>NOVA CAMPANHA</span>
        </button>
      </div>

      {/* Aggregate KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Impressões Oficiais</span>
          <p className="font-display text-xl font-bold text-white mt-1">{(totalImpressions || 0).toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Cliques Verificados</span>
          <p className="font-display text-xl font-bold text-cyan-400 mt-1">{(totalClicks || 0).toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Vendas Registradas</span>
          <p className="font-display text-xl font-bold text-indigo-300 mt-1">{totalConversions} pedidos</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Comissões Geradas</span>
          <p className="font-display text-xl font-bold text-emerald-400 mt-1">{formatCurrency(totalCommissionsEarned)}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-colors ${
              filter === 'all' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            Todas ({campaigns.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-colors ${
              filter === 'active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            Ativas ({campaigns.filter(c => c.status === 'active').length})
          </button>
          <button
            onClick={() => setFilter('paused')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-colors ${
              filter === 'paused' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            Pausadas ({campaigns.filter(c => c.status === 'paused').length})
          </button>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-3">
        {filteredCampaigns.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center text-slate-500">
            <Send className="h-10 w-10 mx-auto mb-3 text-slate-600" />
            <p className="font-display font-bold text-base text-white">Nenhuma campanha encontrada</p>
            <p className="text-xs text-slate-400 mt-1">Crie sua primeira campanha para começar a atrair tráfego e vendas.</p>
          </div>
        ) : (
          filteredCampaigns.map(camp => {
            const isActive = camp.status === 'active';
            const campClicks = camp.clicks || 0;
            const campImpressions = camp.impressions || 0;
            const campSales = camp.confirmedSales || camp.orders || 0;
            const ctr = campImpressions > 0 ? ((campClicks / campImpressions) * 100).toFixed(2) : '0.00';
            const convRate = campClicks > 0 ? ((campSales / campClicks) * 100).toFixed(2) : '0.00';

            return (
              <div
                key={camp.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl transition-all hover:border-slate-700"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Left: Product & Campaign Details */}
                  <div className="flex items-start gap-4">
                    <img
                      src={camp.productImage}
                      alt={camp.productName}
                      referrerPolicy="no-referrer"
                      className="h-14 w-14 rounded-xl object-cover bg-slate-950 border border-slate-800 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold ${
                          isActive
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                          {isActive ? 'EM VEICULAÇÃO' : 'PAUSADA'}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {camp.country} • {camp.city}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-base text-white mt-1">
                        {camp.name}
                      </h3>
                      {camp.aiGeneratedCopy?.headline && (
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          {camp.aiGeneratedCopy.headline}
                        </p>
                      )}

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {(camp.adChannels || []).map(ch => (
                          <span key={ch} className="rounded bg-slate-950 px-2 py-0.5 text-[10px] text-slate-300 border border-slate-850">
                            {ch.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Performance Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-850 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Cliques:</span>
                      <span className="font-mono font-bold text-white">{campClicks.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-500 block font-mono">CTR {ctr}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Vendas Reais:</span>
                      <span className="font-mono font-bold text-cyan-400">{campSales}</span>
                      <span className="text-[10px] text-slate-500 block font-mono">Conv {convRate}%</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[10px] text-emerald-400 font-semibold block">Comissões Geradas:</span>
                      <span className="font-display font-extrabold text-base text-emerald-400">
                        {formatCurrency(camp.commissionEarned || 0)}
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleCampaignStatus(camp.id)}
                      className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${
                        isActive
                          ? 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30'
                          : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                      }`}
                    >
                      {isActive ? (
                        <>
                          <Pause className="h-3.5 w-3.5" />
                          <span>Pausar</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5" />
                          <span>Reativar</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => deleteCampaign(camp.id)}
                      className="rounded-xl p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
                      title="Excluir Campanha"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
