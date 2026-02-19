
import React, { useState } from 'react';
import { ShoppingCart, TrendingUp, Info, ArrowUpRight, ArrowDownRight, Activity, MapPin } from 'lucide-react';

const Marketplace: React.FC = () => {
  const [region, setRegion] = useState<'ALL' | 'NINH_THUAN' | 'DA_TEH' | 'TAY_NINH'>('ALL');

  const tokens = [
    { name: 'Oasis Da Teh Durian', symbol: 'ODD', price: 155000, change: 14.2, location: 'DA_TEH', vol: '2.4B' },
    { name: 'Oasis Tay Ninh Wagyu', symbol: 'OTW', price: 85000, change: 8.5, location: 'TAY_NINH', vol: '1.8B' },
    { name: 'Oasis Ninh Thuan Melon', symbol: 'ONM', price: 45000, change: -1.2, location: 'NINH_THUAN', vol: '900M' },
    { name: 'Oasis Coastal Resort', symbol: 'OCR', price: 210000, change: 2.1, location: 'NINH_THUAN', vol: '3.5B' },
  ];

  const filteredTokens = region === 'ALL' ? tokens : tokens.filter(t => t.location === region);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500 pb-24 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-strong text-[#1b4332]">Sàn Giao Dịch Cổ Phần</h2>
          <p className="text-slate-500 text-sm mt-1 italic">Đầu tư vào các Farm tiềm năng tại Ninh Thuận, Da Teh và Tây Ninh.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Khối lượng 24h</p>
              <p className="text-base font-strong text-[#005f73]">68.5 Tỷ VNĐ</p>
            </div>
            <Activity className="w-5 h-5 text-[#e9c46a]" />
          </div>
        </div>
      </div>

      {/* Region Filter */}
      <div className="flex flex-wrap gap-4">
        {[
          { id: 'ALL', label: 'Tất cả vùng', icon: MapPin },
          { id: 'NINH_THUAN', label: 'Ninh Thuận', icon: MapPin },
          { id: 'DA_TEH', label: 'Da Teh', icon: MapPin },
          { id: 'TAY_NINH', label: 'Tây Ninh', icon: MapPin },
        ].map((r) => (
          <button
            key={r.id}
            onClick={() => setRegion(r.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-strong text-[10px] tracking-widest transition-all ${
              region === r.id ? 'bg-[#1b4332] text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100 hover:border-[#e9c46a]'
            }`}
          >
            <r.icon className="w-3 h-3" />
            {r.label.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredTokens.map((token, i) => (
          <div key={i} className="bg-white rounded-[3rem] p-10 border border-slate-100 hover:shadow-2xl transition-all group flex flex-col h-full animate-in zoom-in-95 duration-500">
            <div className="flex justify-between items-start mb-8">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-[#005f73] group-hover:bg-[#005f73] group-hover:text-white transition-all shadow-inner text-lg">
                {token.symbol}
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black px-3 py-1.5 rounded-full ${token.change > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                {token.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(token.change)}%
              </div>
            </div>
            
            <h4 className="text-xl font-strong text-slate-800 leading-tight mb-2">{token.name}</h4>
            <div className="flex items-center gap-2 text-[10px] text-[#e9c46a] font-black uppercase tracking-widest mb-10">
              <MapPin className="w-3 h-3" />
              {token.location.replace('_', ' ')}
            </div>
            
            <div className="mt-auto space-y-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[9px] uppercase text-slate-400 font-black mb-1">Cổ phần</p>
                  <p className="text-2xl font-strong text-[#1b4332]">{token.price.toLocaleString('vi-VN')} <span className="text-xs font-normal">đ</span></p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="bg-[#1b4332] text-white py-4 rounded-xl text-[10px] font-strong tracking-widest hover:bg-[#005f73] transition-all shadow-md">ĐẦU TƯ</button>
                <button className="bg-slate-50 text-slate-700 py-4 rounded-xl text-[10px] font-strong tracking-widest hover:bg-slate-200 transition-all border border-slate-100">BÁN</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-coastal rounded-[3.5rem] p-12 flex flex-col md:flex-row items-center gap-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#e9c46a]/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        <div className="bg-white/10 p-8 rounded-[2.5rem] backdrop-blur flex-shrink-0 border border-white/10">
          <Info className="w-12 h-12 text-[#e9c46a]" />
        </div>
        <div className="space-y-6">
          <h3 className="text-3xl font-strong">Minh bạch trên từng cây trồng</h3>
          <p className="text-white/70 text-lg leading-relaxed max-w-4xl font-medium italic">
            "Mỗi Token sở hữu đều được bảo chứng bởi thực thể vật lý (cây sầu riêng, cá thể dông, bò Wagyu). Bạn có thể đến thăm farm bất cứ lúc nào và hưởng quyền lợi nghỉ dưỡng trong chính hệ sinh thái mà bạn là chủ sở hữu."
          </p>
          <div className="flex flex-wrap gap-8 pt-4">
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-strong">1200+</span>
              <span className="text-[10px] uppercase font-black text-white/40 tracking-widest">Investors</span>
            </div>
            <div className="w-[1px] h-12 bg-white/10"></div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-strong">100%</span>
              <span className="text-[10px] uppercase font-black text-white/40 tracking-widest">Asset-Backed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
