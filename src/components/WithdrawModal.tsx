import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WithdrawalMethodType } from '../types';
import {
  X,
  Wallet,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Building2,
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose }) => {
  const { wallet, formatCurrency, requestWithdrawal, selectedCurrency, selectedCountry } = useApp();

  const [amount, setAmount] = useState<string>('');
  const [method, setMethod] = useState<WithdrawalMethodType>('bank_transfer');
  const [details, setDetails] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const available = wallet?.availableBalance ?? 0;
  const numAmount = parseFloat(amount) || 0;
  const fee = 1.50;
  const net = Math.max(0, numAmount - fee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (numAmount < 10) {
      setError('O valor mínimo para saque é de ' + formatCurrency(10));
      return;
    }

    if (numAmount > available) {
      setError('Valor solicitado excede o Saldo Disponível de ' + formatCurrency(available));
      return;
    }

    if (!details.trim()) {
      setError('Preencha os dados da conta / endereço de recebimento');
      return;
    }

    const success = requestWithdrawal(numAmount, method, details);
    if (success) {
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    } else {
      setError('Não foi possível processar a solicitação.');
    }
  };

  const getMethodLabel = (m: WithdrawalMethodType) => {
    switch (m) {
      case 'bank_transfer':
        return 'Transferência Bancária SEPA / IBAN';
      case 'wise':
        return 'Wise Transferência Internacional';
      case 'paypal':
        return 'PayPal Conta Comercial';
      case 'revolut':
        return 'Revolut Pay';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md p-4 flex items-center justify-center animate-in fade-in" onClick={onClose}>
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6 animate-in zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">Solicitar Saque</h3>
              <p className="text-xs text-slate-400">Somente comissões confirmadas oficiais</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-white">Saque Solicitado com Sucesso!</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Sua ordem de {formatCurrency(numAmount)} foi enviada para validação e será processada via {getMethodLabel(method)}.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              Concluir & Fechar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            
            {/* Available Balance Box */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Saldo Disponível (Confirmado):</span>
                <span className="font-display text-lg font-bold text-emerald-400">
                  {formatCurrency(available)}
                </span>
              </div>
              {wallet.pendingBalance > 0 && (
                <div className="mt-1 flex items-center justify-between text-[11px] text-amber-400/80">
                  <span>Saldo Pendente de Compensação:</span>
                  <span>{formatCurrency(wallet.pendingBalance)}</span>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Method Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Método de Recebimento Autorizado
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['bank_transfer', 'wise', 'paypal', 'revolut'] as WithdrawalMethodType[]).map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={`rounded-xl p-2.5 text-left text-xs font-medium border transition-all ${
                      method === m
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <p className="capitalize">{m.replace('_', ' ')}</p>
                    <span className="text-[10px] text-slate-500">Taxa: €1,50</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Valor do Saque</label>
                <button
                  type="button"
                  onClick={() => setAmount((available ?? 0).toString())}
                  className="text-[11px] font-bold text-emerald-400 hover:underline"
                >
                  Sacar Tudo
                </button>
              </div>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  min="10"
                  max={available}
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Account Details */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {method === 'bank_transfer' ? 'IBAN e Nome do Titular (SEPA)' : method === 'paypal' ? 'E-mail da Conta PayPal' : 'Dados da Conta / Identificador'}
              </label>
              <textarea
                value={details}
                onChange={e => setDetails(e.target.value)}
                placeholder={method === 'bank_transfer' ? 'Ex: PT50 0002 0123 4567 8901 2345 6 (Nome Completo)' : 'Ex: usuario@email.com'}
                rows={2}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            {/* Breakdown */}
            {numAmount > 0 && (
              <div className="rounded-xl bg-slate-950/60 p-3 text-xs space-y-1.5 border border-slate-850">
                <div className="flex justify-between text-slate-400">
                  <span>Valor Solicitado:</span>
                  <span className="font-mono text-white">{formatCurrency(numAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Taxa de Processamento Bancário:</span>
                  <span className="font-mono text-white">{formatCurrency(fee)}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold border-t border-slate-800 pt-1">
                  <span>Valor Líquido a Receber:</span>
                  <span className="font-mono">{formatCurrency(net)}</span>
                </div>
              </div>
            )}

            {/* Security note */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>Transações protegidas por criptografia bancária e auditoria anti-fraude.</span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={available <= 0 || numAmount <= 0}
              className="w-full rounded-xl bg-emerald-500 py-3 text-xs font-extrabold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/20"
            >
              CONFIRMAR SOLICITAÇÃO DE SAQUE
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
