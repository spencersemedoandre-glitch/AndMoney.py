import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Bell,
  CheckCircle,
  Clock,
  AlertTriangle,
  Send,
  Zap,
  CheckCheck
} from 'lucide-react';
import { AppNotification } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, setCurrentView } = useApp();
  const [filter, setFilter] = useState<'all' | 'sales' | 'system'>('all');

  if (!isOpen) return null;

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'sales') return n.type === 'sale_confirmed' || n.type === 'commission_pending';
    if (filter === 'system') return n.type !== 'sale_confirmed' && n.type !== 'commission_pending';
    return true;
  });

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'sale_confirmed':
        return <CheckCircle className="h-4 w-4 text-emerald-400" />;
      case 'commission_pending':
        return <Clock className="h-4 w-4 text-amber-400" />;
      case 'campaign_approved':
        return <Send className="h-4 w-4 text-cyan-400" />;
      case 'opportunity_alert':
        return <Zap className="h-4 w-4 text-orange-400" />;
      case 'integration_error':
        return <AlertTriangle className="h-4 w-4 text-rose-400" />;
      default:
        return <Bell className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl p-6 flex flex-col animate-in slide-in-from-right"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-100">Notificações</h3>
                <p className="text-xs text-slate-400">Eventos em tempo real e comissões</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Filters & Mark all read */}
          <div className="flex items-center justify-between py-3">
            <div className="flex gap-1.5">
              <button
                onClick={() => setFilter('all')}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  filter === 'all' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                Todas ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('sales')}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  filter === 'sales' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                Vendas & Comissões
              </button>
              <button
                onClick={() => setFilter('system')}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  filter === 'system' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                Sistema
              </button>
            </div>

            <button
              onClick={markAllNotificationsAsRead}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-400 font-medium transition-colors"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              <span>Ler todas</span>
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 mt-2">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-slate-500 text-center">
                <Bell className="h-8 w-8 mb-2 stroke-1 text-slate-600" />
                <p className="text-sm font-medium">Nenhuma notificação por aqui</p>
                <p className="text-xs text-slate-500">As atualizações de vendas e campanhas aparecerão instantaneamente.</p>
              </div>
            ) : (
              filteredNotifications.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => {
                    markNotificationAsRead(notif.id);
                    if (notif.type === 'sale_confirmed' || notif.type === 'commission_pending') {
                      setCurrentView('sales');
                      onClose();
                    } else if (notif.type === 'opportunity_alert') {
                      setCurrentView('trending_products');
                      onClose();
                    }
                  }}
                  className={`cursor-pointer rounded-xl p-3.5 border transition-all ${
                    notif.read
                      ? 'bg-slate-900/40 border-slate-800/60 opacity-80'
                      : 'bg-slate-850/90 border-slate-700/80 shadow-md ring-1 ring-emerald-500/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-slate-800 p-2 border border-slate-700/60">
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-200">{notif.title}</h4>
                        <span className="text-[10px] text-slate-500">{notif.timestamp}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-300 leading-relaxed">{notif.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
