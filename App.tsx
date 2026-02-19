
import React, { useState } from 'react';
import { UserRole, FarmAsset, WalletInfo, MembershipTier } from './types';
import { MOCK_ASSETS, MOCK_TRANSACTIONS } from './constants';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AssetGrowth from './components/AssetGrowth';
import Marketplace from './components/Marketplace';
import Wallet from './components/Wallet';
import AdminPanel from './components/AdminPanel';
import Store from './components/Store';
import Resort from './components/Resort';
import LiveFarm from './components/LiveFarm';
import FarmLogs from './components/FarmLogs';
import Referral from './components/Referral';
import Explore from './components/Explore';
import OasisAI from './components/OasisAI';
import MiniGame from './components/MiniGame';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.ADMIN);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAsset, setSelectedAsset] = useState<FarmAsset | null>(null);

  const [wallet, setWallet] = useState<WalletInfo>({
    totalBalance: 12450000,
    rewardPoints: 1250,
    internalTokens: 500,
    pendingTax: 245000,
    history: MOCK_TRANSACTIONS,
    membershipTier: MembershipTier.SILVER,
    pointsToNextTier: 8750
  });

  const renderContent = () => {
    if (selectedAsset) {
      return <AssetGrowth asset={selectedAsset} onBack={() => setSelectedAsset(null)} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard role={role} onSelectAsset={setSelectedAsset} />;
      case 'live':
        return <LiveFarm />;
      case 'logs':
        return <FarmLogs />;
      case 'referral':
        return <Referral />;
      case 'explore':
        return <Explore />;
      case 'ai':
        return <OasisAI />;
      case 'minigame':
        return <MiniGame />;
      case 'resort':
        return <Resort role={role} />;
      case 'store':
        return <Store role={role} />;
      case 'marketplace':
        return <Marketplace />;
      case 'wallet':
        return <Wallet wallet={wallet} />;
      case 'admin':
        return role === UserRole.ADMIN ? <AdminPanel /> : <Dashboard role={role} onSelectAsset={setSelectedAsset} />;
      default:
        return <Dashboard role={role} onSelectAsset={setSelectedAsset} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f0f4f8] text-slate-800">
      <Sidebar 
        role={role} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setRole={setRole}
        clearAsset={() => setSelectedAsset(null)}
        wallet={wallet}
      />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header role={role} setRole={setRole} wallet={wallet} />
        <div className="p-4 md:p-8 overflow-y-auto max-h-[calc(100vh-80px)]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
