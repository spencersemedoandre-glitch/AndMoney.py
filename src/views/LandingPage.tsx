import React from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_COUNTRIES, UPCOMING_EXPANSION_COUNTRIES } from '../data/initialData';
import {
  Globe2,
  TrendingUp,
  Bot,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Layers,
  BarChart3,
  Lock
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, setSelectedCountry, setSelectedCity, login } = useApp();

  const steps = [
    {
      step: '01',
      title: 'Escolha o mercado',
      desc: 'Selecione entre Portugal, Espanha, França, Itália, Alemanha, Reino Unido e mais de 40 cidades mapeadas.',
      icon: Globe2
    },
    {
      step: '02',
      title: 'Encontre oportunidades',
      desc: 'Nosso algoritmo analisa tendências, margens, demanda estimada e calcula o Índice de Oportunidade (0–100).',
      icon: Sparkles
    },
    {
      step: '03',
      title: 'Conecte suas plataformas',
      desc: 'Integrações seguras com Shopify, Amazon Associates, AliExpress, Awin, WooCommerce e outras redes oficiais.',
      icon: Layers
    },
    {
      step: '04',
      title: 'Crie campanhas',
      desc: 'A IA de marketing gera títulos de alta conversão, descrições, scripts de vídeo e anúncios adaptados ao idioma nativo.',
      icon: Bot
    },
    {
      step: '05',
      title: 'Acompanhe vendas e comissões',
      desc: 'Auditoria em tempo real de pedidos reais, comissões confirmadas e saques diretos para sua conta bancária.',
      icon: BarChart3
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Background glow elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-4 py-1.5 text-xs font-semibold text-emerald-300 shadow-lg shadow-emerald-950/50 mb-8 animate-in fade-in slide-in-from-bottom-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Plataforma Oficial de E-commerce Global & Automação</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Seu centro global de oportunidades de <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">e-commerce</span>.
          </h1>

          {/* Slogan & Subtitle */}
          <p className="mt-4 text-base sm:text-xl font-medium text-emerald-400/90 font-display">
            “Encontre oportunidades. Automatize sua operação. Venda globalmente.”
          </p>

          <p className="mt-4 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Descubra produtos em tendência, analise mercados locais e inicie campanhas automatizadas através de integrações oficiais e autorizadas.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setCurrentView('auth_register')}
              className="w-full sm:w-auto rounded-xl bg-emerald-500 px-8 py-4 text-sm font-extrabold text-slate-950 hover:bg-emerald-400 shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              CRIAR CONTA GRATUITA
            </button>
            <button
              onClick={() => setCurrentView('auth_login')}
              className="w-full sm:w-auto rounded-xl border border-slate-700 bg-slate-900/80 px-8 py-4 text-sm font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
            >
              ENTRAR NO SISTEMA
            </button>
          </div>

          {/* Live Preview Teaser Card */}
          <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-8 backdrop-blur-md shadow-2xl max-w-5xl mx-auto text-left">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-emerald-400 animate-ping"></span>
                  <h3 className="font-display font-bold text-lg text-white">Painel Operacional em Tempo Real</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">Conectado a APIs oficiais de 6 mercados europeus</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
                  ✓ Sem Dados Fictícios
                </span>
                <span className="rounded-lg bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-400">
                  ✓ Anti-Spam & Anti-Fraude
                </span>
              </div>
            </div>

            {/* Quick stats banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Mercados Ativos</span>
                <p className="font-display text-2xl font-bold text-white mt-1">6 Países</p>
                <span className="text-[10px] text-emerald-400 font-medium">+7 em expansão</span>
              </div>
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Plataformas Oficiais</span>
                <p className="font-display text-2xl font-bold text-cyan-400 mt-1">Shopify / Amazon</p>
                <span className="text-[10px] text-slate-400 font-medium">AliExpress, Awin & mais</span>
              </div>
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Potencial de Margem</span>
                <p className="font-display text-2xl font-bold text-emerald-400 mt-1">15% a 60%</p>
                <span className="text-[10px] text-emerald-400/80 font-medium">Comissão por venda</span>
              </div>
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Motor de Automação</span>
                <p className="font-display text-2xl font-bold text-indigo-400 mt-1">14 Etapas</p>
                <span className="text-[10px] text-indigo-300 font-medium">Execução auditada</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Como funciona */}
      <section className="py-20 border-t border-slate-850 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Como Funciona o AndMoney
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Do descobrimento do produto até a compensação da comissão em sua carteira em 5 passos transparentes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {steps.map(s => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-colors group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400">{s.step}</span>
                    </div>
                    <h3 className="font-display text-base font-bold text-white mb-2">{s.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section: Mercados disponíveis */}
      <section className="py-20 border-t border-slate-850">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Expansão Europeia & Global</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
              Mercados Disponíveis
            </h2>
            <p className="mt-2 text-slate-400 text-sm">
              Cada mercado possui moeda, formatação de preços e catálogo local adaptados automaticamente.
            </p>
          </div>

          {/* 6 Initial Countries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUPPORTED_COUNTRIES.map(country => (
              <div
                key={country.code}
                onClick={() => {
                  setSelectedCountry(country.code);
                  setSelectedCity(country.cities[0]);
                  setCurrentView('auth_register');
                }}
                className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-emerald-500/50 hover:bg-slate-900 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {country.name}
                      </h3>
                      <p className="text-xs text-slate-400">{country.currencySymbol} ({country.currency}) • {country.cities.length} cidades mapeadas</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                    ATIVO
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-850 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Tamanho do Mercado:</span>
                    <span className="font-bold text-slate-200">{country.marketSize}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Crescimento do E-commerce:</span>
                    <span className="font-bold text-emerald-400">{country.ecommerceGrowth}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-850 flex flex-wrap gap-1.5">
                  {country.cities.slice(0, 4).map(city => (
                    <span key={city} className="rounded-md bg-slate-950 px-2 py-0.5 text-[11px] text-slate-400 border border-slate-800">
                      {city}
                    </span>
                  ))}
                  {country.cities.length > 4 && (
                    <span className="rounded-md bg-slate-950 px-2 py-0.5 text-[11px] text-emerald-400 font-medium border border-slate-800">
                      +{country.cities.length - 4} mais
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Markets Roadmap */}
          <div className="mt-12 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 p-6 text-center">
            <p className="text-xs font-semibold text-slate-400 mb-3">
              Arquitetura preparada para ativação nas próximas fases:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {UPCOMING_EXPANSION_COUNTRIES.map(uc => (
                <div key={uc.code} className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-1.5 text-xs text-slate-300 border border-slate-800">
                  <span>{uc.flag}</span>
                  <span>{uc.name}</span>
                  <span className="text-[10px] text-slate-400">(Em breve)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fundamental Rules & Trust */}
      <section className="py-16 border-t border-slate-850 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-2">
            <Lock className="h-6 w-6" />
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Nossa Regra Fundamental de Integridade
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            O AndMoney é um sistema <strong>REAL</strong>. Nunca inventamos pedidos, cliques, saldos ou comissões fictícias. Todas as vendas e comissões provêm diretamente dos dados das plataformas integradas e de autorizações oficiais, sem spam e com auditoria rigorosa.
          </p>
          <div className="pt-4">
            <button
              onClick={() => setCurrentView('auth_register')}
              className="rounded-xl bg-emerald-500 px-8 py-3.5 text-xs font-extrabold text-slate-950 hover:bg-emerald-400 shadow-xl shadow-emerald-500/20 transition-all"
            >
              CRIAR CONTA & COMEÇAR AGORA
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-850 py-8 text-center text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-white">AND<span className="text-emerald-400">MONEY</span></span>
            <span>• Hub Global de E-commerce & Afiliados</span>
          </div>
          <div className="flex gap-6 text-slate-400">
            <button onClick={() => setCurrentView('support')} className="hover:text-white">Central de Ajuda</button>
            <button onClick={() => setCurrentView('antifraud')} className="hover:text-white">Anti-Fraude</button>
            <button onClick={() => setCurrentView('auth_login')} className="hover:text-white">Acesso do Operador</button>
          </div>
          <p>© 2026 AndMoney Inc. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};
