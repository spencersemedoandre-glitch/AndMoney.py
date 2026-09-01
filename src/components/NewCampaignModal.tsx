import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, CountryCode } from '../types';
import { SUPPORTED_COUNTRIES } from '../data/initialData';
import {
  X,
  Sparkles,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Layers,
  Globe2
} from 'lucide-react';

interface NewCampaignModalProps {
  isOpen: boolean;
  preselectedProduct?: Product | null;
  onClose: () => void;
}

export const NewCampaignModal: React.FC<NewCampaignModalProps> = ({
  isOpen,
  preselectedProduct,
  onClose
}) => {
  const { products, selectedCountry, selectedCity, createCampaign, formatCurrency } = useApp();

  const [selectedProductId, setSelectedProductId] = useState<string>(
    preselectedProduct?.id || products[0]?.id || ''
  );
  const [campaignName, setCampaignName] = useState<string>('');
  const [targetCountry, setTargetCountry] = useState<CountryCode>(selectedCountry);
  const [targetCity, setTargetCity] = useState<string>(selectedCity);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['google_ads', 'meta_ads']);
  
  // AI generation state
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiGeneratedCopy, setAiGeneratedCopy] = useState<{
    headline: string;
    description: string;
    cta: string;
    videoScript?: string;
    language: any;
  } | null>(null);

  if (!isOpen) return null;

  const currentProduct = products.find(p => p.id === selectedProductId) || products[0];
  const countryObj = SUPPORTED_COUNTRIES.find(c => c.code === targetCountry) || SUPPORTED_COUNTRIES[0];

  const handleToggleChannel = (channel: string) => {
    setSelectedChannels(prev =>
      prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]
    );
  };

  const handleGenerateAiCopy = async () => {
    if (!currentProduct) return;
    setIsGeneratingAi(true);

    try {
      const res = await fetch('/api/ai/generate-marketing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: currentProduct.name,
          category: currentProduct.category,
          price: currentProduct.price,
          currency: currentProduct.currency,
          targetCountry: countryObj.name,
          targetCity: targetCity,
          targetLanguage: countryObj.defaultLanguage
        })
      });

      const json = await res.json();
      if (json.data) {
        setAiGeneratedCopy({
          headline: json.data.headline,
          description: json.data.description,
          cta: json.data.cta,
          videoScript: json.data.videoScript?.hook ? `${json.data.videoScript.hook}\n${json.data.videoScript.problem}\n${json.data.videoScript.solution}\n${json.data.videoScript.callToAction}` : undefined,
          language: countryObj.defaultLanguage
        });

        if (!campaignName) {
          setCampaignName(`${targetCountry} - ${targetCity} | ${currentProduct.name}`);
        }
      }
    } catch (e) {
      console.error('AI Generation error:', e);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;

    createCampaign({
      name: campaignName || `${targetCountry} - ${targetCity} | ${currentProduct.name}`,
      productId: currentProduct.id,
      productName: currentProduct.name,
      productImage: currentProduct.imageUrl,
      country: targetCountry,
      city: targetCity,
      platformId: currentProduct.platformId,
      adChannels: selectedChannels as any,
      aiGeneratedCopy: aiGeneratedCopy || {
        headline: `Oferta Exclusiva: ${currentProduct.name}`,
        description: currentProduct.description,
        cta: 'Comprar Agora',
        language: countryObj.defaultLanguage
      }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md p-4 flex items-center justify-center animate-in fade-in" onClick={onClose}>
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6 animate-in zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Send className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">Criar Nova Campanha de Marketing</h3>
              <p className="text-xs text-slate-400">Automação através dos canais e integrações oficiais</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          
          {/* Product Select */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Produto Elegível
            </label>
            <select
              value={selectedProductId}
              onChange={e => setSelectedProductId(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs font-medium text-white focus:border-emerald-500 focus:outline-none"
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} — Comissão: {formatCurrency(p.commission, p.currency)} ({p.platformName})
                </option>
              ))}
            </select>
          </div>

          {/* Market & City Target */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                País de Destino
              </label>
              <select
                value={targetCountry}
                onChange={e => {
                  const newCountry = e.target.value as CountryCode;
                  setTargetCountry(newCountry);
                  const cObj = SUPPORTED_COUNTRIES.find(c => c.code === newCountry);
                  if (cObj && cObj.cities.length > 0) {
                    setTargetCity(cObj.cities[0]);
                  }
                }}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
              >
                {SUPPORTED_COUNTRIES.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Cidade Alvo
              </label>
              <select
                value={targetCity}
                onChange={e => setTargetCity(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
              >
                {countryObj.cities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Campaign Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Nome de Identificação da Campanha
            </label>
            <input
              type="text"
              value={campaignName}
              onChange={e => setCampaignName(e.target.value)}
              placeholder={`Ex: ${targetCountry} - ${targetCity} | ${currentProduct?.name || 'Campanha Oficial'}`}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Ad Channels */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Canais Autorizados de Distribuição
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'google_ads', label: 'Google Search & Shopping' },
                { id: 'meta_ads', label: 'Meta (Instagram & FB)' },
                { id: 'tiktok_shop', label: 'TikTok Shop & Ads' },
                { id: 'pinterest', label: 'Pinterest Ads' },
                { id: 'influencer_network', label: 'Rede de Micro-Influenciadores' }
              ].map(ch => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => handleToggleChannel(ch.id)}
                  className={`rounded-xl p-2.5 text-left text-xs border transition-all ${
                    selectedChannels.includes(ch.id)
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-bold'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${selectedChannels.includes(ch.id) ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
                    <span>{ch.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Copywriting Assistant Section */}
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span className="font-display text-xs font-bold text-indigo-200">AndMoney AI Copy & Conteúdo</span>
              </div>
              <button
                type="button"
                onClick={handleGenerateAiCopy}
                disabled={isGeneratingAi}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-md shadow-indigo-600/20"
              >
                {isGeneratingAi ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Gerando com IA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Gerar Copy Adaptada ({countryObj.defaultLanguage.toUpperCase()})</span>
                  </>
                )}
              </button>
            </div>

            {aiGeneratedCopy && (
              <div className="rounded-lg bg-slate-950/80 p-3 text-xs space-y-2 border border-indigo-500/20">
                <div>
                  <span className="text-[10px] text-indigo-400 uppercase font-bold">Título Sugerido:</span>
                  <p className="text-white font-medium mt-0.5">{aiGeneratedCopy.headline}</p>
                </div>
                <div>
                  <span className="text-[10px] text-indigo-400 uppercase font-bold">Texto do Anúncio:</span>
                  <p className="text-slate-300 mt-0.5">{aiGeneratedCopy.description}</p>
                </div>
                <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400 font-semibold">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>CTA: "{aiGeneratedCopy.cta}"</span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={selectedChannels.length === 0}
              className="w-full rounded-xl bg-emerald-500 py-3 text-xs font-extrabold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/20"
            >
              PUBLICAR & ATIVAR CAMPANHA OFICIAL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
