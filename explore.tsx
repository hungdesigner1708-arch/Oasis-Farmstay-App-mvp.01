
import React, { useState } from 'react';
import { MOCK_DESTINATIONS, MOCK_HUBS } from '../constants';
import { MapPin, Star, Compass, Utensils, Car, Ticket, Search, CheckCircle2, ShieldCheck, Wallet, Globe, ArrowUpRight, Loader2 } from 'lucide-react';

const Explore: React.FC = () => {
  const [filter, setFilter] = useState<string>('ALL');
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);

  const categories = [
    { id: 'ALL', label: 'Tất cả', icon: Compass },
    { id: 'ATTRACTION', label: 'Tham quan', icon: MapPin },
    { id: 'FOOD', label: 'Ẩm thực', icon: Utensils },
    { id: 'TOUR', label: 'Tour & Vé', icon: Ticket },
    { id: 'TRANSPORT', label: 'Di chuyển', icon: Car },
  ];

  const filteredDestinations = filter === 'ALL' 
    ? MOCK_DESTINATIONS 
    : MOCK_DESTINATIONS.filter(d => d.category === filter);

  const handleBooking = (name: string, type: string) => {
    setIsProcessing(`${name}-${type}`);
    // Giả lập xử lý thanh toán ví Oasis
    setTimeout(() => {
      setIsProcessing(null);
      setBookingStatus(`${type}: ${name}`);
      setTimeout(() => setBookingStatus(null), 4000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-16 animate-in fade-in duration-700 pb-24 md:pb-8">
      {/* Header Explore */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[#005f73]">
            <Compass className="w-6 h-6 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Oasis Discovery Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-strong text-[#1b4332]">Khám Phá Địa Phương</h1>
          <p className="text-slate-500 font-medium italic">Gợi ý tinh hoa ẩm thực, danh thắng và địa chỉ Farm Oasis trên toàn quốc.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Tìm địa điểm, món ăn..."
            className="w-full pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#005f73]/20 transition-all"
          />
        </div>
      </div>

      {/* Network Hub Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Globe className="w-8 h-8 text-[#005f73]" />
          <h2 className="text-3xl font-strong text-[#1b4332]">Mạng Lưới Oasis Farm</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_HUBS.map(hub => (
            <div key={hub.id} className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#e9c46a]/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="flex-1 space-y-4">
                <div className="w-12 h-12 bg-[#1b4332]/5 rounded-2xl flex items-center justify-center text-[#1b4332]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-strong text-xl text-slate-800 leading-tight">{hub.name}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Oasis Regional Hub</p>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed italic">{hub.description}</p>
                <div className="pt-4 border-t border-slate-50">
                   <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Địa chỉ chi tiết</p>
                   <p className="text-xs text-slate-600 font-bold leading-relaxed">{hub.address}</p>
                </div>
              </div>
              <button className="w-full mt-8 py-4 rounded-xl border-2 border-[#005f73] text-[#005f73] font-strong text-[10px] tracking-widest flex items-center justify-center gap-2 group/btn hover:bg-[#005f73] hover:text-white transition-all">
                XEM BẢN ĐỒ
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Categories for Places */}
      <div className="space-y-10">
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-strong text-xs transition-all border ${
                filter === cat.id 
                  ? 'bg-[#1b4332] text-white border-[#1b4332] shadow-lg scale-105' 
                  : 'bg-white text-slate-500 border-slate-100 hover:border-[#005f73]/30'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid Destinations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {filteredDestinations.map((dest) => (
            <div 
              key={dest.id} 
              className="group bg-white rounded-[3rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row h-full"
            >
              <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                <img src={dest.imageUrl} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-strong text-[#1b4332] shadow-lg">
                  {dest.category}
                </div>
              </div>
              
              <div className="p-10 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-strong text-slate-800 leading-tight group-hover:text-[#005f73] transition-colors">{dest.name}</h3>
                    <div className="flex items-center gap-1 text-[#e9c46a]">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-bold text-slate-700">{dest.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                    <MapPin className="w-3 h-3" />
                    {dest.location}
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {dest.description}
                  </p>
                  {dest.priceInfo && (
                    <div className="inline-block bg-[#f0f4f8] px-4 py-2 rounded-xl text-[10px] font-black text-[#005f73] uppercase tracking-widest">
                      Giá tham khảo: {dest.priceInfo}
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-50 flex flex-col gap-4">
                  {dest.category === 'ATTRACTION' ? (
                    <div className="space-y-3">
                      <button className="w-full py-4 rounded-2xl border-2 border-[#1b4332] text-[#1b4332] font-strong text-[10px] tracking-wider flex items-center justify-center gap-2 hover:bg-[#1b4332] hover:text-white transition-all shadow-sm">
                        <MapPin className="w-4 h-4" />
                        XEM CHỈ ĐƯỜNG
                      </button>
                      
                      <div className="flex gap-3">
                        <button 
                          disabled={!!isProcessing}
                          onClick={() => handleBooking(dest.name, 'ĐẶT XE')}
                          className="flex-1 btn-sand py-4 rounded-2xl font-strong text-[9px] tracking-wider flex items-center justify-center gap-2 group/btn shadow-md transition-all active:scale-95 disabled:opacity-50"
                        >
                          {isProcessing === `${dest.name}-ĐẶT XE` ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <><Car className="w-4 h-4" /> ĐẶT XE OASIS</>
                          )}
                        </button>
                        <button 
                          disabled={!!isProcessing}
                          onClick={() => handleBooking(dest.name, 'ĐẶT TOUR')}
                          className="flex-1 bg-[#005f73] text-white py-4 rounded-2xl font-strong text-[9px] tracking-wider flex items-center justify-center gap-2 group/btn shadow-md transition-all active:scale-95 disabled:opacity-50"
                        >
                          {isProcessing === `${dest.name}-ĐẶT TOUR` ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <><Ticket className="w-4 h-4" /> ĐẶT TOUR RIÊNG</>
                          )}
                        </button>
                      </div>
                      <p className="text-[9px] text-center font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1">
                        <Wallet className="w-3 h-3" /> Thanh toán trực tiếp qua ví Oasis
                      </p>
                    </div>
                  ) : (
                    <button 
                      disabled={!!isProcessing}
                      onClick={() => handleBooking(dest.name, 'THANH TOÁN')}
                      className="w-full btn-sand py-4 rounded-2xl font-strong text-[10px] tracking-wider flex items-center justify-center gap-2 group/btn shadow-md transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isProcessing === `${dest.name}-THANH TOÁN` ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <><Wallet className="w-4 h-4" /> THANH TOÁN VÍ OASIS</>
                      )}
                    </button>
                  )}
                  
                  {dest.commissionRate > 0 && (
                    <div className="flex items-center gap-2 text-[9px] font-black text-emerald-600 uppercase tracking-widest px-2 justify-center">
                      <ShieldCheck className="w-3 h-3" />
                      Hoàn {dest.commissionRate}% OasisPoints cho Investor
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Banner Section */}
      <div className="relative rounded-[3.5rem] overflow-hidden bg-[#1b4332] p-10 md:p-16 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#e9c46a]/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-strong leading-tight">
              Tích Hợp <span className="text-[#e9c46a]">Thanh Toán Đối Tác</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed font-medium">
              Oasis Farmstay kết nối trực tiếp với các nhà xe, hướng dẫn viên và nhà hàng địa phương. Khi khách hàng thanh toán qua app, hệ thống tự động trích xuất hoa hồng cho Farm và hoàn điểm thưởng OasisPoints cho quý khách.
            </p>
            <div className="flex gap-6 pt-4">
              <div className="flex flex-col">
                <span className="text-3xl font-strong text-white">100%</span>
                <span className="text-[10px] uppercase font-black text-white/40 tracking-widest">Minh bạch giá</span>
              </div>
              <div className="w-[1px] h-12 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-strong text-[#e9c46a]">15%</span>
                <span className="text-[10px] uppercase font-black text-white/40 tracking-widest">Hoa hồng tối đa</span>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 space-y-6">
             <h4 className="font-strong text-xs uppercase tracking-[0.2em] text-[#e9c46a]">Dành cho đối tác</h4>
             <p className="text-sm text-white/80 leading-relaxed italic">"Muốn đưa dịch vụ của bạn lên Oasis Discovery? Hãy liên hệ với chúng tôi để bắt đầu hành trình hợp tác 4.0."</p>
             <button className="w-full btn-sand py-4 rounded-xl font-strong text-xs">ĐĂNG KÝ ĐỐI TÁC</button>
          </div>
        </div>
      </div>

      {/* Booking Overlay Notification */}
      {bookingStatus && (
        <div className="fixed bottom-24 right-8 z-[60] bg-[#1b4332] text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10 border border-[#e9c46a]/30">
          <div className="bg-[#e9c46a] p-2 rounded-full">
            <CheckCircle2 className="w-6 h-6 text-[#1b4332]" />
          </div>
          <div>
            <p className="font-strong text-sm uppercase tracking-wider">Thanh toán ví Oasis thành công!</p>
            <p className="text-[10px] font-bold opacity-80 uppercase tracking-tighter">{bookingStatus}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
