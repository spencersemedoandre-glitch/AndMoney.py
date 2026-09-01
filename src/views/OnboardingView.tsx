import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_COUNTRIES } from '../data/initialData';
import { CountryCode, WithdrawalMethodType } from '../types';
import {
  Globe2,
  MapPin,
  Tag,
  Target,
  Link2,
  Wallet,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const OnboardingView: React.FC = () => {
  const {
    selectedCountry,
    selectedCity,
    setSelectedCountry,
    setSelectedCity,
    platforms,
    togglePlatformConnection,
    goals,
    updateMonthlyGoal,
    setCurrentView,
    formatCurrency,
    startAutomation
  } = useApp();

  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('Eletrônicos & Smart Home');
  const [monthlyTarget, setMonthlyTarget] = useState(
    (goals?.monthlyTarget ?? goals?.targetAmount ?? 3000).toString()
  );
  const [payoutMethod, setPayoutMethod] = useState<WithdrawalMethodType>('bank_transfer');
  const [payoutDetails, setPayoutDetails] = useState('PT50 0002 0123 4567 8901 2345 6');

  const countryObj = SUPPORTED_COUNTRIES.find(c => c.code === selectedCountry) || SUPPORTED_COUNTRIES[0];

  const categories = [
    { name: 'Eletrônicos & Smart Home', icon: '⚡', margin: '20-40%' },
    { name: 'Casa, Decoração & Cozinha', icon: '🏡', margin: '25-45%' },
    { name: 'Beleza, Cuidados & Skincare', icon: '✨', margin: '30-55%' },
    { name: 'Moda, Acessórios & Calçados', icon: '👔', margin: '25-50%' },
    { name: 'Fitness, Saúde & Esportes', icon: '🏋️', margin: '20-40%' },
    { name: 'Pets & Animais de Estimação', icon: '🐾', margin: '30-50%' }
  ];

  const handleFinish = () => {
    updateMonthlyGoal(parseFloat(monthlyTarget) || 3000);
    startAutomation();
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Progress header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Configuração Inicial do Hub (Passo {step} de 7)</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Personalize sua Operação no AndMoney
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Configure seus mercados, metas e integrações para iniciar com máxima eficiência.
          </p>

          {/* Progress bar */}
          <div className="mt-6 flex gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map(i => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i <= step ? 'bg-emerald-400 shadow-sm shadow-emerald-500/50' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Cards */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          
          {/* STEP 1: Escolha de país */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-400">
                <Globe2 className="h-5 w-5" />
                <h3 className="font-display text-lg font-bold text-white">Passo 1: Selecione seu País Principal</h3>
              </div>
              <p className="text-xs text-slate-400">
                Escolha o primeiro mercado europeu onde deseja atuar. Você poderá expandir para outros mercados a qualquer momento.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {SUPPORTED_COUNTRIES.map(c => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setSelectedCountry(c.code);
                      setSelectedCity(c.cities[0]);
                    }}
                    className={`rounded-xl p-4 text-left border transition-all ${
                      selectedCountry === c.code
                        ? 'border-emerald-500 bg-emerald-500/10 text-white font-bold ring-1 ring-emerald-500'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{c.flag}</span>
                        <div>
                          <p className="font-display font-bold text-sm text-white">{c.name}</p>
                          <p className="text-xs text-slate-400">Moeda: {c.currencySymbol} ({c.currency})</p>
                        </div>
                      </div>
                      {selectedCountry === c.code && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Escolha de cidade */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-400">
                <MapPin className="h-5 w-5" />
                <h3 className="font-display text-lg font-bold text-white">
                  Passo 2: Escolha a Cidade Polo em {countryObj.name}
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                O AndMoney direciona anúncios e descobre tendências locais para o público dessa cidade.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {countryObj.cities.map(city => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`rounded-xl p-3 text-center border transition-all ${
                      selectedCity === city
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold ring-1 ring-emerald-500'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xs font-semibold">{city}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Escolha de nicho/categoria */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-400">
                <Tag className="h-5 w-5" />
                <h3 className="font-display text-lg font-bold text-white">Passo 3: Escolha seu Nicho de Mercado</h3>
              </div>
              <p className="text-xs text-slate-400">
                Priorizaremos produtos de alta demanda e comissões vantajosas nessa categoria.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {categories.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`rounded-xl p-4 text-left border transition-all ${
                      selectedCategory === cat.name
                        ? 'border-emerald-500 bg-emerald-500/10 text-white font-bold ring-1 ring-emerald-500'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{cat.icon}</span>
                        <div>
                          <p className="text-xs font-bold text-white">{cat.name}</p>
                          <p className="text-[11px] text-emerald-400">Margem média: {cat.margin}</p>
                        </div>
                      </div>
                      {selectedCategory === cat.name && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Definição de meta mensal */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-400">
                <Target className="h-5 w-5" />
                <h3 className="font-display text-lg font-bold text-white">Passo 4: Defina sua Meta Mensal de Comissões</h3>
              </div>
              <p className="text-xs text-slate-400">
                O painel calculará o número de vendas necessárias e acompanhará o progresso em tempo real.
              </p>

              <div className="pt-3 max-w-md mx-auto space-y-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center">
                  <span className="text-xs text-slate-400 font-semibold">Meta de Comissões por Mês:</span>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <span className="font-display text-3xl font-extrabold text-emerald-400">
                      {countryObj.currencySymbol}
                    </span>
                    <input
                      type="number"
                      value={monthlyTarget}
                      onChange={e => setMonthlyTarget(e.target.value)}
                      className="w-40 font-display text-3xl font-extrabold text-white bg-transparent border-b border-emerald-500 focus:outline-none text-center"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  {['1500', '3000', '5000'].map(val => (
                    <button
                      key={val}
                      onClick={() => setMonthlyTarget(val)}
                      className="rounded-lg border border-slate-800 bg-slate-950/60 py-2 text-xs font-semibold text-slate-300 hover:border-slate-700"
                    >
                      {countryObj.currencySymbol} {val} / mês
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Conexão de plataformas */}
          {step === 5 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-400">
                <Link2 className="h-5 w-5" />
                <h3 className="font-display text-lg font-bold text-white">Passo 5: Conecte suas Plataformas Oficiais</h3>
              </div>
              <p className="text-xs text-slate-400">
                Selecione quais plataformas autorizadas você deseja ativar agora (você pode conectar mais depois).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {platforms.slice(0, 6).map(p => {
                  const isConnected = p.status === 'connected';
                  return (
                    <div
                      key={p.id}
                      className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.logo}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="h-8 w-8 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold text-white">{p.name}</p>
                          <p className="text-[10px] text-slate-400">{p.activeProductsCount} produtos disponíveis</p>
                        </div>
                      </div>
                      <button
                        onClick={() => togglePlatformConnection(p.id)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                          isConnected
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {isConnected ? '✓ Conectado' : 'Conectar'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: Método de recebimento */}
          {step === 6 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-400">
                <Wallet className="h-5 w-5" />
                <h3 className="font-display text-lg font-bold text-white">Passo 6: Método de Recebimento de Comissões</h3>
              </div>
              <p className="text-xs text-slate-400">
                Para onde deseja que seus saques sejam transferidos após a confirmação das vendas.
              </p>

              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['bank_transfer', 'wise', 'paypal', 'revolut'] as WithdrawalMethodType[]).map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPayoutMethod(m)}
                      className={`rounded-xl p-3 text-center border transition-all ${
                        payoutMethod === m
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <span className="text-xs capitalize">{m.replace('_', ' ')}</span>
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {payoutMethod === 'bank_transfer' ? 'IBAN Oficial' : 'E-mail / ID de Recebimento'}
                  </label>
                  <input
                    type="text"
                    value={payoutDetails}
                    onChange={e => setPayoutDetails(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Tela de Resumo e Ativação */}
          {step === 7 && (
            <div className="space-y-5 animate-in fade-in text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                <Zap className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white">Tudo Pronto para Operar!</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Confira o resumo das suas configurações antes de ativar o motor de automação do AndMoney.
                </p>
              </div>

              {/* Summary table */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-left text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Mercado & Cidade Alvo:</span>
                  <span className="font-bold text-white">{countryObj.flag} {countryObj.name} — {selectedCity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Nicho Selecionado:</span>
                  <span className="font-bold text-emerald-400">{selectedCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Meta Mensal Estabelecida:</span>
                  <span className="font-bold text-cyan-400">{countryObj.currencySymbol} {monthlyTarget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Plataformas Conectadas:</span>
                  <span className="font-bold text-white">{platforms.filter(p => p.status === 'connected').length} ativas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Método de Saque Configurado:</span>
                  <span className="font-bold text-white capitalize">{payoutMethod.replace('_', ' ')}</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 py-3.5 text-xs font-black tracking-wider text-slate-950 hover:from-emerald-400 hover:to-teal-300 shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                ATIVAR SISTEMA & IR PARA O DASHBOARD
              </button>
            </div>
          )}

          {/* Nav Buttons (Step 1-6) */}
          {step < 7 && (
            <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </button>
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
              >
                <span>Avançar</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
