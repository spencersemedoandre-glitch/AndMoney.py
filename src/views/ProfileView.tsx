import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_COUNTRIES } from '../data/initialData';
import {
  User,
  ShieldCheck,
  KeyRound,
  Globe2,
  Bell,
  Save,
  CheckCircle2,
  Lock,
  LogOut
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    user,
    selectedCurrency,
    setSelectedCurrency,
    selectedCountry,
    setSelectedCountry,
    logout,
    addNotification
  } = useApp();

  const [name, setName] = useState(user?.name || 'Operador Principal');
  const [email, setEmail] = useState(user?.email || 'operador@andmoney.com');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    addNotification({
      type: 'campaign_approved',
      title: 'Perfil Atualizado',
      message: 'Suas preferências e dados de conta foram gravados com sucesso.',
      read: false
    });
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/20 p-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
          <User className="h-4 w-4" />
          <span>Segurança da Conta & Preferências</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Configurações do Meu Perfil
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Gerencie suas credenciais de acesso, preferências de mercado e definições financeiras.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Personal Details */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-4">
          <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
            <User className="h-5 w-5 text-emerald-400" />
            <span>Dados do Operador</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Nome Completo
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                E-mail de Acesso
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Currency & Regional Preferences */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-4">
          <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-cyan-400" />
            <span>Preferências Regionais & Moeda</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Moeda Padrão de Exibição
              </label>
              <select
                value={selectedCurrency}
                onChange={e => setSelectedCurrency(e.target.value as any)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none font-mono"
              >
                <option value="EUR">EUR (€) — Euro Europeu</option>
                <option value="GBP">GBP (£) — Libra Esterlina</option>
                <option value="USD">USD ($) — Dólar Americano</option>
                <option value="BRL">BRL (R$) — Real Brasileiro</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                País Principal de Operação
              </label>
              <select
                value={selectedCountry}
                onChange={e => setSelectedCountry(e.target.value as any)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
              >
                {SUPPORTED_COUNTRIES.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name} ({c.cities[0]})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Security & Protection */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-4">
          <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <span>Segurança da Conta & Criptografia</span>
          </h3>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-850">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-xs text-white">Sessão Criptografada (TLS / AES-256)</p>
                <p className="text-[11px] text-slate-400">Conexão protegida de ponta a ponta com as APIs oficiais dos parceiros.</p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Ativo
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-xs font-bold text-rose-300 hover:bg-rose-500/20 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Encerrar Sessão</span>
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-xs font-extrabold text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
          >
            {saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            <span>{saved ? 'Alterações Salvas!' : 'Salvar Alterações'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
