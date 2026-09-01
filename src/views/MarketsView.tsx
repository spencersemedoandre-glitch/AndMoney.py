import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_COUNTRIES, UPCOMING_EXPANSION_COUNTRIES } from '../data/initialData';
import { CountryCode } from '../types';
import {
  Globe2,
  MapPin,
  TrendingUp,
  Search,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Building,
  DollarSign,
  Layers
} from 'lucide-react';

export const MarketsView: React.FC = () => {
  const {
    selectedCountry,
    selectedCity,
    setSelectedCountry,
    setSelectedCity,
    setSelectedCurrency,
    setSelectedLanguage,
    setCurrentView
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [citySearchTerm, setCitySearchTerm] = useState('');

  const currentCountryObj = SUPPORTED_COUNTRIES.find(c => c.code === selectedCountry) || SUPPORTED_COUNTRIES[0];

  const filteredCountries = SUPPORTED_COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCities = currentCountryObj.cities.filter(city =>
    city.toLowerCase().includes(citySearchTerm.toLowerCase())
  );

  const handleSelectCountry = (code: CountryCode) => {
    const country = SUPPORTED_COUNTRIES.find(c => c.code === code);
    if (country) {
      setSelectedCountry(code);
      setSelectedCity(country.cities[0]);
      setSelectedCurrency(country.currency);
      setSelectedLanguage(country.defaultLanguage);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/20 p-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
          <Globe2 className="h-4 w-4" />
          <span>Centros Regionais de Operação</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Mercados & Cidades Elegíveis
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          O AndMoney atua com catálogos e moedas nativas para maximizar as taxas de conversão de cada mercado europeu, com suporte a mais de 40 cidades polos.
        </p>
      </div>

      {/* Active Selected Market Spotlight */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{currentCountryObj.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                  MERCADO ATIVO
                </span>
                <span className="text-xs text-slate-400">Cidade Selecionada: <strong className="text-white">{selectedCity}</strong></span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white mt-1">
                {currentCountryObj.name} ({currentCountryObj.currencySymbol} - {currentCountryObj.currency})
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Idioma Padrão: <strong className="uppercase">{currentCountryObj.defaultLanguage}</strong> • Volume de E-commerce: <strong className="text-emerald-400">{currentCountryObj.marketSize}</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCurrentView('trending_products')}
              className="rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
            >
              Ver Produtos de {currentCountryObj.name} →
            </button>
          </div>
        </div>
      </div>

      {/* 6 Core Countries Grid */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="font-display text-lg font-bold text-white">6 Mercados Europeus Oficiais</h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar país..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCountries.map(country => {
            const isSelected = selectedCountry === country.code;
            return (
              <div
                key={country.code}
                onClick={() => handleSelectCountry(country.code)}
                className={`cursor-pointer rounded-2xl border p-5 transition-all relative overflow-hidden ${
                  isSelected
                    ? 'border-emerald-500 bg-slate-900 shadow-xl ring-1 ring-emerald-500/50'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-850">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <h4 className="font-display font-bold text-base text-white">{country.name}</h4>
                      <span className="text-xs text-slate-400 font-mono">{country.currencySymbol} ({country.currency})</span>
                    </div>
                  </div>
                  {isSelected ? (
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                      SELECIONADO
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500 hover:text-slate-300">
                      Selecionar →
                    </span>
                  )}
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Tamanho do Mercado:</span>
                    <span className="font-bold text-slate-200">{country.marketSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Crescimento Anual:</span>
                    <span className="font-bold text-emerald-400">{country.ecommerceGrowth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cidades Mapeadas:</span>
                    <span className="font-bold text-white">{country.cities.length} polos</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-850 flex flex-wrap gap-1">
                  {country.cities.slice(0, 3).map(city => (
                    <span key={city} className="rounded bg-slate-950 px-2 py-0.5 text-[10px] text-slate-400 border border-slate-800">
                      {city}
                    </span>
                  ))}
                  {country.cities.length > 3 && (
                    <span className="rounded bg-slate-950 px-2 py-0.5 text-[10px] text-emerald-400 border border-slate-800">
                      +{country.cities.length - 3} mais
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explorer of Cities for Selected Country */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-emerald-400" />
              <span>Cidades Polos em {currentCountryObj.name}</span>
            </h3>
            <p className="text-xs text-slate-400">Selecione a cidade para segmentação de campanhas de tráfego e logística local</p>
          </div>
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Filtrar cidade..."
              value={citySearchTerm}
              onChange={e => setCitySearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {filteredCities.map(city => {
            const isCitySelected = selectedCity === city;
            return (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`rounded-xl p-3 text-center border transition-all ${
                  isCitySelected
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold ring-1 ring-emerald-500/40 shadow-sm'
                    : 'border-slate-850 bg-slate-950/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <p className="text-xs font-semibold">{city}</p>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {isCitySelected ? '✓ Polo Ativo' : 'Definir como polo'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upcoming Expansion Roadmap Preview */}
      <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 p-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <h3 className="font-display text-sm font-bold text-white">Próximas Fases de Expansão Global</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          A infraestrutura técnica do AndMoney está pronta para receber os seguintes países nas próximas iterações:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {UPCOMING_EXPANSION_COUNTRIES.map(uc => (
            <div key={uc.code} className="rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-center">
              <span className="text-2xl">{uc.flag}</span>
              <p className="font-bold text-xs text-slate-200 mt-1">{uc.name}</p>
              <span className="text-[10px] font-mono text-slate-400">{uc.currency}</span>
              <span className="block mt-1 text-[9px] text-indigo-400 bg-indigo-500/10 rounded px-1 py-0.5">
                Fase 2 Roadmap
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
