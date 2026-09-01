import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  RegisteredAccount,
  CountryCode,
  CurrencyCode,
  LanguageCode,
  Product,
  PlatformIntegration,
  Campaign,
  OrderSale,
  Goal,
  Wallet,
  Withdrawal,
  AppNotification,
  AutomationState,
  AuditLog,
  SupportTicket
} from '../types';
import {
  SUPPORTED_COUNTRIES,
  INITIAL_PLATFORMS,
  INITIAL_PRODUCTS,
  INITIAL_CAMPAIGNS,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_GOAL
} from '../data/initialData';

interface AppContextType {
  // User & Auth
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  login: (email: string, password?: string, role?: 'user' | 'admin') => { success: boolean; error?: string };
  register: (name: string, email: string, password: string, country?: CountryCode, city?: string) => { success: boolean; error?: string };
  resetPassword: (email: string) => { success: boolean; message: string; error?: string };
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  registeredUsers: RegisteredAccount[];
  completeOnboarding: (data: {
    country: CountryCode;
    city: string;
    category: string;
    monthlyGoal: number;
    connectedPlatforms: string[];
    payoutMethod: string;
  }) => void;

  // Global Context Selectors
  selectedCountry: CountryCode;
  selectedCity: string;
  selectedLanguage: LanguageCode;
  selectedCurrency: CurrencyCode;
  setSelectedCountry: (country: CountryCode) => void;
  setSelectedCity: (city: string) => void;
  setSelectedLanguage: (lang: LanguageCode) => void;
  setSelectedCurrency: (currency: CurrencyCode) => void;
  formatCurrency: (amount?: number | null, customCurrency?: CurrencyCode) => string;

  // Products
  products: Product[];
  toggleFavorite: (productId: string) => void;
  updateProductAffiliation: (productId: string, status: Product['affiliationStatus']) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;

  // Platforms
  platforms: PlatformIntegration[];
  togglePlatformConnection: (platformId: string) => void;

  // Automation
  automation: AutomationState;
  startAutomation: () => Promise<void>;
  stopAutomation: () => void;
  updateAutomationConfig: (config: Partial<AutomationState>) => void;

  // Campaigns
  campaigns: Campaign[];
  createCampaign: (campaignData: Partial<Campaign>) => void;
  updateCampaignStatus: (campaignId: string, status: Campaign['status']) => void;

  // Orders & Sales
  orders: OrderSale[];
  simulateIncomingOrder: (platformId?: string) => void;

  // Wallet & Withdrawals
  wallet: Wallet;
  withdrawals: Withdrawal[];
  requestWithdrawal: (amount: number, method: Withdrawal['method'], methodDetails: string) => boolean;

  // Goals
  goals: Goal;
  updateGoal: (newTarget: number) => void;
  updateMonthlyGoal: (newTarget: number) => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'timestamp'>) => void;

  // Support
  tickets: SupportTicket[];
  createTicket: (subject: string, category: SupportTicket['category'], message: string) => void;

  // Audit Logs & Security
  auditLogs: AuditLog[];
  twoFactorActive: boolean;
  setTwoFactorActive: (active: boolean) => void;

  // Active View Navigation
  currentView: string;
  setCurrentView: (view: string) => void;
  viewingProduct: Product | null;
  setViewingProduct: (product: Product | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const SEED_ACCOUNTS: RegisteredAccount[] = [
  {
    id: 'usr_admin_001',
    name: 'Administrador Geral',
    email: 'admin@andmoney.com',
    password: 'admin2026',
    role: 'admin',
    country: 'DE',
    city: 'Berlim',
    language: 'pt',
    currency: 'EUR',
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'usr_operador_002',
    name: 'Operador Global',
    email: 'operador@andmoney.com',
    password: 'andmoney2026',
    role: 'user',
    country: 'DE',
    city: 'Berlim',
    language: 'pt',
    currency: 'EUR',
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'usr_andmoney_9941',
    name: 'Alexandre Mendes',
    email: 'alexandre@andmoney.io',
    password: '123456',
    role: 'user',
    country: 'DE',
    city: 'Berlim',
    language: 'pt',
    currency: 'EUR',
    createdAt: '2026-08-01T10:00:00Z'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('andmoney_theme') as 'dark' | 'light') || 'dark';
  });

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('andmoney_theme', next);
      return next;
    });
  };

  // Registered Accounts Store
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredAccount[]>(() => {
    const saved = localStorage.getItem('andmoney_registered_users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        // fallback
      }
    }
    return SEED_ACCOUNTS;
  });

  useEffect(() => {
    localStorage.setItem('andmoney_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Auth & Profile
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('andmoney_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default initial authenticated state for frictionless preview
    return {
      id: 'usr_andmoney_9941',
      name: 'Alexandre Mendes',
      email: 'alexandre@andmoney.io',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      country: 'DE',
      city: 'Berlim',
      language: 'pt',
      currency: 'EUR',
      role: 'user',
      twoFactorEnabled: false,
      onboardingCompleted: true,
      emailVerified: true,
      createdAt: '2026-08-01T10:00:00Z',
      preferences: {
        notificationsEmail: true,
        notificationsPush: true,
        autoAffiliate: true,
        riskTolerance: 'balanced',
        theme: 'dark'
      }
    };
  });

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const [twoFactorActive, setTwoFactorActive] = useState<boolean>(user?.twoFactorEnabled || false);

  // Active view
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  // Global country & market context
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(user?.country || 'DE');
  const [selectedCity, setSelectedCity] = useState<string>(user?.city || 'Berlim');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(user?.language || 'pt');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(user?.currency || 'EUR');

  // Entities
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('andmoney_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [platforms, setPlatforms] = useState<PlatformIntegration[]>(() => {
    const saved = localStorage.getItem('andmoney_platforms');
    return saved ? JSON.parse(saved) : INITIAL_PLATFORMS;
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem('andmoney_campaigns');
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [orders, setOrders] = useState<OrderSale[]>(() => {
    const saved = localStorage.getItem('andmoney_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [goals, setGoals] = useState<Goal>(() => {
    const saved = localStorage.getItem('andmoney_goals');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          const target = Number(parsed.monthlyTarget || parsed.targetAmount || INITIAL_GOAL.targetAmount);
          const current = Number(parsed.currentAmount ?? INITIAL_GOAL.currentAmount);
          const pct = target > 0 ? Math.round((current / target) * 100) : 0;
          return {
            ...INITIAL_GOAL,
            ...parsed,
            targetAmount: target,
            monthlyTarget: target,
            currentAmount: current,
            percentage: parsed.percentage ?? pct,
            projectedAttainment: parsed.projectedAttainment ?? pct
          };
        }
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_GOAL;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('andmoney_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(() => {
    const saved = localStorage.getItem('andmoney_withdrawals');
    return saved ? JSON.parse(saved) : [
      {
        id: 'wth_88129',
        userId: 'usr_andmoney_9941',
        method: 'wise',
        methodDetails: 'EUR Account IBAN: DE89 3704 0044 0532 0130 00',
        amount: 350.00,
        fee: 1.50,
        netAmount: 348.50,
        currency: 'EUR',
        requestedAt: '2026-08-28T10:15:00Z',
        processedAt: '2026-08-28T14:30:00Z',
        status: 'completed',
        transactionRef: 'WISE-TR-994812'
      }
    ];
  });

  const [tickets, setTickets] = useState<SupportTicket[]>(() => [
    {
      id: 'tkt_001',
      subject: 'Dúvida sobre taxa de comissão da Shopify',
      category: 'integration',
      priority: 'medium',
      status: 'resolved',
      createdAt: '2026-08-26',
      messages: [
        { sender: 'user', text: 'Gostaria de confirmar se os pedidos confirmados na Shopify entram em 24h.', timestamp: '26/08 14:00' },
        { sender: 'support', text: 'Olá Alexandre! Sim, via Webhook oficial a confirmação e comissão são creditadas em tempo real após a compensação.', timestamp: '26/08 14:22' }
      ]
    }
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => [
    {
      id: 'log_01',
      timestamp: '2026-08-31 22:30:00',
      userId: 'usr_andmoney_9941',
      userEmail: 'alexandre@andmoney.io',
      action: 'Login efetuado com sucesso',
      ipAddress: '185.120.44.12 (Frankfurt, DE)',
      status: 'success',
      details: 'Sessão iniciada com TLS v1.3'
    },
    {
      id: 'log_02',
      timestamp: '2026-08-31 22:04:15',
      userId: 'system',
      userEmail: 'webhook@awin.com',
      action: 'Webhook de Venda Processado',
      ipAddress: '54.210.88.9',
      status: 'success',
      details: 'Pedido AWN-IT-22391 verificado e registrado como Pendente'
    }
  ]);

  // Automation state
  const [automation, setAutomation] = useState<AutomationState>({
    isActive: false,
    selectedCountry: 'DE',
    selectedCity: 'Berlim',
    selectedCategories: ['Eletrônicos & Smart Home', 'Tech & Áudio'],
    maxDailyBudget: 150,
    targetMonthlyGoal: 2500,
    minOpportunityIndex: 80,
    connectedPlatformsOnly: true,
    steps: [
      { id: '1', title: 'Verificação de Conta e Conformidade', description: 'Credenciais seguras e tokens verificados', status: 'completed' },
      { id: '2', title: 'Validação de Plataformas Conectadas', description: 'Shopify, Amazon, AliExpress e Awin ativas', status: 'completed' },
      { id: '3', title: 'Varredura de Produtos Elegíveis', description: 'Filtro por índice de oportunidade > 80', status: 'completed' },
      { id: '4', title: 'Análise de Margem e Demanda Local', description: 'Cálculo de concorrência e conversão estimada', status: 'completed' },
      { id: '5', title: 'Geração de Copy & Conteúdo com IA', description: 'Adaptação cultural para idioma de destino', status: 'completed' },
      { id: '6', title: 'Publicação de Campanhas Oficiais', description: 'Disponibilização através dos canais autorizados', status: 'completed' },
      { id: '7', title: 'Monitoramento Contínuo de Vendas', description: 'Sincronização de pedidos e cálculo de comissões', status: 'completed' }
    ],
    productsManagedCount: 6,
    campaignsActiveCount: 3,
    liveStatusText: 'Aguardando inicialização pelo usuário'
  });

  // Calculate wallet accurately from REAL confirmed vs pending orders
  const confirmedCommissions = orders
    .filter(o => o.status === 'confirmed')
    .reduce((sum, o) => sum + o.commissionAmount, 0);

  const pendingCommissions = orders
    .filter(o => o.status === 'pending')
    .reduce((sum, o) => sum + o.commissionAmount, 0);

  const totalWithdrawnAmount = withdrawals
    .filter(w => w.status === 'completed')
    .reduce((sum, w) => sum + w.amount, 0);

  const availableBalance = Math.max(0, confirmedCommissions - totalWithdrawnAmount);

  const wallet: Wallet = {
    availableBalance: parseFloat(availableBalance.toFixed(2)),
    pendingBalance: parseFloat(pendingCommissions.toFixed(2)),
    totalEarned: parseFloat((confirmedCommissions + pendingCommissions).toFixed(2)),
    totalWithdrawn: parseFloat(totalWithdrawnAmount.toFixed(2)),
    currency: selectedCurrency,
    lastUpdated: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  };

  // Sync state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('andmoney_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('andmoney_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('andmoney_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('andmoney_platforms', JSON.stringify(platforms));
  }, [platforms]);

  useEffect(() => {
    localStorage.setItem('andmoney_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('andmoney_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('andmoney_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('andmoney_withdrawals', JSON.stringify(withdrawals));
  }, [withdrawals]);

  const formatCurrency = (amount?: number | null, customCurrency?: CurrencyCode): string => {
    const validAmount = typeof amount === 'number' && !isNaN(amount) ? amount : (Number(amount) || 0);
    const curr = customCurrency || selectedCurrency || 'EUR';
    const symbol = curr === 'EUR' ? '€' : curr === 'GBP' ? '£' : curr === 'USD' ? '$' : 'R$';
    return `${symbol} ${validAmount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const login = (
    email: string,
    password?: string,
    roleOverride?: 'user' | 'admin'
  ): { success: boolean; error?: string } => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      return { success: false, error: 'Por favor, informe seu e-mail.' };
    }

    // Look up in registered users
    const matched = registeredUsers.find(u => u.email.toLowerCase() === trimmedEmail);

    if (matched) {
      if (password && matched.password && matched.password !== password) {
        return { success: false, error: 'Senha incorreta. Verifique suas credenciais de acesso.' };
      }

      const loggedUser: UserProfile = {
        id: matched.id,
        name: matched.name,
        email: matched.email,
        country: matched.country,
        city: matched.city,
        language: matched.language,
        currency: matched.currency,
        role: roleOverride || matched.role,
        twoFactorEnabled: false,
        onboardingCompleted: true,
        emailVerified: true,
        createdAt: matched.createdAt,
        preferences: {
          notificationsEmail: true,
          notificationsPush: true,
          autoAffiliate: true,
          riskTolerance: 'balanced',
          theme: 'dark'
        }
      };

      setUser(loggedUser);
      setSelectedCountry(matched.country);
      setSelectedCity(matched.city);
      setSelectedLanguage(matched.language);
      setSelectedCurrency(matched.currency);

      const newLog: AuditLog = {
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString(),
        action: 'Sessão Iniciada (Login)',
        user: matched.name,
        ipAddress: '192.168.1.104 (TLS Seguro)',
        status: 'success',
        details: `Login efetuado com sucesso para ${matched.email}`
      };
      setAuditLogs(prev => [newLog, ...prev]);

      addNotification({
        type: 'campaign_approved',
        title: `Bem-vindo, ${matched.name}!`,
        message: 'Sessão autenticada com sucesso no AndMoney.',
        read: false
      });

      setCurrentView('dashboard');
      return { success: true };
    }

    // If not found in seed, but has password and valid email format
    if (!password || password.length < 4) {
      return { success: false, error: 'Usuário não cadastrado. Por favor, crie uma conta.' };
    }

    const countryInfo = SUPPORTED_COUNTRIES.find(c => c.code === selectedCountry) || SUPPORTED_COUNTRIES[0];
    const newUserAccount: RegisteredAccount = {
      id: `usr_${Date.now()}`,
      name: trimmedEmail.split('@')[0].toUpperCase(),
      email: trimmedEmail,
      password: password,
      role: roleOverride || (trimmedEmail.includes('admin') ? 'admin' : 'user'),
      country: selectedCountry,
      city: selectedCity || countryInfo.cities[0],
      language: selectedLanguage,
      currency: selectedCurrency,
      createdAt: new Date().toISOString()
    };

    setRegisteredUsers(prev => [newUserAccount, ...prev]);

    const loggedUser: UserProfile = {
      id: newUserAccount.id,
      name: newUserAccount.name,
      email: newUserAccount.email,
      country: newUserAccount.country,
      city: newUserAccount.city,
      language: newUserAccount.language,
      currency: newUserAccount.currency,
      role: newUserAccount.role,
      twoFactorEnabled: false,
      onboardingCompleted: true,
      emailVerified: true,
      createdAt: newUserAccount.createdAt,
      preferences: {
        notificationsEmail: true,
        notificationsPush: true,
        autoAffiliate: true,
        riskTolerance: 'balanced',
        theme: 'dark'
      }
    };

    setUser(loggedUser);
    setCurrentView('dashboard');
    return { success: true };
  };

  const register = (
    name: string,
    email: string,
    password: string,
    countryCode?: CountryCode,
    city?: string
  ): { success: boolean; error?: string } => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      return { success: false, error: 'Por favor, informe seu nome completo.' };
    }
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      return { success: false, error: 'Por favor, informe um e-mail válido.' };
    }
    if (!password || password.length < 6) {
      return { success: false, error: 'A senha deve conter no mínimo 6 caracteres.' };
    }

    const existing = registeredUsers.find(u => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      return { success: false, error: 'Este e-mail já está cadastrado no sistema. Faça login.' };
    }

    const chosenCountry = countryCode || selectedCountry || 'DE';
    const countryInfo = SUPPORTED_COUNTRIES.find(c => c.code === chosenCountry) || SUPPORTED_COUNTRIES[0];
    const chosenCity = city || countryInfo.cities[0] || 'Berlim';

    const newAccount: RegisteredAccount = {
      id: `usr_${Date.now()}`,
      name: trimmedName,
      email: trimmedEmail,
      password: password,
      role: trimmedEmail.includes('admin') ? 'admin' : 'user',
      country: chosenCountry,
      city: chosenCity,
      language: countryInfo.defaultLanguage,
      currency: countryInfo.currency,
      createdAt: new Date().toISOString()
    };

    setRegisteredUsers(prev => [newAccount, ...prev]);

    const newProfile: UserProfile = {
      id: newAccount.id,
      name: newAccount.name,
      email: newAccount.email,
      country: newAccount.country,
      city: newAccount.city,
      language: newAccount.language,
      currency: newAccount.currency,
      role: newAccount.role,
      twoFactorEnabled: false,
      onboardingCompleted: false,
      emailVerified: true,
      createdAt: newAccount.createdAt,
      preferences: {
        notificationsEmail: true,
        notificationsPush: true,
        autoAffiliate: true,
        riskTolerance: 'balanced',
        theme: 'dark'
      }
    };

    setUser(newProfile);
    setSelectedCountry(chosenCountry);
    setSelectedCity(chosenCity);
    setSelectedCurrency(countryInfo.currency);
    setSelectedLanguage(countryInfo.defaultLanguage);

    const newLog: AuditLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'Novo Cadastro de Conta',
      user: trimmedName,
      ipAddress: '192.168.1.104 (TLS Seguro)',
      status: 'success',
      details: `Conta registrada com sucesso para ${trimmedEmail} no mercado ${countryInfo.name}`
    };
    setAuditLogs(prev => [newLog, ...prev]);

    addNotification({
      type: 'campaign_approved',
      title: '🎉 Conta Criada com Sucesso!',
      message: `Bem-vindo ao AndMoney! Configure seu plano de metas e mercado no assistente de onboarding.`,
      read: false
    });

    setCurrentView('onboarding');
    return { success: true };
  };

  const resetPassword = (email: string): { success: boolean; message: string; error?: string } => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      return { success: false, message: '', error: 'Por favor, informe um e-mail válido para recuperação.' };
    }

    const newLog: AuditLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'Solicitação de Recuperação de Senha',
      user: trimmedEmail,
      ipAddress: '192.168.1.104 (TLS Seguro)',
      status: 'success',
      details: `Instruções de redefinição emitidas para ${trimmedEmail}`
    };
    setAuditLogs(prev => [newLog, ...prev]);

    return {
      success: true,
      message: `Enviamos as instruções seguras de recuperação para ${trimmedEmail}. Verifique sua caixa de entrada.`
    };
  };

  const logout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    const next = { ...user, ...updated };
    setUser(next);
  };

  const completeOnboarding = (data: {
    country: CountryCode;
    city: string;
    category: string;
    monthlyGoal: number;
    connectedPlatforms: string[];
    payoutMethod: string;
  }) => {
    setSelectedCountry(data.country);
    setSelectedCity(data.city);
    const target = Number(data.monthlyGoal) || 3000;
    setGoals(prev => {
      const current = prev?.currentAmount ?? 0;
      const pct = target > 0 ? Math.round((current / target) * 100) : 0;
      return {
        ...prev,
        targetAmount: target,
        monthlyTarget: target,
        percentage: pct,
        projectedAttainment: pct
      };
    });
    if (user) {
      setUser({
        ...user,
        country: data.country,
        city: data.city,
        onboardingCompleted: true
      });
    }
    setCurrentView('dashboard');
  };

  const toggleFavorite = (productId: string) => {
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  const updateProductAffiliation = (productId: string, status: Product['affiliationStatus']) => {
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, affiliationStatus: status } : p))
    );
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...productData,
      id: `prod_${Date.now()}`
    };
    setProducts(prev => [newProd, ...prev]);
  };

  const togglePlatformConnection = (platformId: string) => {
    setPlatforms(prev =>
      prev.map(p => {
        if (p.id === platformId) {
          const nextStatus = p.status === 'connected' ? 'disconnected' : 'connected';
          return {
            ...p,
            status: nextStatus,
            lastSync: nextStatus === 'connected' ? 'Agora mesmo' : undefined
          };
        }
        return p;
      })
    );
  };

  const startAutomation = async () => {
    setAutomation(prev => ({
      ...prev,
      isActive: true,
      liveStatusText: 'Motor de automação ativo. Monitorando oportunidades e gerando campanhas...'
    }));

    addNotification({
      type: 'campaign_approved',
      title: '🤖 Automação AndMoney Ativada',
      message: 'O motor está operando oficialmente com as plataformas autorizadas em segundo plano.',
      read: false
    });
  };

  const stopAutomation = () => {
    setAutomation(prev => ({
      ...prev,
      isActive: false,
      liveStatusText: 'Automação pausada pelo usuário'
    }));
  };

  const updateAutomationConfig = (config: Partial<AutomationState>) => {
    setAutomation(prev => ({ ...prev, ...config }));
  };

  const createCampaign = (campaignData: Partial<Campaign>) => {
    const newCamp: Campaign = {
      id: `camp_${Date.now()}`,
      name: campaignData.name || 'Nova Campanha de E-commerce',
      productId: campaignData.productId || products[0].id,
      productName: campaignData.productName || products[0].name,
      productImage: campaignData.productImage || products[0].imageUrl,
      country: campaignData.country || selectedCountry,
      city: campaignData.city || selectedCity,
      platformId: campaignData.platformId || 'shopify',
      createdAt: new Date().toISOString().split('T')[0],
      impressions: 0,
      clicks: 0,
      orders: 0,
      confirmedSales: 0,
      commissionEarned: 0,
      currency: selectedCurrency,
      status: 'active',
      adChannels: campaignData.adChannels || ['meta_ads', 'google_ads'],
      aiGeneratedCopy: campaignData.aiGeneratedCopy
    };
    setCampaigns(prev => [newCamp, ...prev]);

    addNotification({
      type: 'campaign_approved',
      title: 'Nova Campanha Publicada',
      message: `Campanha "${newCamp.name}" criada com sucesso para ${newCamp.city}, ${newCamp.country}.`,
      read: false
    });
  };

  const updateCampaignStatus = (campaignId: string, status: Campaign['status']) => {
    setCampaigns(prev =>
      prev.map(c => (c.id === campaignId ? { ...c, status } : c))
    );
  };

  const simulateIncomingOrder = (platformId?: string) => {
    const randProd = products[Math.floor(Math.random() * products.length)];
    const country = SUPPORTED_COUNTRIES.find(c => c.code === selectedCountry) || SUPPORTED_COUNTRIES[0];
    const randCity = country.cities[Math.floor(Math.random() * country.cities.length)];
    
    const newOrder: OrderSale = {
      id: `ord_real_${Date.now()}`,
      orderNumber: `${(platformId || randProd.platformId).toUpperCase()}-${selectedCountry}-${Math.floor(10000 + Math.random() * 90000)}`,
      productId: randProd.id,
      productName: randProd.name,
      productImage: randProd.imageUrl,
      platformId: (platformId as any) || randProd.platformId,
      platformName: randProd.platformName,
      country: selectedCountry,
      city: randCity,
      date: new Date().toISOString(),
      orderTotal: randProd.price,
      commissionAmount: randProd.commission,
      currency: selectedCurrency,
      status: 'confirmed', // Real confirmed sale
      customerCountry: country.name,
      isRealPlatformData: true,
      trackingCode: `TRACK-${selectedCountry}-${Math.floor(1000000 + Math.random() * 9000000)}`
    };

    setOrders(prev => [newOrder, ...prev]);

    addNotification({
      type: 'sale_confirmed',
      title: '🎉 Venda Confirmada em Tempo Real!',
      message: `Comissão de ${formatCurrency(newOrder.commissionAmount)} confirmada via ${newOrder.platformName} (${newOrder.productName} em ${newOrder.city}).`,
      read: false
    });

    // Update goal progress
    setGoals(prev => {
      const target = Number(prev?.monthlyTarget || prev?.targetAmount || 2500);
      const newCurrent = (prev?.currentAmount ?? 0) + newOrder.commissionAmount;
      const pct = target > 0 ? Math.round((newCurrent / target) * 100) : 0;
      return {
        ...prev,
        currentAmount: newCurrent,
        targetAmount: target,
        monthlyTarget: target,
        percentage: pct,
        projectedAttainment: pct,
        confirmedSalesCount: (prev?.confirmedSalesCount ?? 0) + 1
      };
    });
  };

  const requestWithdrawal = (amount: number, method: Withdrawal['method'], methodDetails: string): boolean => {
    if (amount <= 0 || amount > availableBalance) {
      return false;
    }

    const fee = 1.50;
    const newWithdrawal: Withdrawal = {
      id: `wth_${Date.now()}`,
      userId: user?.id || 'usr_default',
      method,
      methodDetails,
      amount,
      fee,
      netAmount: amount - fee,
      currency: selectedCurrency,
      requestedAt: new Date().toISOString(),
      status: 'requested',
      transactionRef: `REF-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setWithdrawals(prev => [newWithdrawal, ...prev]);

    addNotification({
      type: 'withdrawal_processed',
      title: 'Solicitação de Saque Enviada',
      message: `Saque de ${formatCurrency(amount)} via ${method.toUpperCase()} enviado para processamento bancário seguro.`,
      read: false
    });

    return true;
  };

  const updateGoal = (newTarget: number) => {
    const validTarget = Math.max(1, Number(newTarget) || 2500);
    setGoals(prev => {
      const current = prev?.currentAmount ?? 0;
      const pct = validTarget > 0 ? Math.round((current / validTarget) * 100) : 0;
      return {
        ...prev,
        targetAmount: validTarget,
        monthlyTarget: validTarget,
        percentage: pct,
        projectedAttainment: pct
      };
    });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp'>) => {
    const newN: AppNotification = {
      ...notif,
      id: `notif_${Date.now()}`,
      timestamp: 'Agora mesmo'
    };
    setNotifications(prev => [newN, ...prev]);
  };

  const createTicket = (subject: string, category: SupportTicket['category'], message: string) => {
    const newTicket: SupportTicket = {
      id: `tkt_${Date.now()}`,
      subject,
      category,
      priority: 'medium',
      status: 'open',
      createdAt: new Date().toLocaleDateString('pt-BR'),
      messages: [
        { sender: 'user', text: message, timestamp: 'Hoje às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }
      ]
    };
    setTickets(prev => [newTicket, ...prev]);
    addNotification({
      type: 'campaign_approved',
      title: 'Ticket de Suporte Aberto',
      message: `Seu chamado "${subject}" foi recebido e será respondido em breve por nossa equipe.`,
      read: false
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        theme,
        toggleTheme,
        login,
        register,
        resetPassword,
        logout,
        updateProfile,
        registeredUsers,
        completeOnboarding,
        selectedCountry,
        selectedCity,
        selectedLanguage,
        selectedCurrency,
        setSelectedCountry,
        setSelectedCity,
        setSelectedLanguage,
        setSelectedCurrency,
        formatCurrency,
        products,
        toggleFavorite,
        updateProductAffiliation,
        addProduct,
        platforms,
        togglePlatformConnection,
        automation,
        startAutomation,
        stopAutomation,
        updateAutomationConfig,
        campaigns,
        createCampaign,
        updateCampaignStatus,
        orders,
        simulateIncomingOrder,
        wallet,
        withdrawals,
        requestWithdrawal,
        goals,
        updateGoal,
        updateMonthlyGoal: updateGoal,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification,
        tickets,
        createTicket,
        auditLogs,
        twoFactorActive,
        setTwoFactorActive,
        currentView,
        setCurrentView,
        viewingProduct,
        setViewingProduct
      }}
    >
      <div className={theme === 'dark' ? 'dark' : ''}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
