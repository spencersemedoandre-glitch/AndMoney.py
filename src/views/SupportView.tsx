import React, { useState } from 'react';
import {
  HelpCircle,
  MessageSquare,
  FileQuestion,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Send,
  LifeBuoy
} from 'lucide-react';

export const SupportView: React.FC = () => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const faqs = [
    {
      q: 'Como o AndMoney calcula as comissões?',
      a: 'As comissões são transmitidas diretamente pelas APIs oficiais das redes de afiliados (Amazon, Awin, Shopify, etc.). O saldo só se torna Disponível após o término do período de garantia de entrega da respectiva loja.'
    },
    {
      q: 'Por que não posso inventar vendas fictícias no sistema?',
      a: 'O AndMoney foi construído sobre uma premissa inegociável de transparência. Toda métrica e saldo exibido provém de pedidos reais de clientes com comprovante oficial e tracking de entrega.'
    },
    {
      q: 'Como funciona a geração de criativos pela IA?',
      a: 'Nossa IA (Google Gemini 3.7 Flash) analisa os dados do produto, identifica o país e cidade alvo, e formula títulos, textos de anúncios e roteiros de vídeos no idioma nativo com alta persuasão.'
    },
    {
      q: 'Quais métodos de saque estão disponíveis?',
      a: 'Transferência Bancária SEPA / IBAN (para países da Zona do Euro e Reino Unido), Wise, PayPal Comercial e Revolut Pay.'
    }
  ];

  const handleSendTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;
    setIsSent(true);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/20 p-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
          <HelpCircle className="h-4 w-4" />
          <span>Suporte & Documentação Oficial</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Central de Ajuda & Suporte ao Operador
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Tire dúvidas sobre integrações, termos de afiliados, prazos de compensação bancária e boas práticas de automação.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: FAQ (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
            <FileQuestion className="h-5 w-5 text-emerald-400" />
            <span>Perguntas Frequentes (FAQ)</span>
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
                <h4 className="font-display font-bold text-sm text-white mb-2">{faq.q}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Contact / Ticket form (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-4">
            <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-cyan-400" />
              <span>Abrir Chamado de Suporte</span>
            </h3>

            {isSent ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
                <h4 className="font-display font-bold text-sm text-white">Chamado Registrado!</h4>
                <p className="text-xs text-slate-300">
                  Nossa equipe de suporte técnico e de afiliados responderá dentro de 2 a 4 horas úteis.
                </p>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setTicketSubject('');
                    setTicketMessage('');
                  }}
                  className="mt-3 text-xs text-emerald-400 font-bold hover:underline"
                >
                  Novo chamado
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendTicket} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Assunto do Chamado
                  </label>
                  <input
                    type="text"
                    value={ticketSubject}
                    onChange={e => setTicketSubject(e.target.value)}
                    placeholder="Ex: Dúvida sobre conciliação de venda na Amazon"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Descrição Detalhada
                  </label>
                  <textarea
                    rows={4}
                    value={ticketMessage}
                    onChange={e => setTicketMessage(e.target.value)}
                    placeholder="Explique o que aconteceu, incluindo números de pedidos se houver..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-xs font-extrabold text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                >
                  <Send className="h-4 w-4" />
                  <span>ENVIAR CHAMADO AO SUPORTE</span>
                </button>
              </form>
            )}

            {/* Platform status indicator */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Status das Redes</span>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Shopify & WooCommerce APIs:</span>
                  <span className="text-emerald-400 font-semibold">● 100% Operacional</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Amazon Associates Webhooks:</span>
                  <span className="text-emerald-400 font-semibold">● 100% Operacional</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>AndMoney AI Server Gateway:</span>
                  <span className="text-emerald-400 font-semibold">● 100% Operacional</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
