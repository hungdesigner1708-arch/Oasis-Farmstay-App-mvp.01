
import React, { useState, useMemo } from 'react';
import { UserRole, FarmAsset } from '../types';
import { MOCK_ASSETS, MOCK_HUBS } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ExternalLink, Shield, Palmtree, Activity, TrendingUp, Waves, MapPin, ChevronRight } from 'lucide-react';

interface DashboardProps {
  role: UserRole;
  onSelectAsset: (asset: FarmAsset) => void;
}

const chartData = [
  { name: 'T1', val: 4000 },
  { name: 'T2', val: 5500 },
  { name: 'T3', val: 4800 },
  { name: 'T4', val: 7000 },
  { name: 'T5', val: 8200 },
  { name: 'T6', val: 9500 },
];

const Dashboard: React.FC<DashboardProps> = ({ role, onSelectAsset }) => {
  const [selectedHub, setSelectedHub] = useState<string>('ALL');

  const filteredAssets = useMemo(() => {
    if (selectedHub === 'ALL') return MOCK_ASSETS;
    return MOCK_ASSETS.filter(asset => asset.location === selectedHub);
  }, [selectedHub]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700 pb-24 md:pb-8">
      {/* Welcome & Global Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-[#005f73]">
            <Waves className="w-6 h-6 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Hệ sinh thái Oasis Farmstay</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-strong text-[#1b4332]">Dashboard Tài Sản</h1>
          <p className="text-slate-500 font-medium italic">Minh bạch trên Blockchain - Kết nối các vùng miền.</p>
        </div>
        <div className="flex items-center gap-3 bg-white border border-slate-100 px-6 py-3 rounded-2xl shadow-sm">
          <Shield className="w-5 h-5 text-[#e9c46a]" />
          <span className="text-xs font-strong text-[#1b4332]">TRUSTED BY SMART CONTRACT</span>
        </div>
      </div>

      {/* Farm Hub Switcher Bar */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
        <button
          onClick={() => setSelectedHub('ALL')}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-strong text-[10px] tracking-widest transition-all shrink-0 ${
            selectedHub === 'ALL' ? 'bg-[#1b4332] text-white shadow-lg scale-105' : 'bg-white text-slate-400 border border-slate-100'
          }`}
        >
          <Palmtree className="w-3.5 h-3.5" />
      TẤT CẢ OASIS
        </button>
        {MOCK_HUBS.map(hub => (
          <button
            key={hub.id}
            onClick={() => setSelectedHub(hub.location)}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-strong text-[10px] tracking-widest transition-all shrink-0 border ${
              selectedHub === hub.location ? 'bg-[#e9c46a] text-[#1b4332] border-[#e9c46a] shadow-lg scale-105' : 'bg-white text-slate-400 border-slate-100'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            {hub.name.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card rounded-[3rem] p-10 shadow-2xl relative overflow-hidden border-none">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-strong text-xl flex items-center gap-3">
                <Activity className="w-6 h-6 text-[#005f73]" />
                Tăng trưởng danh mục
              </h3>
              <div className="flex gap-2">
                <span className="text-[10px] font-black bg-[#e9c46a]/20 text-[#1b4332] px-3 py-1 rounded-full">+24.5% NĂM</span>
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#005f73" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#005f73" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '15px'}}
                  />
                  <Area type="monotone" dataKey="val" stroke="#005f73" strokeWidth={5} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#94d2bd]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="space-y-6">
          <div className="gradient-coastal rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute bottom-0 right-0 opacity-10 scale-150 rotate-12">
               <Palmtree className="w-32 h-32" />
            </div>
            <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-2">OasisPoints Tích lũy</p>
            <h2 className="text-5xl font-strong">1.250</h2>
            <div className="mt-10">
              <button className="w-full btn-sand py-4 rounded-2xl font-strong text-sm tracking-wider uppercase">Đổi Cổ Phần Token</button>
            </div>
          </div>
          
          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl">
            <h4 className="font-strong text-xs mb-6 uppercase text-slate-400 tracking-widest">Địa chỉ Farm hiện tại</h4>
            {selectedHub === 'ALL' ? (
              <p className="text-xs text-slate-500 font-medium italic">Bạn đang xem toàn bộ hệ sinh thái Oasis.</p>
            ) : (
              <div className="space-y-2">
                <p className="text-xs font-strong text-[#1b4332]">{MOCK_HUBS.find(h => h.location === selectedHub)?.name}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {MOCK_HUBS.find(h => h.location === selectedHub)?.address}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Asset List Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-strong text-[#1b4332]">
            {selectedHub === 'ALL' ? 'Tất cả nông trại Oasis' : `Farm tại ${selectedHub.replace('_', ' ')}`}
          </h3>
          <button className="text-[#005f73] font-bold text-xs uppercase tracking-widest hover:underline">Xem báo cáo vùng →</button>
        </div>
        
        {filteredAssets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredAssets.map((asset) => (
              <div 
                key={asset.id} 
                onClick={() => onSelectAsset(asset)}
                className="group bg-white rounded-[3rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={asset.progress[asset.progress.length - 1].photoUrl} alt={asset.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-5 py-2 rounded-full text-[10px] font-strong text-[#1b4332] shadow-xl flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#005f73]" />
                    {asset.location.replace('_', ' ')}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b4332]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <span className="text-white text-xs font-strong tracking-widest flex items-center gap-2">XEM CAMERA & CHI TIẾT <ExternalLink className="w-4 h-4" /></span>
                  </div>
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h4 className="font-strong text-xl mb-1 text-slate-800 group-hover:text-[#005f73] transition-colors">{asset.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{asset.type}</p>
                  </div>
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-[10px] font-black text-slate-400 font-mono tracking-widest uppercase bg-slate-50 px-2 py-1 rounded">{asset.tokenSymbol}</span>
                    <div className="flex items-center gap-1 text-emerald-600 font-black text-sm">
                      +{asset.growthRate}% <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-8 border-t border-slate-50 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Cổ phần (%)</p>
                      <p className="text-lg font-strong text-[#1b4332]">{asset.sharesOwned}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-[#e9c46a] uppercase tracking-widest mb-1">Giá trị hiện tại</p>
                      <p className="text-sm font-bold text-slate-600">{asset.currentValue.toLocaleString('vi-VN')} đ</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
             <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
             <p className="text-slate-500 font-strong text-xs uppercase tracking-widest">Không tìm thấy tài sản tại khu vực này</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
