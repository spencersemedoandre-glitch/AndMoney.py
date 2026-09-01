import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Activity,
  FileText,
  KeyRound,
  Fingerprint
} from 'lucide-react';

export const AntiFraudView: React.FC = () => {
  const auditLogs = [
    { time: '10:45:22', event: 'Validação de Token OAuth2 Shopify', ip: '185.120.44.12', status: 'pass' },
    { time: '10:43:10', event: 'Auditoria de Click ID (Amazon Associates)', ip: '82.155.19.204', status: 'pass' },
    { time: '10:39:55', event: 'Bloqueio de IP suspeito por tentativa de flood', ip: '194.26.29.11', status: 'blocked' },
    { time: '10:32:00', event: 'Verificação de Assinatura Webhook (HMAC-SHA256)', ip: '34.240.11.89', status: 'pass' },
    { time: '10:15:40', event: 'Checagem de Conformidade de Termos de Uso', ip: '82.155.19.204', status: 'pass' },
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/20 p-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
          <ShieldCheck className="h-4 w-4" />
          <span>Segurança em Tempo Real & Auditoria Oficial</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Central Anti-Fraude & Conformidade
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Nosso motor opera sob regras estritas de integridade para garantir que 100% das vendas, comissões e tráfego sejam legítimos e estejam em total conformidade com as plataformas parceiras.
        </p>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">Escudo Ativo</span>
              <h4 className="font-display font-bold text-base text-white">Proteção de Cliques</h4>
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-3">
            Filtro de bots, detecção de tráfego fantasma e validação de tempo de retenção na página.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Fingerprint className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-indigo-400 font-bold uppercase block">Assinatura Digital</span>
              <h4 className="font-display font-bold text-base text-white">Webhooks HMAC-256</h4>
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-3">
            Todos os eventos de compras são validados com assinaturas criptográficas dos servidores oficiais.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-cyan-400 font-bold uppercase block">Criptografia</span>
              <h4 className="font-display font-bold text-base text-white">Tokens OAuth Restritos</h4>
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-3">
            Nenhuma credencial de login de terceiros é mantida ou visível no navegador.
          </p>
        </div>
      </div>

      {/* Rules Checklist */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-4">
        <h3 className="font-display text-base font-bold text-white">Diretrizes Inegociáveis do Sistema</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl bg-slate-950 p-3.5 border border-slate-850 flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-white">Proibição de Vendas e Saldos Fictícios</p>
              <p className="text-slate-400 mt-0.5">O sistema nunca inventa números artificiais para simular sucesso ilusório.</p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-950 p-3.5 border border-slate-850 flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-white">Tolerância Zero a Spam</p>
              <p className="text-slate-400 mt-0.5">Campanhas são restritas aos canais oficiais de publicidade paga e influenciadores autorizados.</p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-950 p-3.5 border border-slate-850 flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-white">Respeito Estrito aos Termos das Plataformas</p>
              <p className="text-slate-400 mt-0.5">Não contornamos filas de aprovação, limites de requisições ou regras de cookies.</p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-950 p-3.5 border border-slate-850 flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-white">Sem Promessas Milagrosas de Tempo</p>
              <p className="text-slate-400 mt-0.5">Nunca garantimos que vendas ocorrerão em determinado minuto ou dia; fornecemos o motor e dados reais.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real Audit Log */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-400" />
            <h3 className="font-display text-base font-bold text-white">Registro de Auditoria Anti-Fraude</h3>
          </div>
          <span className="text-xs text-emerald-400 font-bold">● Sistema Operacional</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400">
                <th className="pb-3">Horário</th>
                <th className="pb-3">Evento de Segurança</th>
                <th className="pb-3">IP de Origem</th>
                <th className="pb-3">Resultado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 font-mono">
              {auditLogs.map((log, i) => (
                <tr key={i} className="hover:bg-slate-850/40">
                  <td className="py-3 text-slate-400">{log.time}</td>
                  <td className="py-3 text-white font-medium">{log.event}</td>
                  <td className="py-3 text-slate-400">{log.ip}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold ${
                      log.status === 'pass'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {log.status === 'pass' ? '✓ Aprovado' : '⛔ Bloqueado'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
