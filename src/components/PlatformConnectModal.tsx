import React, { useState } from 'react';
import { PlatformIntegration } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  Link2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Key,
  ExternalLink,
  Lock,
  Loader2
} from 'lucide-react';

interface PlatformConnectModalProps {
  platform: PlatformIntegration | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PlatformConnectModal: React.FC<PlatformConnectModalProps> = ({
  platform,
  isOpen,
  onClose
}) => {
  const { togglePlatformConnection, addNotification } = useApp();
  const [isConnecting, setIsConnecting] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [storeUrl, setStoreUrl] = useState('');

  if (!isOpen || !platform) return null;

  const isConnected = platform.status === 'connected';

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      togglePlatformConnection(platform.id);
      setIsConnecting(false);
      addNotification({
        type: 'campaign_approved',
        title: `Plataforma ${platform.name} Conectada!`,
        message: 'A sincronização oficial de catálogo, cliques e pedidos em tempo real foi ativada com sucesso.',
        read: false
      });
      onClose();
    }, 1200);
  };

  const handleDisconnect = () => {
    togglePlatformConnection(platform.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md p-4 flex items-center justify-center animate-in fade-in" onClick={onClose}>
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6 animate-in zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center p-1">
              <img
                src={platform.logo}
                alt={platform.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">{platform.name}</h3>
              <p className="text-xs text-slate-400 capitalize">Categoria: {platform.category.replace('_', ' ')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {/* Status Box */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Status da Integração:</span>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                isConnected
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                {isConnected ? 'Conectado & Sincronizado' : 'Desconectado'}
              </span>
            </div>

            {isConnected && (
              <div className="mt-3 pt-3 border-t border-slate-850 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500">ID da Conta:</span>
                  <p className="font-mono text-slate-300">{platform.accountId || 'acc_verified_official'}</p>
                </div>
                <div>
                  <span className="text-slate-500">Produtos Elegíveis:</span>
                  <p className="font-bold text-white">{platform.activeProductsCount} ativos</p>
                </div>
              </div>
            )}
          </div>

          {/* Compliance & Security Rules */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Garantia de Conformidade & API Oficial</span>
            </div>
            <ul className="text-[11px] text-slate-300 space-y-1 list-disc pl-4 leading-relaxed">
              <li>O AndMoney <strong>nunca armazena senhas externas</strong> em texto simples.</li>
              <li>Apenas tokens OAuth oficiais e chaves de API restritas são transacionados.</li>
              <li>Todas as comissões, cliques e vendas vêm diretamente das APIs oficiais das redes.</li>
              <li>Proibido qualquer método de spam ou contorno de regras da plataforma.</li>
            </ul>
          </div>

          {!isConnected && (
            <div className="space-y-3">
              {platform.id === 'shopify' || platform.id === 'woocommerce' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    URL da Loja / Endpoint Oficial
                  </label>
                  <input
                    type="text"
                    value={storeUrl}
                    onChange={e => setStoreUrl(e.target.value)}
                    placeholder="https://minhaloja.myshopify.com"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Chave de API / Associate Tag Oficial
                  </label>
                  <input
                    type="text"
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    placeholder="Ex: andmoney-tag-21"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="pt-2">
            {isConnected ? (
              <button
                onClick={handleDisconnect}
                className="w-full rounded-xl bg-rose-600/20 border border-rose-500/30 py-3 text-xs font-bold text-rose-300 hover:bg-rose-600/30 transition-colors"
              >
                DESCONECTAR INTEGRAÇÃO
              </button>
            ) : (
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-xs font-extrabold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/20"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Autenticando com {platform.name}...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>AUTORIZAR E CONECTAR OFICIALMENTE</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
