
import React, { useState } from 'react';
import { Gift, Users, Copy, Share2, Star, CheckCircle2, Award, Palmtree, ArrowRight, Sparkles, Home } from 'lucide-react';

const Referral: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "OASIS-MEMBER-88";
  
  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const friends = [
    { name: "Minh Trần", status: "Đã thanh toán", points: 2500, date: "15/03/2024", invoiceValue: "50.000.000đ" },
    { name: "Lan Anh", status: "Đã mua sắm", points: 120, date: "12/03/2024", invoiceValue: "2.400.000đ" },
    { name: "Quốc Huy", status: "Chưa kích hoạt", points: 0, date: "10/03/2024", invoiceValue: "0đ" },
  ];

  const rewards = [
    { id: 1, name: "01 Đêm Glamping Cao Cấp", cost: 5000, icon: Palmtree, desc: "Trải nghiệm ngủ dưới bầu trời sao tại vườn Oasis." },
    { id: 2, name: "01 Đêm Villa Hướng Biển", cost: 12000, icon: Home, desc: "Biệt thự sang trọng với hồ bơi riêng biệt." },
    { id: 3, name: "Gói Nghỉ Dưỡng Oasis Trọn Gói", cost: 25000, icon: Sparkles, desc: "Bao gồm ăn uống, spa và tour tham quan Farm." },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 pb-24 md:pb-8">
      {/* Hero Banner - Luxurious Nature Theme */}
      <div className="relative rounded-[3.5rem] overflow-hidden bg-[#1b4332] text-white p-10 md:p-20 shadow-2xl border border-white/10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e9c46a]/10 rounded-full blur-[120px] -mr-48 -mt-48 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#94d2bd]/5 rounded-full blur-[100px] -ml-24 -mb-24"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-[#e9c46a] animate-spin-slow" />
              <span className="text-[10px] font-strong tracking-[0.2em] uppercase">Đặc quyền Oasis Member</span>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-strong leading-[1.1]">
                Gieo kết nối,<br /> 
                <span className="text-[#e9c46a]">Gặt kỳ nghỉ vàng</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed max-w-lg font-medium">
                Chia sẻ phong cách sống bền vững tại Oasis Farmstay. Bạn nhận ngay <span className="text-[#e9c46a] font-bold">5% giá trị hóa đơn</span> từ bạn bè giới thiệu để quy đổi thành các đêm nghỉ dưỡng tuyệt mỹ.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-strong text-white">2.620</span>
                <span className="text-[10px] uppercase font-black text-white/40 tracking-widest">OasisPoints khả dụng</span>
              </div>
              <div className="w-[1px] h-12 bg-white/10 hidden sm:block"></div>
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-strong text-[#e9c46a]">03</span>
                <span className="text-[10px] uppercase font-black text-white/40 tracking-widest">Bạn bè đã kết nối</span>
              </div>
            </div>
          </div>

          <div className="glass-card !bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/20 shadow-2xl">
            <h4 className="text-center font-strong text-xs mb-8 uppercase tracking-[0.3em] text-white/60">Mã định danh của bạn</h4>
            <div 
              className="bg-white rounded-[2rem] p-8 flex items-center justify-between mb-8 group cursor-pointer hover:shadow-[0_0_30px_rgba(233,196,106,0.3)] transition-all duration-500" 
              onClick={handleCopy}
            >
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-tighter mb-1">Copy Link Mời</span>
                <span className="text-3xl font-strong text-[#1b4332] tracking-wider">{referralCode}</span>
              </div>
              <div className="bg-[#1b4332] p-4 rounded-2xl text-white group-hover:scale-110 transition-transform shadow-lg">
                {copied ? <CheckCircle2 className="w-6 h-6 text-[#e9c46a]" /> : <Copy className="w-6 h-6" />}
              </div>
            </div>
            
            <button className="w-full btn-sand py-5 rounded-2xl font-strong text-sm flex items-center justify-center gap-4 group">
              <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              GỬI LỜI MỜI TRẢI NGHIỆM
              <ArrowRight className="w-4 h-4" />
            </button>
            
            {copied && (
              <p className="text-center text-[10px] text-[#e9c46a] mt-4 font-black uppercase tracking-widest animate-bounce">
                Đã sao chép vào bộ nhớ tạm!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Rewards Grid - Luxury Redemption Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-3xl font-strong text-[#1b4332] flex items-center gap-4">
              <Gift className="w-8 h-8 text-[#e9c46a]" />
              Quy đổi đêm nghỉ Oasis
            </h3>
            <p className="text-slate-500 font-medium italic">Sử dụng điểm tích lũy để tận hưởng các dịch vụ nghỉ dưỡng cao cấp.</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
             <span className="text-xs font-bold text-slate-400">ĐIỂM HIỆN CÓ:</span>
             <span className="font-strong text-[#005f73]">2.620 PTS</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rewards.map((reward) => (
            <div key={reward.id} className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 hover:shadow-2xl transition-all duration-500 relative flex flex-col h-full">
              <div className="mb-8 relative">
                <div className="w-16 h-16 rounded-[1.5rem] bg-[#f0f4f8] group-hover:bg-[#1b4332] transition-colors flex items-center justify-center text-[#1b4332] group-hover:text-white shadow-inner">
                  <reward.icon className="w-8 h-8" />
                </div>
                <div className="absolute -top-2 -right-2 bg-[#e9c46a] text-[#1b4332] text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                  HOT DEAL
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <h4 className="text-xl font-strong text-[#1b4332]">{reward.name}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{reward.desc}</p>
                <div className="pt-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#e9c46a]" />
                  <span className="text-2xl font-strong text-[#005f73]">{reward.cost.toLocaleString()}</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">OasisPoints</span>
                </div>
              </div>

              <div className="mt-8">
                <button className="w-full py-4 rounded-xl border-2 border-[#1b4332] text-[#1b4332] font-strong text-xs hover:bg-[#1b4332] hover:text-white transition-all group/btn flex items-center justify-center gap-2">
                  ĐỔI THƯỞNG NGAY
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Friends & Benefits Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <div className="lg:col-span-2 space-y-8">
          <h3 className="text-2xl font-strong text-[#1b4332]">Danh sách bạn bè đã mời</h3>
          <div className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                    <th className="px-8 py-6">Thành viên</th>
                    <th className="px-8 py-6">Ngày tham gia</th>
                    <th className="px-8 py-6">Giá trị hóa đơn</th>
                    <th className="px-8 py-6 text-right">Hoa hồng (5%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {friends.map((friend, i) => (
                    <tr key={i} className="group hover:bg-slate-50/30 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-coastal flex items-center justify-center text-white text-xs font-strong">
                            {friend.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-strong text-slate-800">{friend.name}</p>
                            <span className={`text-[9px] font-black uppercase tracking-widest ${friend.points > 0 ? 'text-emerald-500' : 'text-slate-300'}`}>
                              {friend.status}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-xs font-bold text-slate-500">{friend.date}</td>
                      <td className="px-8 py-6 text-xs font-mono font-bold text-slate-700">{friend.invoiceValue}</td>
                      <td className="px-8 py-6 text-right">
                        <span className={`text-sm font-strong ${friend.points > 0 ? 'text-[#005f73]' : 'text-slate-300'}`}>
                          {friend.points > 0 ? `+${friend.points.toLocaleString()} PTS` : '--'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-[#e9c46a]/10 rounded-[3rem] p-10 border border-[#e9c46a]/20 space-y-8">
           <h4 className="font-strong text-[#1b4332] text-xl">Cách hoạt động</h4>
           <div className="space-y-6">
              {[
                { step: "01", text: "Chia sẻ mã mời của bạn cho bạn bè, người thân." },
                { step: "02", text: "Bạn bè thực hiện đầu tư hoặc thanh toán hóa đơn tại Oasis." },
                { step: "03", text: "Bạn nhận ngay 5% giá trị hóa đơn quy đổi thành điểm thưởng." },
                { step: "04", text: "Dùng điểm để tận hưởng các đêm nghỉ miễn phí đẳng cấp." },
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="font-strong text-[#e9c46a] text-lg">{step.step}</span>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">{step.text}</p>
                </div>
              ))}
           </div>
           
           <div className="pt-6 border-t border-[#e9c46a]/20">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2 italic">Lưu ý bảo mật</p>
              <p className="text-[11px] text-slate-500 leading-relaxed italic">
                Điểm thưởng sẽ được ghi nhận tự động vào ví ngay sau khi hệ thống xác thực thanh toán thành công. Mọi khiếu nại vui lòng liên hệ Oasis Support.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;
