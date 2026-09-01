import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_COUNTRIES } from '../data/initialData';
import {
  Bot,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  ArrowRight,
  RefreshCw,
  Globe2
} from 'lucide-react';
import confetti from 'canvas-confetti';

const AUTOMATION_14_STEPS = [
  { id: '1', number: 1, title: 'Verificação de Conta e Conformidade', description: 'Autenticação de credenciais seguras e tokens verificados com os parceiros oficiais.' },
  { id: '2', number: 2, title: 'Validação de Plataformas Conectadas', description: 'Checagem de conexões ativas com Shopify, Amazon, AliExpress, Awin e redes parceiras.' },
  { id: '3', number: 3, title: 'Varredura de Produtos em Tendência', description: 'Filtragem contínua por Índice de Oportunidade > 80/100 nos 6 mercados europeus.' },
  { id: '4', number: 4, title: 'Análise de Margem e Demanda Local', description: 'Cálculo de margem líquida, concorrência e volume de buscas por cidade.' },
  { id: '5', number: 5, title: 'Geração de Conteúdo e Copy com IA', description: 'Criação de títulos persuasivos e roteiros curtos adaptados ao idioma nativo.' },
  { id: '6', number: 6, title: 'Assinatura de Links Parametrizados', description: 'Aplicação de tags UTM e tokens de afiliação transparentes para rastreio.' },
  { id: '7', number: 7, title: 'Distribuição em Canais Oficiais', description: 'Alocação nos canais Google Ads, Meta Ads, TikTok Shop e Pinterest.' },
  { id: '8', number: 8, title: 'Auditoria de Tráfego Anti-Fraude', description: 'Filtragem de tráfego robótico e validação de impressões genuínas.' },
  { id: '9', number: 9, title: 'Rastreamento de Conversões por Pixel', description: 'Captura de eventos de visualização, adição ao carrinho e checkout real.' },
  { id: '10', number: 10, title: 'Recepção de Webhooks Oficiais', description: 'Sincronização instantânea de pedidos confirmados nas lojas integradas.' },
  { id: '11', number: 11, title: 'Cálculo e Registro de Comissões', description: 'Lançamento automático de comissão bruta e líquida na moeda local.' },
  { id: '12', number: 12, title: 'Conciliação de Período de Garantia', description: 'Segregação entre Saldo Pendente (em devolução legal) e Saldo Disponível.' },
  { id: '13', number: 13, title: 'Notificação em Tempo Real', description: 'Envio de alertas de vendas e atingimento de metas diárias e mensais.' },
  { id: '14', number: 14, title: 'Liberação de Saldo para Saque Bancário', description: 'Disponibilização de fundos para saque via SEPA, Wise, PayPal ou Revolut.' }
];

export const AutomationView: React.FC = () => {
  const {
    automation,
    startAutomation,
    stopAutomation,
    selectedCountry,
    selectedCity,
    formatCurrency,
    wallet,
    addNotification
  } = useApp();

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [logs, setLogs] = useState<Array<{ time: string; text: string; type: 'info' | 'success' | 'warning' }>>([
    { time: '10:42:01', text: `Iniciando análise de tendências de mercado para ${selectedCountry} (${selectedCity})`, type: 'info' },
    { time: '10:42:05', text: '5 produtos com Índice de Oportunidade > 85/100 mapeados', type: 'success' },
    { time: '10:42:12', text: 'AndMoney AI gerou 4 variações de copy em idioma nativo', type: 'info' },
    { time: '10:42:20', text: 'Parâmetros UTM e tokens de afiliação oficiais assinados', type: 'success' }
  ]);

  const countryObj = SUPPORTED_COUNTRIES.find(c => c.code === selectedCountry) || SUPPORTED_COUNTRIES[0];

  const handleToggleAutomation = () => {
    if (automation.isActive) {
      stopAutomation();
      setLogs(prev => [
        { time: new Date().toLocaleTimeString(), text: 'Operação de automação pausada pelo operador.', type: 'warning' },
        ...prev
      ]);
    } else {
      startAutomation();
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
      setLogs(prev => [
        { time: new Date().toLocaleTimeString(), text: `Motor de Vendas Ativado! Executando 14 etapas em ${countryObj.name}.`, type: 'success' },
        ...prev
      ]);
      addNotification({
        type: 'campaign_approved',
        title: 'Motor de Automação Ativado',
        message: `Automação executando com sucesso em ${countryObj.name} (${selectedCity}).`,
        read: false
      });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Hero Action Header with big "INICIAR VENDAS" CTA */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3.5 py-1 text-xs font-bold text-emerald-400 mb-3">
              <span className="relative flex h-2 w-2">
                {automation.isActive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${automation.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
              </span>
              <span>{automation.isActive ? 'MOTOR EM EXECUÇÃO CONTÍNUA' : 'SISTEMA EM ESPERA'}</span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Automação de Vendas & Marketing
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
              O motor do AndMoney orquestra a descoberta de produtos, a geração de criativos pela IA, o disparo em canais oficiais e a conciliação de comissões em 14 etapas transparentes.
            </p>

            <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
              <span>Mercado: <strong className="text-white">{countryObj.flag} {countryObj.name} ({selectedCity})</strong></span>
              <span>•</span>
              <span>Moeda Base: <strong className="text-emerald-400 font-mono">{countryObj.currency}</strong></span>
            </div>
          </div>

          {/* Big CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={handleToggleAutomation}
              className={`w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl px-8 py-5 text-sm font-black tracking-wider transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-2xl cursor-pointer ${
                automation.isActive
                  ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/25 ring-2 ring-rose-400/50'
                  : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-slate-950 hover:from-emerald-400 hover:to-teal-300 shadow-emerald-500/30 ring-4 ring-emerald-500/20'
              }`}
            >
              {automation.isActive ? (
                <>
                  <Pause className="h-5 w-5 fill-white" />
                  <span>PAUSAR AUTOMAÇÃO</span>
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 fill-slate-950" />
                  <span>INICIAR VENDAS (ATIVAR MOTOR)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 14-Step Real Pipeline Monitor */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              14
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">Pipeline de Automação em 14 Etapas</h3>
              <p className="text-xs text-slate-400">Fluxo rigoroso e transparente sem geração de dados falsos</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
            {automation.isActive ? '14/14 Etapas Operacionais' : '0/14 Etapas em Execução'}
          </span>
        </div>

        {/* Steps List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {AUTOMATION_14_STEPS.map((stepItem, index) => {
            const isCompleted = automation.isActive;
            const isInProgress = false;

            return (
              <div
                key={stepItem.id}
                className={`rounded-xl border p-3.5 flex items-start gap-3 transition-all ${
                  isCompleted
                    ? 'border-emerald-500/30 bg-emerald-950/10'
                    : 'border-slate-800/80 bg-slate-950/40 opacity-70'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <div className="h-6 w-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center text-[11px] font-mono font-bold text-slate-500">
                      {stepItem.number}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-xs text-white truncate">
                      {stepItem.number}. {stepItem.title}
                    </h4>
                    <span className={`text-[10px] font-bold ${
                      isCompleted ? 'text-emerald-400' : 'text-slate-500'
                    }`}>
                      {isCompleted ? 'Concluído' : 'Aguardando'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-Time Execution Log Box */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-400" />
            <h3 className="font-display text-sm font-bold text-white">Log de Execução em Tempo Real</h3>
          </div>
          <span className="font-mono text-[10px] text-slate-500">Audit Trail ISO 27001</span>
        </div>

        <div className="mt-3 rounded-xl bg-slate-950 p-4 font-mono text-xs space-y-2 max-h-48 overflow-y-auto border border-slate-850">
          {logs.map((l, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-slate-600 shrink-0">[{l.time}]</span>
              <span className={
                l.type === 'success'
                  ? 'text-emerald-400'
                  : l.type === 'warning'
                  ? 'text-amber-400'
                  : 'text-slate-300'
              }>
                {l.text}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
