
import React from 'react';
import { UserRole, WalletInfo } from '../types';
import { TIER_DEFINITIONS } from '../constants';
import { 
  LayoutDashboard, 
  Store, 
  Wallet as WalletIcon, 
  ShieldCheck, 
  Palmtree, 
  ShoppingBag,
  LogOut,
  ChevronRight,
  Video,
  FileText,
  Gift,
  Compass,
  Gem,
  Sparkles,
  Trophy
} from 'lucide-react';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setRole: (role: UserRole) => void;
  clearAsset: () => void;
  wallet: WalletInfo;
}

const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, setActiveTab, setRole, clearAsset, wallet }) => {
  const tierInfo = TIER_DEFINITIONS[wallet.membershipTier];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: [UserRole.INVESTOR, UserRole.ADMIN] },
    { id: 'ai', label: 'Oasis AI', icon: Sparkles, roles: [UserRole.INVESTOR, UserRole.ADMIN, UserRole.CUSTOMER] },
    { id: 'minigame', label: 'Mini Game', icon: Trophy, roles: [UserRole.INVESTOR, UserRole.ADMIN, UserRole.CUSTOMER] },
    { id: 'live', label: 'Camera Live', icon: Video, roles: [UserRole.INVESTOR, UserRole.ADMIN] },
    { id: 'logs', label: 'Nhật ký Farm', icon: FileText, roles: [UserRole.INVESTOR, UserRole.ADMIN, UserRole.CUSTOMER] },
    { id: 'referral', label: 'Mời bạn bè', icon: Gift, roles: [UserRole.INVESTOR, UserRole.CUSTOMER] },
    { id: 'explore', label: 'Khám phá Oasis', icon: Compass, roles: [UserRole.INVESTOR, UserRole.CUSTOMER, UserRole.ADMIN] },
    { id: 'resort', label: 'Nghỉ dưỡng', icon: Palmtree, roles: [UserRole.INVESTOR, UserRole.CUSTOMER, UserRole.ADMIN] },
    { id: 'store', label: 'Cửa hàng', icon: ShoppingBag, roles: [UserRole.INVESTOR, UserRole.CUSTOMER, UserRole.ADMIN] },
    { id: 'marketplace', label: 'Chợ Token', icon: Store, roles: [UserRole.INVESTOR] },
    { id: 'wallet', label: 'Ví Oasis', icon: WalletIcon, roles: [UserRole.INVESTOR, UserRole.ADMIN] },
    { id: 'admin', label: 'Quản trị', icon: ShieldCheck, roles: [UserRole.ADMIN] },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    clearAsset();
  };

  return (
    <>
      <aside className="hidden md:flex w-64 bg-[#1b4332] text-white flex-col border-r border-white/10 transition-all duration-300">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-[#e9c46a] p-2 rounded-xl shadow-lg shadow-black/20">
            <Palmtree className="w-6 h-6 text-[#1b4332]" />
          </div>
          <span className="font-strong text-xl tracking-tighter text-[#e9c46a]">OASIS FARMSTAY</span>
        </div>

        {/* Loyalty Widget Small */}
        <div className="mx-4 mt-2 mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => handleTabClick('wallet')}>
           <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tierInfo.color} flex items-center justify-center shadow-lg`}>
              <Gem className="w-5 h-5 text-white" />
           </div>
           <div>
              <p className="text-[10px] font-black text-[#e9c46a] uppercase tracking-widest">{tierInfo.label}</p>
              <p className="text-xs font-bold text-white/70">{wallet.rewardPoints.toLocaleString()} PTS</p>
           </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar pb-8">
          {navItems.filter(item => item.roles.includes(role)).map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id 
                  ? 'bg-[#e9c46a] text-[#1b4332] shadow-lg' 
                  : 'hover:bg-white/5 text-gray-300 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${['ai', 'minigame'].includes(item.id) && activeTab !== item.id ? 'text-[#e9c46a]' : ''}`} />
              <span className="font-semibold text-sm">{item.label}</span>
              {activeTab === item.id && <ChevronRight className="ml-auto w-4 h-4" />}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/10">
          <div className="mb-4">
            <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 block font-bold">Chế độ người dùng</label>
            <div className="grid grid-cols-1 gap-1">
              {[UserRole.CUSTOMER, UserRole.INVESTOR, UserRole.ADMIN].map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`text-[10px] py-1.5 px-3 rounded-lg text-left transition-colors font-bold ${
                    role === r ? 'bg-[#e9c46a] text-[#1b4332]' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-bold text-sm">Đăng xuất</span>
          </button>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1b4332] text-white flex justify-around items-center h-16 mobile-nav-shadow z-50 px-2">
        {navItems.filter(item => item.roles.includes(role)).slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 rounded-lg ${
              activeTab === item.id ? 'text-[#e9c46a]' : 'text-gray-400'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[9px] font-bold uppercase truncate w-full text-center">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
