import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Wallet,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Building2,
  ShieldCheck,
  CreditCard,
  AlertCircle
} from 'lucide-react';

interface WalletViewProps {
  onOpenWithdrawModal: () => void;
}

const PAYMENT_METHODS = [
  {
    id: 'pm_sepa',
    accountName: 'Transferência SEPA / IBAN',
    details: 'Banco Santander / Millennium BCP •••• 9102',
    type: 'bank_transfer',
    isDefault: true
  },
  {
    id: 'pm_wise',
    accountName: 'Wise Multi-Currency Account',
    details: 'EUR & GBP Account •••• 0130',
    type: 'wise',
    isDefault: false
  },
  {
    id: 'pm_paypal',
    accountName: 'PayPal Merchant Business',
    details: 'finance@andmoney-partner.com',
    type: 'paypal',
    isDefault: false
  },
  {
    id: 'pm_revolut',
    accountName: 'Revolut Business Pro',
    details: 'Revolut Pay Tag: @andmoneypay',
    type: 'revolut',
    isDefault: false
  }
];

export const WalletView: React.FC<WalletViewProps> = ({ onOpenWithdrawModal }) => {
  const { wallet, withdrawals, formatCurrency } = useApp();

  const safeWithdrawals = withdrawals || [];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/20 p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Wallet className="h-4 w-4" />
            <span>Gestão Financeira & Comissões Oficiais</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Minha Carteira & Saques
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Acompanhe o saldo consolidado, comissões em compensação e solicite transferências bancárias.
          </p>
        </div>

        <button
          onClick={onOpenWithdrawModal}
          disabled={wallet.availableBalance <= 0}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-xs font-extrabold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          <ArrowUpRight className="h-4 w-4" />
          <span>SOLICITAR SAQUE</span>
        </button>
      </div>

      {/* Primary Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Available Balance */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Saldo Disponível para Saque</span>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-extrabold text-emerald-300">
              LIBERADO
            </span>
          </div>
          <div className="mt-3">
            <span className="font-display text-3xl sm:text-4xl font-extrabold text-emerald-400">
              {formatCurrency(wallet.availableBalance)}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Pronto para transferência imediata via SEPA, Wise ou PayPal.
          </p>
        </div>

        {/* Pending Balance */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Saldo Pendente</span>
            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[9px] font-extrabold text-amber-400">
              EM COMPENSAÇÃO
            </span>
          </div>
          <div className="mt-3">
            <span className="font-display text-3xl sm:text-4xl font-extrabold text-amber-400">
              {formatCurrency(wallet.pendingBalance)}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Aguardando a janela legal de devolução / entrega da loja oficial.
          </p>
        </div>

        {/* Total Withdrawn */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total já Transferido</span>
            <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[9px] font-extrabold text-cyan-400">
              HISTÓRICO PAGO
            </span>
          </div>
          <div className="mt-3">
            <span className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              {formatCurrency(wallet.totalWithdrawn)}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Comissões pagas e liquidadas na sua conta bancária.
          </p>
        </div>
      </div>

      {/* Withdrawal Methods & Bank Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Methods Configured */}
        <div className="lg:col-span-1 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-4">
          <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
            <Building2 className="h-5 w-5 text-emerald-400" />
            <span>Métodos de Pagamento</span>
          </h3>

          <div className="space-y-2.5">
            {PAYMENT_METHODS.map(method => (
              <div
                key={method.id}
                className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{method.accountName}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{method.details}</p>
                  </div>
                </div>
                {method.isDefault && (
                  <span className="rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-bold px-1.5 py-0.5 border border-emerald-500/20">
                    PADRÃO
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Conformidade com a Diretiva Europeia PSD2 e KYC bancário.</span>
          </div>
        </div>

        {/* Withdrawal History Ledger */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 className="font-display text-base font-bold text-white">Histórico de Saques Realizados</h3>
            <span className="text-xs text-slate-400">{safeWithdrawals.length} registros</span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400">
                  <th className="pb-3">Data / Protocolo</th>
                  <th className="pb-3">Método</th>
                  <th className="pb-3">Valor Líquido</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {safeWithdrawals.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">
                      Nenhum saque solicitado até o momento.
                    </td>
                  </tr>
                ) : (
                  safeWithdrawals.map(wh => (
                    <tr key={wh.id} className="hover:bg-slate-850/40">
                      <td className="py-3 font-mono">
                        <span className="font-bold text-slate-200">
                          {wh.requestedAt ? new Date(wh.requestedAt).toLocaleDateString('pt-BR') : 'Data recente'}
                        </span>
                        <span className="block text-[10px] text-slate-500">{wh.id}</span>
                      </td>
                      <td className="py-3 text-slate-300 capitalize">{wh.method.replace('_', ' ')}</td>
                      <td className="py-3 font-mono font-bold text-emerald-400">{formatCurrency(wh.netAmount || wh.amount)}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          wh.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          <CheckCircle2 className="h-3 w-3" />
                          <span>{wh.status === 'completed' ? 'Transferido' : 'Em Análise'}</span>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
