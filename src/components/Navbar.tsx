import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_COUNTRIES } from '../data/initialData';
import {
  Globe,
  Bell,
  Sun,
  Moon,
  ShieldCheck,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  Zap,
  Activity,
  Layers
} from 'lucide-react';
import { CountryCode, LanguageCode, CurrencyCode } from '../types';

interface NavbarProps {
  onOpenNotifications: () => void;
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNotifications, onOpenMobileMenu }) => {
  const {
    user,
    isAuthenticated,
    isAdmin,
    theme,
    toggleTheme,
    selectedCountry,
    selectedCity,
    selectedLanguage,
    selectedCurrency,
    setSelectedCountry,
    setSelectedCity,
    setSelectedLanguage,
    setSelectedCurrency,
    notifications,
    logout,
    setCurrentView,
    automation
  } = useApp();

  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const currentCountryObj = SUPPORTED_COUNTRIES.find(c => c.code === selectedCountry) || SUPPORTED_COUNTRIES[0];
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView(isAuthenticated ? 'dashboard' : 'landing')}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20 transition-transform group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <span className="font-display text-xl font-black tracking-tight text-white">A<span className="text-emerald-400">M</span></span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  AND<span className="text-emerald-400 font-extrabold">MONEY</span>
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                  GLOBAL HUB
                </span>
              </div>
              <p className="hidden text-[10px] text-slate-400 sm:block">
                E-commerce & Marketing Automatizado
              </p>
            </div>
          </button>
        </div>

        {/* Center: Live Automation Status Pill (if logged in) */}
        {isAuthenticated && (
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setCurrentView('automation')}
              className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium border transition-all ${
                automation.isActive
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 shadow-sm shadow-emerald-900/20'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`relative flex h-2 w-2`}>
                {automation.isActive && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${automation.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
              </span>
              <span>{automation.isActive ? 'Automação Ativa' : 'Automação Pausada'}</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300 font-semibold">{currentCountryObj.flag} {selectedCity}</span>
            </button>
          </div>
        )}

        {/* Right Actions & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Country / Market Quick Switcher */}
          <div className="relative">
            <button
              onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
              className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:border-slate-700 hover:bg-slate-800 transition-all focus:outline-none"
              title="Mudar País e Mercado Alvo"
            >
              <span className="text-base leading-none">{currentCountryObj.flag}</span>
              <span className="hidden sm:inline-block font-semibold">{currentCountryObj.name}</span>
              <span className="text-slate-400 text-[11px] font-mono">({selectedCurrency})</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {countryDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-800 bg-slate-900 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-xs font-bold text-slate-200">Selecionar Mercado Alvo</p>
                  <p className="text-[11px] text-slate-400">Adapta moeda, cidades e produtos disponíveis</p>
                </div>
                <div className="mt-1 max-h-60 overflow-y-auto space-y-1">
                  {SUPPORTED_COUNTRIES.map(country => (
                    <button
                      key={country.code}
                      onClick={() => {
                        setSelectedCountry(country.code);
                        setSelectedCity(country.cities[0]);
                        setSelectedCurrency(country.currency);
                        setSelectedLanguage(country.defaultLanguage);
                        setCountryDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors ${
                        selectedCountry === country.code
                          ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{country.flag}</span>
                        <div className="text-left">
                          <p className="font-medium text-slate-200">{country.name}</p>
                          <p className="text-[10px] text-slate-400">{country.cities[0]} • {country.currencySymbol} ({country.currency})</p>
                        </div>
                      </div>
                      {selectedCountry === country.code && (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => {
                      setCurrentView('markets');
                      setCountryDropdownOpen(false);
                    }}
                    className="w-full text-center text-[11px] text-emerald-400 hover:underline py-1 font-medium"
                  >
                    Ver todos os 6 mercados & expansão →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors"
            title="Alternar Modo Escuro / Claro"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
          </button>

          {/* Notifications Button */}
          {isAuthenticated && (
            <button
              onClick={onOpenNotifications}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors"
              title="Notificações em Tempo Real"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
          )}

          {/* Auth / Profile Area */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 p-1.5 sm:px-2.5 text-xs font-medium text-slate-200 hover:border-slate-700 transition-all focus:outline-none"
              >
                <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold text-xs">
                  {user?.name ? user.name.charAt(0) : 'U'}
                </div>
                <span className="hidden md:inline-block font-semibold">{user?.name}</span>
                {isAdmin && (
                  <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-bold text-indigo-300 border border-indigo-500/30">
                    ADMIN
                  </span>
                )}
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-800 bg-slate-900 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="text-xs font-bold text-slate-200">{user?.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                    <span className="inline-block mt-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ✓ Conta Oficial Verificada
                    </span>
                  </div>

                  <div className="py-1 space-y-1">
                    <button
                      onClick={() => {
                        setCurrentView('profile');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <User className="h-3.5 w-3.5 text-slate-400" />
                      <span>Meu Perfil & Segurança</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentView('wallet');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <Zap className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Minha Carteira & Saques</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentView('antifraud');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Central Anti-Fraude</span>
                    </button>

                    {/* Admin Switcher */}
                    <button
                      onClick={() => {
                        setCurrentView('admin');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs text-indigo-300 hover:bg-indigo-950/40 hover:text-indigo-200 border border-indigo-500/20"
                    >
                      <div className="flex items-center gap-2">
                        <Layers className="h-3.5 w-3.5 text-indigo-400" />
                        <span>Painel Administrativo</span>
                      </div>
                      <span className="text-[9px] bg-indigo-500/30 px-1 py-0.5 rounded text-indigo-300 font-mono">ROOT</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-slate-800">
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Encerrar Sessão</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView('auth_login')}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
              >
                Entrar
              </button>
              <button
                onClick={() => setCurrentView('auth_register')}
                className="rounded-lg bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20 transition-all"
              >
                Criar Conta
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
