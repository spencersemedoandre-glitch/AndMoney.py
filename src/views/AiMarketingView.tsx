import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_COUNTRIES } from '../data/initialData';
import {
  Sparkles,
  Send,
  Copy,
  Check,
  Loader2,
  Video,
  Languages,
  Layers,
  Zap,
  Globe2,
  Bot
} from 'lucide-react';
import { Product } from '../types';

interface AiMarketingViewProps {
  onOpenCampaignModal: (product?: Product) => void;
}

export const AiMarketingView: React.FC<AiMarketingViewProps> = ({ onOpenCampaignModal }) => {
  const {
    products,
    selectedCountry,
    selectedCity,
    formatCurrency
  } = useApp();

  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [customProduct, setCustomProduct] = useState('');
  const [targetCountry, setTargetCountry] = useState(selectedCountry);
  const [targetCity, setTargetCity] = useState(selectedCity);
  const [tone, setTone] = useState<'persuasive' | 'direct' | 'luxury'>('persuasive');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const countryObj = SUPPORTED_COUNTRIES.find(c => c.code === targetCountry) || SUPPORTED_COUNTRIES[0];
  const activeProduct = products.find(p => p.id === selectedProductId);

  const [generatedOutput, setGeneratedOutput] = useState<{
    headline: string;
    description: string;
    cta: string;
    bulletPoints: string[];
    videoScript: {
      hook: string;
      problem: string;
      solution: string;
      callToAction: string;
    };
    targetAudience: string;
  } | null>({
    headline: 'Descubra a Nova Geração de Automação Residencial em Lisboa',
    description: 'Transforme sua casa com controle de voz intuitivo, economia de energia em tempo real e entrega rápida oficial em Portugal.',
    cta: 'Garantir com Desconto Exclusivo',
    bulletPoints: [
      'Economia de até 30% na conta de energia',
      'Configuração simplificada em menos de 2 minutos',
      'Compatível com iOS, Android e Alexa nativa'
    ],
    videoScript: {
      hook: 'Você ainda gasta horas configurando dispositivos inteligentes na sua casa?',
      problem: 'A maioria dos hubs do mercado é complexa e incompatível com o padrão europeu.',
      solution: 'Conheça a solução definitiva com instalação Plug & Play e resposta instantânea.',
      callToAction: 'Toque no link abaixo e receba frete grátis para todo o país hoje mesmo!'
    },
    targetAudience: 'Entusiastas de tecnologia, moradores urbanos de 24 a 48 anos em Portugal.'
  });

  const handleGenerate = async () => {
    setIsLoading(true);
    const prodName = customProduct || activeProduct?.name || 'Smart Home Device';
    const prodCat = activeProduct?.category || 'Eletrônicos';
    const prodPrice = activeProduct?.price || 89.90;
    const prodCurr = activeProduct?.currency || 'EUR';

    try {
      const res = await fetch('/api/ai/generate-marketing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: prodName,
          category: prodCat,
          price: prodPrice,
          currency: prodCurr,
          targetCountry: countryObj.name,
          targetCity: targetCity,
          targetLanguage: countryObj.defaultLanguage
        })
      });

      const json = await res.json();
      if (json.data) {
        setGeneratedOutput(json.data);
      }
    } catch (e) {
      console.error('Error calling AI marketing generator:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
          <Sparkles className="h-4 w-4" />
          <span>Inteligência Artificial Nativa • Google Gemini 3.7 Flash</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
          AndMoney AI — Criador de Campanhas & Scripts
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Gere anúncios, textos de alta conversão e roteiros de vídeos curtos (TikTok/Reels) adaptados especificamente para a cultura e idioma de cada cidade europeia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Control Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl space-y-4">
            <h3 className="font-display text-sm font-bold text-white flex items-center gap-2">
              <Bot className="h-4 w-4 text-emerald-400" />
              <span>Configuração da Geração</span>
            </h3>

            {/* Product Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Escolher Produto do Catálogo
              </label>
              <select
                value={selectedProductId}
                onChange={e => {
                  setSelectedProductId(e.target.value);
                  setCustomProduct('');
                }}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.platformName})
                  </option>
                ))}
              </select>
            </div>

            {/* Target Market */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  País
                </label>
                <select
                  value={targetCountry}
                  onChange={e => {
                    const c = e.target.value as any;
                    setTargetCountry(c);
                    const obj = SUPPORTED_COUNTRIES.find(item => item.code === c);
                    if (obj) setTargetCity(obj.cities[0]);
                  }}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
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
                  Cidade
                </label>
                <select
                  value={targetCity}
                  onChange={e => setTargetCity(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  {countryObj.cities.map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tone Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Tom de Voz do Anúncio
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'persuasive', label: 'Persuasivo' },
                  { id: 'direct', label: 'Direto' },
                  { id: 'luxury', label: 'Premium' }
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTone(t.id as any)}
                    className={`rounded-xl py-2 text-xs font-semibold border transition-all ${
                      tone === t.id
                        ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300 font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language info badge */}
            <div className="rounded-xl bg-slate-950 p-3 border border-slate-850 flex items-center justify-between text-xs">
              <span className="text-slate-400">Idioma de Saída Automático:</span>
              <span className="font-bold text-emerald-400 uppercase font-mono">
                {countryObj.defaultLanguage} ({countryObj.name})
              </span>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-500 py-3 text-xs font-extrabold text-white hover:from-indigo-500 hover:to-emerald-400 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Gerando com Gemini 3.7 Flash...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>GERAR PEÇAS DE MARKETING</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output Panel (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {generatedOutput ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-6">
              
              {/* Header result */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{countryObj.flag}</span>
                  <div>
                    <h3 className="font-display text-base font-bold text-white">Criativos Gerados para {countryObj.name}</h3>
                    <p className="text-xs text-slate-400">Público-alvo: {generatedOutput.targetAudience}</p>
                  </div>
                </div>
                <button
                  onClick={() => onOpenCampaignModal(activeProduct)}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Usar na Campanha</span>
                </button>
              </div>

              {/* 1. Headline */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 relative group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Título Principal (Headline)</span>
                  <button
                    onClick={() => handleCopy(generatedOutput.headline, 'headline')}
                    className="text-slate-400 hover:text-white p-1 rounded-md"
                  >
                    {copiedSection === 'headline' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <p className="font-display font-bold text-base text-white">{generatedOutput.headline}</p>
              </div>

              {/* 2. Description & Bullets */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 relative group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Texto do Anúncio (Copy Persuasiva)</span>
                  <button
                    onClick={() => handleCopy(generatedOutput.description, 'description')}
                    className="text-slate-400 hover:text-white p-1 rounded-md"
                  >
                    {copiedSection === 'description' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">{generatedOutput.description}</p>

                {generatedOutput.bulletPoints && generatedOutput.bulletPoints.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-850">
                    {generatedOutput.bulletPoints.map((bp, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Video Script (TikTok / Reels / Shorts) */}
              {generatedOutput.videoScript && (
                <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-indigo-500/20">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                      <Video className="h-4 w-4 text-indigo-400" />
                      <span>Roteiro de Vídeo Curto (TikTok / Reels)</span>
                    </div>
                    <button
                      onClick={() => handleCopy(
                        `HOOK: ${generatedOutput.videoScript.hook}\nPROBLEMA: ${generatedOutput.videoScript.problem}\nSOLUÇÃO: ${generatedOutput.videoScript.solution}\nCTA: ${generatedOutput.videoScript.callToAction}`,
                        'script'
                      )}
                      className="text-indigo-400 hover:text-indigo-200 p-1"
                    >
                      {copiedSection === 'script' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-indigo-400 uppercase">0-3s Gancho (Hook):</span>
                      <p className="text-white mt-0.5 italic">"{generatedOutput.videoScript.hook}"</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-indigo-400 uppercase">3-8s Problema / Tensão:</span>
                      <p className="text-slate-300 mt-0.5">{generatedOutput.videoScript.problem}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-indigo-400 uppercase">8-15s Demonstração da Solução:</span>
                      <p className="text-slate-300 mt-0.5">{generatedOutput.videoScript.solution}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase">Chamada para Ação Final (CTA):</span>
                      <p className="text-emerald-300 font-bold mt-0.5">"{generatedOutput.videoScript.callToAction}"</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center text-slate-500">
              <Sparkles className="h-10 w-10 mx-auto mb-3 text-slate-600" />
              <p className="font-display font-bold text-base text-white">Nenhum criativo gerado ainda</p>
              <p className="text-xs text-slate-400 mt-1">Configure o produto e o mercado à esquerda e clique em "Gerar Peças de Marketing".</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
