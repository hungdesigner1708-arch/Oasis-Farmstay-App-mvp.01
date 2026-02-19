
import React, { useState } from 'react';
import { UserRole, WalletInfo, MembershipTier } from '../types';
import { TIER_DEFINITIONS } from '../constants';
import { Bell, Search, User, ChevronDown, Check, Shield, Briefcase, UserCircle, Gem } from 'lucide-react';

interface HeaderProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  wallet: WalletInfo;
}

const Header: React.FC<HeaderProps> = ({ role, setRole, wallet }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const tierInfo = TIER_DEFINITIONS[wallet.membershipTier];

  const roles = [
    { id: UserRole.CUSTOMER, label: 'Khách hàng', icon: UserCircle, desc: 'Trải nghiệm mua sắm & nghỉ dưỡng' },
    { id: UserRole.INVESTOR, label: 'Nhà đầu tư', icon: Briefcase, desc: 'Quản lý tài sản & lợi nhuận' },
    { id: UserRole.ADMIN, label: 'Quản trị viên', icon: Shield, desc: 'Kiểm soát hệ thống Oasis' },
  ];

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden lg:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm nông trại, resort, token..."
            className="w-full pl-12 pr-6 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#005f73]/20 transition-all font-medium"
          />
        </div>
        <div className="md:hidden flex items-center gap-2">
          <div className="bg-[#1b4332] p-1.5 rounded-lg shadow-sm">
            <Shield className="w-4 h-4 text-[#e9c46a]" />
          </div>
          <span className="font-strong text-sm tracking-tighter text-[#1b4332]">OASIS</span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-8">
        <div className="hidden sm:flex items-center gap-4 pr-6 border-r border-slate-100">
          <div className="text-right">
            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black">Số dư Oasis</p>
            <p className="text-[#1b4332] font-strong text-base">
              {wallet.totalBalance.toLocaleString('vi-VN')} <span className="text-[10px] font-normal lowercase">đ</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-3 relative">
          {/* Membership Badge Quickview */}
          <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${tierInfo.color} text-white shadow-sm mr-2`}>
             <Gem className="w-3 h-3" />
             <span className="text-[9px] font-black uppercase tracking-widest">{tierInfo.label}</span>
          </div>

          <button className="relative p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
          </button>
          
          <div className="h-8 w-[1px] bg-slate-100 mx-1 hidden md:block"></div>

          {/* User Profile & Role Switcher Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-slate-50 transition-all active:scale-95 group"
            >
              <div className="text-right hidden md:block">
                <p className="text-[11px] font-strong text-slate-900 leading-none">Hoàng Nguyễn</p>
                <p className="text-[8px] text-[#e9c46a] font-black uppercase tracking-widest mt-1.5 flex items-center justify-end gap-1">
                  {role}
                  <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl gradient-coastal flex items-center justify-center border-2 border-white shadow-md group-hover:shadow-lg transition-all">
                <User className="w-5 h-5 text-white" />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsProfileOpen(false)}
                ></div>
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-6 bg-slate-50/50 border-b border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Chế độ người dùng</p>
                    <div className="space-y-1">
                      {roles.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => {
                            setRole(r.id);
                            setIsProfileOpen(false);
                          }}
                          className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all ${
                            role === r.id 
                              ? 'bg-[#1b4332] text-white shadow-lg' 
                              : 'hover:bg-white text-slate-600'
                          }`}
                        >
                          <div className={`p-2 rounded-xl ${role === r.id ? 'bg-white/10' : 'bg-slate-100'}`}>
                            <r.icon className={`w-4 h-4 ${role === r.id ? 'text-[#e9c46a]' : 'text-slate-400'}`} />
                          </div>
                          <div className="text-left flex-1">
                            <p className="text-xs font-strong">{r.label}</p>
                            <p className={`text-[9px] ${role === r.id ? 'text-white/60' : 'text-slate-400'} font-medium`}>{r.desc}</p>
                          </div>
                          {role === r.id && <Check className="w-4 h-4 text-[#e9c46a]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="p-4">
                    <button className="w-full py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#1b4332] transition-colors">
                      Thiết lập tài khoản
                    </button>
                    <button className="w-full py-3 text-[10px] font-black text-red-400 uppercase tracking-widest hover:text-red-600 transition-colors border-t border-slate-50 mt-1">
                      Đăng xuất Oasis
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
