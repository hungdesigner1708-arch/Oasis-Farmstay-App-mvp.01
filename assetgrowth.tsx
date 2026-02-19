
import React, { useState } from 'react';
import { FarmAsset } from '../types';
import { 
  ChevronLeft, 
  ShieldCheck, 
  Activity, 
  Database, 
  Camera, 
  Play, 
  TrendingUp,
  Info,
  MapPin,
  Gift,
  Award
} from 'lucide-react';

interface AssetGrowthProps {
  asset: FarmAsset;
  onBack: () => void;
}

const AssetGrowth: React.FC<AssetGrowthProps> = ({ asset, onBack }) => {
  const [showLive, setShowLive] = useState(false);

  const getLocationName = (loc: string) => {
    switch(loc) {
      case 'NINH_THUAN': return 'Ninh Thuận';
      case 'DA_TEH': return 'Da Teh (Lâm Đồng)';
      case 'TAY_NINH': return 'Tây Ninh';
      default: return loc;
    }
  }

  return (
    <div className="max-w-7xl mx-auto animate-in slide-in-from-right-8 duration-500 pb-24 md:pb-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-[#005f73] mb-6 transition-all group font-bold"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        QUAY LẠI DANH MỤC OASIS
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#005f73] font-strong text-[10px] tracking-widest uppercase">
                <MapPin className="w-3 h-3" />
                Oasis {getLocationName(asset.location)}
              </div>
              <h2 className="text-3xl font-strong text-[#1b4332]">{asset.name}</h2>
            </div>
            <div className="flex flex-col items-end">
               <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 border border-emerald-200 uppercase">
                <ShieldCheck className="w-4 h-4" />
                BLOCKCHAIN VERIFIED
              </span>
              <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tighter">Mã sở hữu: {asset.tokenSymbol}</p>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-black aspect-video group">
            <img src={asset.progress[asset.progress.length - 1].photoUrl} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => setShowLive(true)}
                className="w-20 h-20 bg-[#e9c46a] rounded-full flex items-center justify-center text-[#1b4332] shadow-2xl hover:scale-110 transition-transform"
              >
                <Play className="w-10 h-10 fill-current" />
              </button>
            </div>
            <div className="absolute top-6 left-6 bg-red-600 px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> LIVE CAM
            </div>
          </div>

          {/* Quyền lợi Investor */}
          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl space-y-8">
            <div className="flex items-center gap-4">
              <div className="bg-[#e9c46a] p-3 rounded-2xl">
                <Gift className="w-6 h-6 text-[#1b4332]" />
              </div>
              <div>
                <h3 className="text-xl font-strong text-[#1b4332]">Quyền lợi Investor</h3>
                <p className="text-xs text-slate-400 font-medium italic">Đặc quyền dành riêng cho chủ sở hữu cổ phần.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {asset.benefits.map((benefit, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-[#005f73]/20 transition-all group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-[#005f73]/10 p-2 rounded-xl group-hover:bg-[#005f73] transition-colors">
                      {benefit.type === 'STAY' ? <MapPin className="w-4 h-4 text-[#005f73] group-hover:text-white" /> : <Award className="w-4 h-4 text-[#005f73] group-hover:text-white" />}
                    </div>
                    <span className="font-strong text-xs text-slate-800">{benefit.title}</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="gradient-coastal rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div>
                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Tỷ lệ sở hữu</p>
                <h4 className="text-4xl font-strong text-[#e9c46a]">{asset.sharesOwned}%</h4>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-5 border border-white/10">
                <p className="text-[10px] uppercase text-white/50 font-bold mb-2">Giá trị hiện tại</p>
                <p className="text-2xl font-strong text-white">{asset.currentValue.toLocaleString('vi-VN')} <span className="text-xs font-normal">đ</span></p>
                <div className="flex items-center gap-1 text-[#e9c46a] text-xs font-black mt-1">
                  <TrendingUp className="w-3 h-3" /> +{asset.growthRate}%
                </div>
              </div>

              <button className="w-full btn-sand py-4 rounded-xl font-strong text-xs tracking-widest uppercase">MUA THÊM CỔ PHẦN</button>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl space-y-6">
             <h4 className="font-strong text-xs flex items-center gap-2 text-[#005f73]">
              <Info className="w-4 h-4" />
              THÔNG TIN PHÁP LÝ
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Giấy CNQSDĐ</span>
                <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded">SH-782/DT</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Bảo hiểm nông nghiệp</span>
                <span className="text-[10px] font-bold text-emerald-600">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetGrowth;
