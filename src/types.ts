export type CountryCode = 'PT' | 'ES' | 'FR' | 'IT' | 'DE' | 'GB' | 'US' | 'BR' | 'CA' | 'NL' | 'BE' | 'AT' | 'IE';
export type CurrencyCode = 'EUR' | 'GBP' | 'USD' | 'BRL';
export type LanguageCode = 'pt' | 'es' | 'fr' | 'it' | 'de' | 'en';

export interface CountryInfo {
  code: CountryCode;
  name: string;
  flag: string;
  currency: CurrencyCode;
  currencySymbol: string;
  defaultLanguage: LanguageCode;
  cities: string[];
  marketSize: string;
  ecommerceGrowth: string;
  popularCategories: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  country: CountryCode;
  city: string;
  language: LanguageCode;
  currency: CurrencyCode;
  role: 'user' | 'admin';
  twoFactorEnabled: boolean;
  onboardingCompleted: boolean;
  emailVerified: boolean;
  createdAt: string;
  preferences: {
    notificationsEmail: boolean;
    notificationsPush: boolean;
    autoAffiliate: boolean;
    riskTolerance: 'conservative' | 'balanced' | 'aggressive';
    theme: 'dark' | 'light' | 'system';
  };
}

export interface RegisteredAccount {
  id: string;
  name: string;
  email: string;
  password?: string;
  country: CountryCode;
  city: string;
  language: LanguageCode;
  currency: CurrencyCode;
  role: 'user' | 'admin';
  createdAt: string;
}

export type PlatformId = 
  | 'shopify' 
  | 'woocommerce' 
  | 'amazon' 
  | 'ebay' 
  | 'aliexpress' 
  | 'hotmart' 
  | 'awin' 
  | 'impact' 
  | 'cj_affiliate'
  | 'rakuten';

export type IntegrationStatus = 'disconnected' | 'connected' | 'error' | 'awaiting_authorization';

export interface PlatformIntegration {
  id: PlatformId;
  name: string;
  category: 'ecommerce' | 'affiliate_network' | 'marketplace';
  logo: string;
  status: IntegrationStatus;
  accountId?: string;
  authType: 'oauth' | 'api_key';
  lastSync?: string;
  activeProductsCount: number;
  totalCommissionsEarned: number;
  supportedCountries: CountryCode[];
  apiEndpoint?: string;
  webhookUrl?: string;
  errorMessage?: string;
}

export type TrendLevel = 'very_high' | 'high' | 'medium' | 'low';
export type CompetitionLevel = 'low' | 'medium' | 'high';
export type AffiliationStatus = 'not_affiliated' | 'pending_approval' | 'approved' | 'restricted';

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  currency: CurrencyCode;
  imageUrl: string;
  platformId: PlatformId;
  platformName: string;
  commission: number; // in base currency
  commissionRate: number; // percentage (e.g. 15 for 15%)
  availability: 'in_stock' | 'limited' | 'preorder';
  rating: number;
  reviewCount: number;
  trend: TrendLevel;
  trendScore: number; // 0-100
  competition: CompetitionLevel;
  estimatedDemand: 'very_high' | 'high' | 'medium' | 'low';
  recommendedCountry: CountryCode;
  recommendedCity?: string;
  availableCountries: CountryCode[];
  estimatedMargin: number; // %
  opportunityIndex: number; // 0-100
  affiliationStatus: AffiliationStatus;
  deliveryInfo: {
    estimatedDays: string;
    freeShipping: boolean;
    expressAvailable: boolean;
  };
  performanceHistory: {
    month: string;
    salesCount: number;
    avgConversion: number;
  }[];
  isFavorite?: boolean;
}

export interface AutomationStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending' | 'failed';
  timestamp?: string;
}

export interface AutomationState {
  isActive: boolean;
  selectedCountry: CountryCode;
  selectedCity: string;
  selectedCategories: string[];
  maxDailyBudget: number;
  targetMonthlyGoal: number;
  minOpportunityIndex: number;
  connectedPlatformsOnly: boolean;
  lastRunAt?: string;
  nextScheduledRun?: string;
  steps: AutomationStep[];
  productsManagedCount: number;
  campaignsActiveCount: number;
  liveStatusText: string;
}

export interface Campaign {
  id: string;
  name: string;
  productId: string;
  productName: string;
  productImage: string;
  country: CountryCode;
  city: string;
  platformId: PlatformId;
  createdAt: string;
  impressions: number;
  clicks: number;
  orders: number;
  confirmedSales: number;
  commissionEarned: number;
  currency: CurrencyCode;
  status: 'draft' | 'awaiting_approval' | 'active' | 'paused' | 'finished' | 'error';
  adChannels: ('google_ads' | 'meta_ads' | 'tiktok_shop' | 'pinterest' | 'influencer_network')[];
  aiGeneratedCopy?: {
    headline: string;
    description: string;
    cta: string;
    videoScript?: string;
    language: LanguageCode;
  };
}

export interface Goal {
  id: string;
  type: 'daily' | 'weekly' | 'monthly';
  targetAmount: number;
  monthlyTarget?: number;
  currentAmount: number;
  currency: CurrencyCode;
  startDate: string;
  endDate: string;
  confirmedSalesCount: number;
  requiredSalesEstimate: number;
  averageCommission: number;
  projectedAttainment: number; // %
  percentage?: number;
}

export interface OrderSale {
  id: string;
  orderNumber: string;
  productId: string;
  productName: string;
  productImage: string;
  platformId: PlatformId;
  platformName: string;
  country: CountryCode;
  city: string;
  date: string;
  orderTotal: number;
  commissionAmount: number;
  currency: CurrencyCode;
  status: 'pending' | 'confirmed' | 'cancelled' | 'refunded';
  customerCountry: string;
  isRealPlatformData: boolean; // Must be flagged
  trackingCode: string;
}

export interface Wallet {
  availableBalance: number;
  pendingBalance: number;
  totalEarned: number;
  totalWithdrawn: number;
  currency: CurrencyCode;
  lastUpdated: string;
}

export type WithdrawalMethodType = 'paypal' | 'bank_transfer' | 'wise' | 'revolut';
export type WithdrawalStatus = 'requested' | 'processing' | 'completed' | 'declined';

export interface Withdrawal {
  id: string;
  userId: string;
  method: WithdrawalMethodType;
  methodDetails: string;
  amount: number;
  fee: number;
  netAmount: number;
  currency: CurrencyCode;
  requestedAt: string;
  processedAt?: string;
  status: WithdrawalStatus;
  transactionRef?: string;
  note?: string;
}

export interface AppNotification {
  id: string;
  type: 
    | 'sale_confirmed' 
    | 'commission_pending' 
    | 'order_cancelled' 
    | 'campaign_approved' 
    | 'campaign_paused' 
    | 'integration_error' 
    | 'goal_reached' 
    | 'withdrawal_processed' 
    | 'opportunity_alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface AnalyticsSummary {
  revenueReal: number;
  revenueEstimated: number;
  commissionReal: number;
  commissionPending: number;
  salesConfirmed: number;
  ordersPending: number;
  clicks: number;
  ctr: number;
  conversionRate: number;
  averageTicket: number;
  averageCommission: number;
  roi: number;
  timeframe: 'today' | '7d' | '30d' | '90d' | 'custom';
  dailyStats: {
    date: string;
    salesReal: number;
    salesEstimated: number;
    commissions: number;
    clicks: number;
    orders: number;
  }[];
  topProducts: {
    id: string;
    name: string;
    sales: number;
    revenue: number;
    commission: number;
  }[];
  topCountries: {
    country: CountryCode;
    name: string;
    flag: string;
    sales: number;
    revenue: number;
  }[];
  topCities: {
    city: string;
    country: CountryCode;
    sales: number;
    revenue: number;
  }[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId?: string;
  userEmail?: string;
  user?: string;
  action: string;
  ipAddress: string;
  status: 'success' | 'warning' | 'security_flag';
  details: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: 'integration' | 'payout' | 'campaign' | 'account' | 'api';
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  messages: {
    sender: 'user' | 'support';
    text: string;
    timestamp: string;
  }[];
}
