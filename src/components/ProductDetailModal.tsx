import React from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import {
  X,
  Heart,
  TrendingUp,
  ShieldCheck,
  Truck,
  Send,
  Star,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SUPPORTED_COUNTRIES } from '../data/initialData';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenCampaignModal: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenCampaignModal
}) => {
  const {
    formatCurrency,
    toggleFavorite,
    updateProductAffiliation,
    selectedCountry
  } = useApp();

  if (!product) return null;

  const isFav = product.isFavorite;

  const getOpportunityColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 80) return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
    if (score >= 65) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  const handleAffiliate = () => {
    updateProductAffiliation(product.id, 'approved');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md p-4 sm:p-6 lg:p-8 flex items-center justify-center animate-in fade-in" onClick={onClose}>
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl animate-in zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300 border border-slate-700">
              {product.category}
            </span>
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
              {product.platformName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`rounded-xl p-2 border transition-all ${
                isFav
                  ? 'border-rose-500/40 bg-rose-500/10 text-rose-400'
                  : 'border-slate-800 bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
              title="Adicionar aos Favoritos"
            >
              <Heart className={`h-5 w-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal body */}
        <div className="max-h-[80vh] overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Large Product Image */}
            <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 aspect-square flex items-center justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className={`rounded-lg px-2.5 py-1 text-xs font-bold border backdrop-blur-md ${getOpportunityColor(product.opportunityIndex)}`}>
                  ⚡ Índice de Oportunidade: {product.opportunityIndex}/100
                </span>
              </div>
            </div>

            {/* Core Info */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                  {product.name}
                </h2>
                
                <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-white">{product.rating}</span>
                    <span className="text-slate-400">({(product.reviewCount || 0).toLocaleString()} avaliações oficiais)</span>
                  </div>
                </div>

                {/* Price & Commission Highlights */}
                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-400">Preço de Venda Oficial:</span>
                    <span className="font-display text-lg font-bold text-slate-200">
                      {formatCurrency(product.price, product.currency)}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-slate-850 pt-2">
                    <span className="text-xs font-semibold text-emerald-400">Comissão por Venda:</span>
                    <div className="text-right">
                      <span className="font-display text-xl font-extrabold text-emerald-400">
                        {formatCurrency(product.commission, product.currency)}
                      </span>
                      <span className="ml-1.5 text-xs text-emerald-500/80 font-bold">
                        ({product.commissionRate}%)
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Delivery Info */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-850/40 p-3 flex items-center gap-3 text-xs text-slate-300">
                <Truck className="h-5 w-5 text-cyan-400 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Logística & Envio Integrado</p>
                  <p className="text-[11px] text-slate-400">
                    Tempo estimado: {product.deliveryInfo.estimatedDays} • {product.deliveryInfo.freeShipping ? 'Frete Grátis Disponível' : 'Frete padrão'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Market Potential & Countries Available */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <h3 className="font-display text-sm font-bold text-white mb-3">
              Análise de Mercado & Disponibilidade Transfronteiriça
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="rounded-lg bg-slate-900 p-2.5 border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Procura Local</p>
                <p className="text-xs font-bold text-emerald-400 mt-1 capitalize">{product.estimatedDemand}</p>
              </div>
              <div className="rounded-lg bg-slate-900 p-2.5 border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Concorrência</p>
                <p className="text-xs font-bold text-amber-400 mt-1 capitalize">{product.competition}</p>
              </div>
              <div className="rounded-lg bg-slate-900 p-2.5 border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Margem Estimada</p>
                <p className="text-xs font-bold text-cyan-400 mt-1">~{product.estimatedMargin}%</p>
              </div>
              <div className="rounded-lg bg-slate-900 p-2.5 border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">País Recomendado</p>
                <p className="text-xs font-bold text-white mt-1">
                  {SUPPORTED_COUNTRIES.find(c => c.code === product.recommendedCountry)?.flag} {product.recommendedCountry} ({product.recommendedCity || 'Geral'})
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-850 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Países Elegíveis:</span>
              {(product.availableCountries || []).map(cc => {
                const cObj = SUPPORTED_COUNTRIES.find(c => c.code === cc);
                return (
                  <span key={cc} className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-2 py-0.5 text-xs text-slate-300 border border-slate-800">
                    <span>{cObj?.flag}</span>
                    <span>{cObj?.name || cc}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Historical Performance Chart mini */}
          {product.performanceHistory && product.performanceHistory.length > 0 && (
            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
              <h3 className="font-display text-sm font-bold text-white mb-2 flex items-center justify-between">
                <span>Histórico de Desempenho (Dados Verificados da Plataforma)</span>
                <span className="text-[11px] text-emerald-400 font-normal">Sincronizado via API</span>
              </h3>
              <div className="grid grid-cols-4 gap-2 mt-3">
                {(product.performanceHistory || []).map(hist => (
                  <div key={hist.month} className="rounded-lg bg-slate-900/80 p-2.5 text-center border border-slate-800/80">
                    <p className="text-[11px] font-bold text-slate-400">{hist.month}</p>
                    <p className="text-sm font-extrabold text-white mt-0.5">{hist.salesCount} vendas</p>
                    <p className="text-[10px] text-emerald-400 font-mono mt-0.5">Conv: {hist.avgConversion}%</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {product.affiliationStatus !== 'approved' ? (
              <button
                onClick={handleAffiliate}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>CONECTAR / AFILIAR OFICIALMENTE</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onOpenCampaignModal(product);
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-xs font-extrabold text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
              >
                <Send className="h-4 w-4" />
                <span>CRIAR CAMPANHA AUTOMATIZADA</span>
              </button>
            )}

            <button
              onClick={() => toggleFavorite(product.id)}
              className={`rounded-xl px-4 py-3 text-xs font-bold border transition-colors flex items-center justify-center gap-2 ${
                isFav
                  ? 'border-rose-500/40 bg-rose-500/10 text-rose-400'
                  : 'border-slate-800 bg-slate-850 text-slate-300 hover:text-white'
              }`}
            >
              <Heart className={`h-4 w-4 ${isFav ? 'fill-rose-500' : ''}`} />
              <span>{isFav ? 'FAVORITADO' : 'ADICIONAR AOS FAVORITOS'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
