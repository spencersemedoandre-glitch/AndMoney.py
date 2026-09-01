import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlatformIntegration } from '../types';
import {
  Link2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ExternalLink,
  Layers,
  Sparkles,
  Zap,
  Globe2
} from 'lucide-react';

interface PlatformsViewProps {
  onOpenConnectModal: (platform: PlatformIntegration) => void;
}

export const PlatformsView: React.FC<PlatformsViewProps> = ({ onOpenConnectModal }) => {
  const { platforms } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'ecommerce' | 'affiliate_network'>('all');

  const filteredPlatforms = platforms.filter(p => {
    if (activeTab === 'ecommerce') return p.category === 'ecommerce';
    if (activeTab === 'affiliate_network') return p.category === 'affiliate_network';
    return true;
  });

  const connectedCount = platforms.filter(p => p.status === 'connected').length;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/20 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Link2 className="h-4 w-4" />
              <span>APIs e Redes Oficiais Parceiras</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Plataformas & Integrações
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Conecte suas lojas e programas de afiliados para sincronização direta de catálogo, rastreamento de cliques e comissões 100% auditadas.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3 flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              {connectedCount}
            </div>
            <div className="text-xs">
              <span className="font-bold text-white block">Plataformas Conectadas</span>
              <span className="text-slate-400">de {platforms.length} homologadas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance & API Protocol Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-white">Garantia de Segurança & Protocolo Oficial</h3>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              O AndMoney opera estritamente de acordo com as diretrizes de desenvolvimento de cada plataforma. Nunca utilizamos web-scraping não autorizado ou simulamos eventos artificiais.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Todas as Integrações ({platforms.length})
        </button>
        <button
          onClick={() => setActiveTab('ecommerce')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === 'ecommerce'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          E-commerce & Marketplaces
        </button>
        <button
          onClick={() => setActiveTab('affiliate_network')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === 'affiliate_network'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Redes de Afiliados Globais
        </button>
      </div>

      {/* Platform Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlatforms.map(platform => {
          const isConnected = platform.status === 'connected';
          return (
            <div
              key={platform.id}
              className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                isConnected
                  ? 'border-slate-700 bg-slate-900 shadow-xl'
                  : 'border-slate-800 bg-slate-900/60 opacity-90'
              }`}
            >
              <div>
                {/* Top Info */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-850">
                  <div className="flex items-center gap-3">
                    <img
                      src={platform.logo}
                      alt={platform.name}
                      referrerPolicy="no-referrer"
                      className="h-10 w-10 rounded-xl object-cover bg-slate-950 border border-slate-800"
                    />
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">{platform.name}</h4>
                      <span className="text-[10px] text-indigo-400 font-semibold uppercase">
                        {platform.category === 'ecommerce' ? 'E-commerce' : 'Rede de Afiliados'}
                      </span>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    isConnected
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                    {isConnected ? 'Ativo' : 'Desconectado'}
                  </span>
                </div>

                <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                  {platform.description}
                </p>

                {/* Features / Details */}
                <div className="mt-4 rounded-xl bg-slate-950/60 p-3 space-y-1.5 border border-slate-850 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Produtos Disponíveis:</span>
                    <span className="font-bold text-white">{platform.activeProductsCount} itens</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Método de Autenticação:</span>
                    <span className="font-mono text-emerald-400">OAuth 2.0 / API</span>
                  </div>
                  {platform.accountId && (
                    <div className="flex justify-between text-slate-400">
                      <span>ID da Conta:</span>
                      <span className="font-mono text-slate-300">{platform.accountId}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-850">
                <button
                  onClick={() => onOpenConnectModal(platform)}
                  className={`w-full rounded-xl py-2.5 text-xs font-bold transition-all ${
                    isConnected
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                      : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20'
                  }`}
                >
                  {isConnected ? 'Gerenciar Conexão & Credenciais' : 'Conectar Plataforma Oficial'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
