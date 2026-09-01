import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { NotificationDrawer } from './components/NotificationDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WithdrawModal } from './components/WithdrawModal';
import { NewCampaignModal } from './components/NewCampaignModal';
import { PlatformConnectModal } from './components/PlatformConnectModal';

import { LandingPage } from './views/LandingPage';
import { AuthView } from './views/AuthView';
import { OnboardingView } from './views/OnboardingView';
import { DashboardView } from './views/DashboardView';
import { MarketsView } from './views/MarketsView';
import { TrendingProductsView } from './views/TrendingProductsView';
import { PlatformsView } from './views/PlatformsView';
import { AutomationView } from './views/AutomationView';
import { AiMarketingView } from './views/AiMarketingView';
import { CampaignsView } from './views/CampaignsView';
import { GoalsView } from './views/GoalsView';
import { SalesView } from './views/SalesView';
import { WalletView } from './views/WalletView';
import { AnalyticsView } from './views/AnalyticsView';
import { AntiFraudView } from './views/AntiFraudView';
import { SupportView } from './views/SupportView';
import { AdminView } from './views/AdminView';
import { ProfileView } from './views/ProfileView';

import { Product, PlatformIntegration } from './types';

const MainLayout: React.FC = () => {
  const { currentView, setCurrentView, isAuthenticated } = useApp();

  // Modals state
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false);
  const [productForNewCampaign, setProductForNewCampaign] = useState<Product | undefined>(undefined);
  const [selectedPlatformForConnect, setSelectedPlatformForConnect] = useState<PlatformIntegration | null>(null);

  // If user is on landing, auth, or onboarding views
  if (currentView === 'landing') {
    return <LandingPage />;
  }

  if (currentView === 'auth' || currentView === 'auth_login' || currentView === 'auth_register') {
    return <AuthView initialMode={currentView === 'auth_register' ? 'register' : 'login'} />;
  }

  if (currentView === 'onboarding') {
    return <OnboardingView />;
  }

  // Helper handlers
  const handleOpenProductDetail = (product: Product) => {
    setSelectedProductForDetail(product);
  };

  const handleOpenCampaignModal = (product?: Product) => {
    setProductForNewCampaign(product);
    setIsNewCampaignOpen(true);
  };

  const handleOpenConnectModal = (platform: PlatformIntegration) => {
    setSelectedPlatformForConnect(platform);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenNewCampaign={() => handleOpenCampaignModal()}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Left Sidebar */}
        <Sidebar onOpenNewCampaign={() => handleOpenCampaignModal()} />

        {/* Dynamic Center Stage / Main Content View */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
          {currentView === 'dashboard' && (
            <DashboardView
              onSelectProduct={handleOpenProductDetail}
              onOpenCampaignModal={handleOpenCampaignModal}
              onOpenWithdrawModal={() => setIsWithdrawOpen(true)}
              onOpenConnectModal={handleOpenConnectModal}
            />
          )}

          {currentView === 'markets' && <MarketsView />}

          {currentView === 'trending_products' && (
            <TrendingProductsView
              onSelectProduct={handleOpenProductDetail}
              onOpenCampaignModal={handleOpenCampaignModal}
            />
          )}

          {currentView === 'platforms' && (
            <PlatformsView onOpenConnectModal={handleOpenConnectModal} />
          )}

          {currentView === 'automation' && <AutomationView />}

          {currentView === 'ai_marketing' && (
            <AiMarketingView onOpenCampaignModal={handleOpenCampaignModal} />
          )}

          {currentView === 'campaigns' && (
            <CampaignsView onOpenNewCampaignModal={handleOpenCampaignModal} />
          )}

          {currentView === 'goals' && <GoalsView />}

          {currentView === 'sales' && <SalesView />}

          {currentView === 'wallet' && (
            <WalletView onOpenWithdrawModal={() => setIsWithdrawOpen(true)} />
          )}

          {currentView === 'analytics' && <AnalyticsView />}

          {(currentView === 'anti_fraud' || currentView === 'antifraud') && <AntiFraudView />}

          {currentView === 'support' && <SupportView />}

          {currentView === 'admin' && <AdminView />}

          {currentView === 'profile' && <ProfileView />}
        </main>
      </div>

      {/* Mobile Bottom Bar for Small Screens */}
      <MobileBottomNav />

      {/* Floating Modals and Drawers */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onStartCampaign={handleOpenCampaignModal}
      />

      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
      />

      <NewCampaignModal
        isOpen={isNewCampaignOpen}
        onClose={() => {
          setIsNewCampaignOpen(false);
          setProductForNewCampaign(undefined);
        }}
        preSelectedProduct={productForNewCampaign}
      />

      <PlatformConnectModal
        platform={selectedPlatformForConnect}
        onClose={() => setSelectedPlatformForConnect(null)}
      />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
