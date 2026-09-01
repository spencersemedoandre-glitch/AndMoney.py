import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_COUNTRIES } from '../data/initialData';
import { CountryCode } from '../types';
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Globe2,
  MapPin,
  KeyRound,
  ChevronRight,
  Building2
} from 'lucide-react';

interface AuthViewProps {
  initialMode?: 'login' | 'register';
}

export const AuthView: React.FC<AuthViewProps> = ({ initialMode = 'login' }) => {
  const { login, register, resetPassword, setCurrentView, selectedCountry, setSelectedCountry } = useApp();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState<CountryCode>(selectedCountry || 'DE');
  
  const currentCountryInfo = SUPPORTED_COUNTRIES.find(c => c.code === country) || SUPPORTED_COUNTRIES[0];
  const [city, setCity] = useState<string>(currentCountryInfo.cities[0] || 'Berlim');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCountryChange = (newCountryCode: CountryCode) => {
    setCountry(newCountryCode);
    setSelectedCountry(newCountryCode);
    const info = SUPPORTED_COUNTRIES.find(c => c.code === newCountryCode);
    if (info && info.cities.length > 0) {
      setCity(info.cities[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        if (!email.trim() || !password) {
          setError('Por favor, informe seu e-mail e senha de acesso.');
          setIsSubmitting(false);
          return;
        }

        const res = login(email, password);
        if (!res.success) {
          setError(res.error || 'Credenciais inválidas. Verifique seu e-mail e senha.');
        }
      } else if (mode === 'register') {
        if (!name.trim() || !email.trim() || !password) {
          setError('Preencha todos os campos obrigatórios.');
          setIsSubmitting(false);
          return;
        }

        if (password.length < 6) {
          setError('A senha deve conter no mínimo 6 caracteres.');
          setIsSubmitting(false);
          return;
        }

        if (password !== confirmPassword) {
          setError('A confirmação de senha não confere com a senha digitada.');
          setIsSubmitting(false);
          return;
        }

        if (!acceptedTerms) {
          setError('Você precisa concordar com os Termos de Uso e Integridade de Operações.');
          setIsSubmitting(false);
          return;
        }

        const res = register(name, email, password, country, city);
        if (!res.success) {
          setError(res.error || 'Não foi possível cadastrar esta conta.');
        }
      } else if (mode === 'forgot') {
        if (!email.trim()) {
          setError('Informe seu e-mail cadastrado para recuperação.');
          setIsSubmitting(false);
          return;
        }

        const res = resetPassword(email);
        if (res.success) {
          setSuccessMsg(res.message);
        } else {
          setError(res.error || 'Erro ao solicitar redefinição.');
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemo = (role: 'user' | 'admin' | 'alexandre') => {
    setError(null);
    setSuccessMsg(null);
    if (role === 'admin') {
      login('admin@andmoney.com', 'admin2026');
    } else if (role === 'alexandre') {
      login('alexandre@andmoney.io', '123456');
    } else {
      login('operador@andmoney.com', 'andmoney2026');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Dynamic background lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header with Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 px-4">
        <button
          onClick={() => setCurrentView('landing')}
          className="inline-flex items-center gap-2.5 mb-3 group focus:outline-none"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
              <span className="font-display text-xl font-black text-white">A<span className="text-emerald-400">M</span></span>
            </div>
          </div>
          <span className="font-display text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
            AND<span className="text-emerald-400">MONEY</span>
          </span>
        </button>

        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {mode === 'login' && 'Acesse sua Conta'}
          {mode === 'register' && 'Crie sua Conta Operacional'}
          {mode === 'forgot' && 'Recuperação de Senha'}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
          {mode === 'login' && 'Entre com suas credenciais para gerenciar produtos, automações e comissões globais.'}
          {mode === 'register' && 'Cadastre-se para operar no e-commerce europeu com integrações autorizadas.'}
          {mode === 'forgot' && 'Digite seu e-mail para receber as instruções seguras de redefinição de acesso.'}
        </p>
      </div>

      {/* Main Form Container */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          
          {/* Mode Switch Tabs */}
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setError(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Criar Conta
            </button>
          </div>

          {/* Feedback Alerts */}
          {error && (
            <div className="mb-4 flex items-start gap-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300 animate-in fade-in">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{error}</div>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 flex items-start gap-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-300 animate-in fade-in">
              <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{successMsg}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nome Completo / Razão Social
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ex: Alexandre Mendes"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                E-mail Oficial
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="operador@andmoney.com"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {mode === 'register' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Mercado Inicial
                  </label>
                  <div className="relative">
                    <Globe2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <select
                      value={country}
                      onChange={e => handleCountryChange(e.target.value as CountryCode)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-2 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    >
                      {SUPPORTED_COUNTRIES.map(c => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.name} ({c.currency})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Cidade Operacional
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <select
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-2 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    >
                      {currentCountryInfo.cities.map(cty => (
                        <option key={cty} value={cty}>
                          {cty}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {(mode === 'login' || mode === 'register') && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">Senha de Acesso</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('forgot');
                        setError(null);
                        setSuccessMsg(null);
                      }}
                      className="text-[11px] text-emerald-400 hover:underline"
                    >
                      Esqueceu a senha?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-10 py-2.5 text-xs text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Confirme a Senha
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repita a senha"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-10 py-2.5 text-xs text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-0"
                  />
                  <span className="text-[11px] text-slate-400">Lembrar deste dispositivo</span>
                </label>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-400" />
                  TLS 256-bit
                </span>
              </div>
            )}

            {mode === 'register' && (
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={e => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-0"
                />
                <label htmlFor="terms" className="text-[11px] text-slate-400 leading-tight">
                  Concordo com os <strong>Termos de Uso</strong> e as <strong>Políticas de Integridade</strong> (sem dados fictícios, APIs autorizadas).
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-emerald-500 py-3 text-xs font-extrabold text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {mode === 'login' && 'ENTRAR NA CONTA'}
              {mode === 'register' && 'CRIAR CONTA & IR PARA ONBOARDING'}
              {mode === 'forgot' && 'ENVIAR LINK DE RECUPERAÇÃO'}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Mode switch helper link */}
          <div className="mt-5 pt-4 border-t border-slate-800 text-center">
            {mode === 'login' && (
              <p className="text-xs text-slate-400">
                Não tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className="font-bold text-emerald-400 hover:underline"
                >
                  Cadastre-se gratuitamente
                </button>
              </p>
            )}
            {mode === 'register' && (
              <p className="text-xs text-slate-400">
                Já possui uma conta?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className="font-bold text-emerald-400 hover:underline"
                >
                  Fazer Login
                </button>
              </p>
            )}
            {mode === 'forgot' && (
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError(null);
                  setSuccessMsg(null);
                }}
                className="text-xs font-semibold text-slate-400 hover:text-white"
              >
                ← Voltar para o Login
              </button>
            )}
          </div>

          {/* Quick 1-Click Access for Review */}
          <div className="mt-5 pt-4 border-t border-slate-800/80">
            <p className="text-[10px] text-center font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Contas de Teste Pré-Configuradas
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('alexandre')}
                className="rounded-lg bg-slate-800/70 hover:bg-slate-800 p-2 text-left border border-slate-700/80 transition-colors group"
              >
                <div className="font-bold text-[11px] text-white flex items-center justify-between">
                  <span>Alexandre</span>
                  <ChevronRight className="h-3 w-3 text-slate-500 group-hover:text-emerald-400" />
                </div>
                <div className="text-[10px] text-slate-400 truncate">Operador Padrão</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('user')}
                className="rounded-lg bg-slate-800/70 hover:bg-slate-800 p-2 text-left border border-slate-700/80 transition-colors group"
              >
                <div className="font-bold text-[11px] text-white flex items-center justify-between">
                  <span>Operador</span>
                  <ChevronRight className="h-3 w-3 text-slate-500 group-hover:text-emerald-400" />
                </div>
                <div className="text-[10px] text-slate-400 truncate">Operador Global</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 p-2 text-left border border-indigo-500/30 transition-colors group"
              >
                <div className="font-bold text-[11px] text-indigo-200 flex items-center justify-between">
                  <span>Admin Root</span>
                  <ChevronRight className="h-3 w-3 text-indigo-400 group-hover:text-white" />
                </div>
                <div className="text-[10px] text-indigo-300/70 truncate">Acesso Geral</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
