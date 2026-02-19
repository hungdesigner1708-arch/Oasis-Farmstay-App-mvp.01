
import React, { useState } from 'react';
import { WalletInfo, PrepaidCard, MembershipTier, RedeemableItem } from '../types';
import { MOCK_PREPAID_CARDS, TIER_DEFINITIONS, MOCK_REDEEMABLES } from '../constants';
import { Download, ArrowUpRight, ArrowDownLeft, ShieldAlert, CreditCard, Sparkles, CheckCircle2, Zap, Gem, Award, Star, Info, Gift, ShoppingBag, Palmtree, Utensils, Loader2, X, AlertTriangle } from 'lucide-react';

interface WalletProps {
  wallet: WalletInfo;
}

const Wallet: React.FC<WalletProps> = ({ wallet }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PREPAID' | 'LOYALTY' | 'REDEEM'>('OVERVIEW');
  const [isRedeeming, setIsRedeeming] = useState<string | null>(null);
  const [redeemSuccess, setRedeemSuccess] = useState<string | null>(null);
  const [confirmItem, setConfirmItem] = useState<RedeemableItem | null>(null);
  
  const currentTierInfo = TIER_DEFINITIONS[wallet.membershipTier];

  const handleRedeemClick = (item: RedeemableItem) => {
    if (wallet.rewardPoints < item.points) return;
    setConfirmItem(item);
  };

  const executeRedeem = () => {
    if (!confirmItem) return;
    
    const item = confirmItem;
    setConfirmItem(null);
    setIsRedeeming(item.id);
    
    // Giả lập giao dịch blockchain đổi điểm
    setTimeout(() => {
      setIsRedeeming(null);
      setRedeemSuccess(item.name);
      setTimeout(() => setRedeemSuccess(null), 4000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500 pb-24 md:pb-8">
      {/* Wallet Navigation */}
      <div className="flex gap-6 border-b border-slate-200 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('OVERVIEW')}
          className={`pb-4 px-2 text-sm font-strong transition-all shrink-0 ${activeTab === 'OVERVIEW' ? 'border-b-2 border-[#1b4332] text-[#1b4332]' : 'text-slate-400'}`}
        >
          VÍ TÀI SẢN
        </button>
        <button 
          onClick={() => setActiveTab('PREPAID')}
          className={`pb-4 px-2 text-sm font-strong transition-all flex items-center gap-2 shrink-0 ${activeTab === 'PREPAID' ? 'border-b-2 border-[#1b4332] text-[#1b4332]' : 'text-slate-400'}`}
        >
          THẺ ĐẶC QUYỀN
          <Sparkles className="w-4 h-4 text-[#e9c46a]" />
        </button>
        <button 
          onClick={() => setActiveTab('LOYALTY')}
          className={`pb-4 px-2 text-sm font-strong transition-all flex items-center gap-2 shrink-0 ${activeTab === 'LOYALTY' ? 'border-b-2 border-[#1b4332] text-[#1b4332]' : 'text-slate-400'}`}
        >
          HỘI VIÊN
          <Gem className="w-4 h-4 text-[#005f73]" />
        </button>
        <button 
          onClick={() => setActiveTab('REDEEM')}
          className={`pb-4 px-2 text-sm font-strong transition-all flex items-center gap-2 shrink-0 ${activeTab === 'REDEEM' ? 'border-b-2 border-[#1b4332] text-[#1b4332]' : 'text-slate-400'}`}
        >
          ĐỔI THƯỞNG
          <Gift className="w-4 h-4 text-[#ee9b00]" />
        </button>
      </div>

      {activeTab === 'OVERVIEW' && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass-card rounded-[3.5rem] p-12 relative overflow-hidden flex flex-col justify-between h-72 border-none shadow-2xl">
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Tài sản khả dụng</p>
                  <h2 className="text-5xl font-strong mt-3 text-[#1b4332]">{wallet.totalBalance.toLocaleString('vi-VN')} <span className="text-xl font-normal">đ</span></h2>
                </div>
                <div className="bg-[#1b4332] p-5 rounded-2xl shadow-xl">
                  <CreditCard className="w-8 h-8 text-[#e9c46a]" />
                </div>
              </div>
              <div className="relative z-10 flex gap-6">
                <button className="btn-sand px-10 py-4 rounded-2xl font-strong text-sm shadow-xl">NẠP TIỀN</button>
                <button className="bg-white/50 backdrop-blur border border-white/40 text-slate-700 px-10 py-4 rounded-2xl font-strong text-sm hover:bg-white transition-all">RÚT TIỀN</button>
              </div>
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#e9c46a]/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="space-y-6">
              <div className="bg-red-50 rounded-[2.5rem] p-8 border border-red-100 flex items-start gap-4">
                <div className="bg-red-500/10 p-3 rounded-2xl">
                  <ShieldAlert className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-strong text-xs text-red-900 uppercase tracking-widest">Khấu trừ thuế</h4>
                  <p className="text-2xl font-strong text-red-600 mt-2">{wallet.pendingTax.toLocaleString('vi-VN')} đ</p>
                </div>
              </div>

              <div className="bg-amber-50 rounded-[2.5rem] p-8 border border-amber-100 relative overflow-hidden">
                <h4 className="font-strong text-xs text-amber-900 uppercase tracking-widest mb-2">Internal Tokens</h4>
                <div className="flex items-end justify-between relative z-10">
                  <span className="text-3xl font-strong text-[#1b4332]">{wallet.internalTokens} <span className="text-xs">OAST</span></span>
                  <button className="text-[10px] font-black text-amber-800 uppercase tracking-widest underline underline-offset-4">Giao dịch ngay</button>
                </div>
                <Zap className="absolute bottom-4 right-4 w-16 h-16 text-amber-200/50 -mb-4 -mr-4" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-strong text-[#1b4332]">Lịch sử giao dịch</h3>
              <button className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-50">
                    <th className="pb-6">Phát sinh</th>
                    <th className="pb-6">Thời gian</th>
                    <th className="pb-6">Trạng thái</th>
                    <th className="pb-6 text-right">Số tiền</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {wallet.history.map((tx) => (
                    <tr key={tx.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-2xl ${
                            tx.amount > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                          }`}>
                            {tx.amount > 0 ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-strong text-sm text-slate-800">{tx.description}</p>
                            <p className="text-[10px] text-slate-400 font-mono mt-1">TXID: {tx.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 text-xs font-bold text-slate-500">
                        {new Date(tx.date).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="py-6">
                        <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                          {tx.status}
                        </span>
                      </td>
                      <td className={`py-6 text-right font-strong text-base ${
                        tx.amount > 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {tx.amount > 0 ? '+' : ''} {tx.amount.toLocaleString('vi-VN')} đ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'PREPAID' && (
        <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-500">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-4xl font-strong text-[#1b4332]">Thẻ Oasis Discovery</h2>
            <p className="text-slate-500 italic">Mua thẻ trả trước để hưởng các đặc quyền nâng hạng hội viên ngay lập tức và ưu đãi đêm nghỉ miễn phí.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_PREPAID_CARDS.map((card) => (
              <div key={card.id} className="group bg-white rounded-[3rem] p-8 border border-slate-100 hover:shadow-2xl transition-all flex flex-col h-full">
                <div className={`w-full h-40 rounded-[2rem] mb-8 p-6 flex flex-col justify-between text-white relative overflow-hidden ${
                  card.tier === 'PLATINUM' ? 'bg-[#1b4332]' : 
                  card.tier === 'GOLD' ? 'bg-[#c5a059]' : 
                  card.tier === 'SILVER' ? 'bg-slate-400' : 'bg-[#005f73]'
                }`}>
                  <div className="flex justify-between items-start z-10">
                    <CreditCard className="w-6 h-6 opacity-60" />
                    <span className="text-[10px] font-black tracking-widest">OASIS CARD</span>
                  </div>
                  <div className="z-10">
                    <p className="text-[10px] opacity-60 uppercase font-black">Tier</p>
                    <p className="text-xl font-strong tracking-widest">{card.tier}</p>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Giá bán</p>
                    <p className="text-2xl font-strong text-[#1b4332]">{card.price.toLocaleString('vi-VN')} đ</p>
                    <p className="text-xs font-bold text-emerald-600 mt-1">Giá trị thẻ: {card.value.toLocaleString('vi-VN')} đ</p>
                  </div>

                  <div className="space-y-3">
                    {card.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-3 text-[11px] text-slate-500 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#e9c46a] mt-0.5 flex-shrink-0" />
                        {b}
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-10 py-4 rounded-2xl border-2 border-[#1b4332] text-[#1b4332] font-strong text-[10px] tracking-widest hover:bg-[#1b4332] hover:text-white transition-all">
                  MUA THẺ NGAY
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'LOYALTY' && (
        <div className="space-y-12 animate-in slide-in-from-right-10 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div className={`rounded-[3rem] p-12 text-white shadow-2xl bg-gradient-to-br ${currentTierInfo.color} relative overflow-hidden`}>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20">
                      <Gem className="w-5 h-5 text-[#e9c46a]" />
                      <span className="text-xs font-strong tracking-[0.2em] uppercase">{currentTierInfo.label}</span>
                    </div>
                    <h2 className="text-4xl font-strong">Hoàng Nguyễn</h2>
                    <div className="space-y-2">
                       <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Tiến trình nâng hạng</p>
                       <div className="w-full md:w-80 h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
                          <div 
                            className="h-full bg-[#e9c46a] shadow-[0_0_10px_#e9c46a]" 
                            style={{ width: `${(wallet.rewardPoints / (wallet.rewardPoints + wallet.pointsToNextTier)) * 100}%` }}
                          ></div>
                       </div>
                       <p className="text-xs font-bold">Cần thêm <span className="text-[#e9c46a]">{wallet.pointsToNextTier.toLocaleString()} OasisPoints</span> để nâng hạng Diamond</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 flex flex-col items-center">
                    <Award className="w-12 h-12 text-[#e9c46a] mb-3" />
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Điểm tích lũy</p>
                    <p className="text-4xl font-strong text-white">{wallet.rewardPoints.toLocaleString()}</p>
                    <button onClick={() => setActiveTab('REDEEM')} className="mt-6 text-[10px] font-black text-[#e9c46a] uppercase tracking-widest hover:underline underline-offset-4">Dùng điểm đổi quà →</button>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[80px] -mr-40 -mt-40"></div>
              </div>

              <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl space-y-8">
                <div className="flex items-center gap-4">
                  <Star className="w-6 h-6 text-[#e9c46a]" />
                  <h3 className="text-2xl font-strong text-[#1b4332]">Đặc quyền hạng {wallet.membershipTier}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentTierInfo.perks.map((perk, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-[#005f73]/30 transition-all">
                      <div className="bg-white p-2 rounded-xl shadow-sm text-[#005f73] group-hover:bg-[#005f73] group-hover:text-white transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 leading-relaxed">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl space-y-8">
               <h4 className="font-strong text-xs text-[#005f73] uppercase tracking-widest border-b border-slate-50 pb-4">Lộ trình hội viên</h4>
               <div className="space-y-10">
                 {Object.values(TIER_DEFINITIONS).map((t, i) => (
                   <div key={t.tier} className={`relative flex gap-6 ${wallet.membershipTier === t.tier ? 'scale-105' : 'opacity-60'}`}>
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white shrink-0 shadow-lg`}>
                        <Gem className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                           <p className="font-strong text-sm">{t.label}</p>
                           {wallet.membershipTier === t.tier && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Tối thiểu: {t.minPoints.toLocaleString()} PTS</p>
                        <p className="text-[9px] font-medium text-slate-500 leading-relaxed">{t.perks[0]}, {t.perks[1]}</p>
                      </div>
                      {i < 2 && <div className="absolute left-6 top-14 w-[1px] h-6 bg-slate-100"></div>}
                   </div>
                 ))}
               </div>
               
               <div className="pt-6 border-t border-slate-50 space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-black text-[#e9c46a] uppercase tracking-widest">
                    <Info className="w-4 h-4" />
                    Cách thức nâng hạng
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed italic">
                    1. Tích lũy điểm thông qua sử dụng dịch vụ (1% - 5% tùy hạng hiện tại).<br/>
                    2. Mua thẻ trả trước để nâng hạng đặc cách lên Vàng hoặc Kim Cương.<br/>
                    3. Đầu tư vào các Farm Oasis sẽ được cộng điểm thưởng Investor cực lớn.
                  </p>
               </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'REDEEM' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-strong text-[#1b4332]">Trung Tâm Đổi Thưởng</h2>
              <p className="text-slate-500 italic">Sử dụng OasisPoints để trải nghiệm tinh hoa nông sản và dịch vụ tại Farm.</p>
            </div>
            <div className="bg-white px-8 py-4 rounded-[2rem] border border-slate-100 shadow-xl flex items-center gap-6">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Điểm của bạn</span>
                  <span className="text-2xl font-strong text-[#005f73]">{wallet.rewardPoints.toLocaleString()} <span className="text-xs font-normal">PTS</span></span>
               </div>
               <div className="w-12 h-12 bg-[#e9c46a]/10 rounded-2xl flex items-center justify-center text-[#ee9b00]">
                  <Award className="w-6 h-6" />
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {MOCK_REDEEMABLES.map((item) => (
              <div key={item.id} className="group bg-white rounded-[3rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[9px] font-strong text-[#1b4332] shadow-lg flex items-center gap-2">
                    {item.type === 'PRODUCT' ? <ShoppingBag className="w-3 h-3" /> : item.type === 'STAY' ? <Palmtree className="w-3 h-3" /> : <Utensils className="w-3 h-3" />}
                    {item.type}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col space-y-4">
                  <div>
                    <h4 className="font-strong text-lg text-slate-800 leading-tight group-hover:text-[#005f73] transition-colors">{item.name}</h4>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed italic">{item.description}</p>
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-slate-50 space-y-6">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#e9c46a] fill-current" />
                      <span className="text-xl font-strong text-[#1b4332]">{item.points.toLocaleString()}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">PTS</span>
                    </div>
                    
                    <button 
                      onClick={() => handleRedeemClick(item)}
                      disabled={wallet.rewardPoints < item.points || isRedeeming === item.id}
                      className={`w-full py-4 rounded-2xl font-strong text-[10px] tracking-widest flex items-center justify-center gap-3 transition-all ${
                        wallet.rewardPoints >= item.points 
                        ? 'bg-[#1b4332] text-white hover:bg-[#005f73] shadow-lg active:scale-95' 
                        : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                      }`}
                    >
                      {isRedeeming === item.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Gift className="w-4 h-4" />
                          {wallet.rewardPoints >= item.points ? 'ĐỔI NGAY' : 'CHƯA ĐỦ ĐIỂM'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-100 flex flex-col md:flex-row items-center gap-12">
             <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-xl flex-shrink-0">
                <ShieldAlert className="w-12 h-12 text-[#e9c46a]" />
             </div>
             <div className="space-y-4">
                <h3 className="text-2xl font-strong text-[#1b4332]">Chính sách sử dụng OasisPoints</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  Điểm thưởng OasisPoints có giá trị quy đổi sang hàng hóa và dịch vụ trong toàn bộ hệ sinh thái Oasis Farmstay. Điểm không có giá trị quy đổi thành tiền mặt. Sau khi xác nhận đổi thưởng, mã QR nhận quà sẽ được gửi vào mục "Voucher của tôi" trong ví của bạn. Thời gian hiệu lực của mã QR là 30 ngày kể từ ngày đổi.
                </p>
             </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setConfirmItem(null)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[3.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-300">
            <button 
              onClick={() => setConfirmItem(null)}
              className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-10 md:p-12 space-y-8">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-[#e9c46a]/20 rounded-full flex items-center justify-center mx-auto text-[#ee9b00]">
                  <Gift className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-strong text-[#1b4332]">Xác nhận đổi thưởng</h3>
                <p className="text-slate-500 italic">Bạn có chắc chắn muốn dùng điểm tích lũy để đổi quà tặng này?</p>
              </div>

              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex items-center gap-6">
                <img src={confirmItem.imageUrl} alt={confirmItem.name} className="w-24 h-24 object-cover rounded-2xl shadow-md" />
                <div className="space-y-2">
                  <p className="font-strong text-lg text-slate-800 leading-tight">{confirmItem.name}</p>
                  <div className="flex items-center gap-2 text-[#ee9b00]">
                    <Zap className="w-4 h-4 fill-current" />
                    <span className="font-strong text-xl">{confirmItem.points.toLocaleString()} PTS</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-2xl p-4 flex items-start gap-4 border border-amber-100">
                <AlertTriangle className="w-5 h-5 text-[#ee9b00] shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
                  Lưu ý: Giao dịch này không thể hoàn trả sau khi đã xác nhận. Điểm thưởng sẽ được trừ ngay lập tức vào ví của bạn.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button 
                  onClick={() => setConfirmItem(null)}
                  className="py-4 rounded-2xl font-strong text-xs tracking-widest text-slate-500 border-2 border-slate-100 hover:bg-slate-50 transition-all"
                >
                  HỦY BỎ
                </button>
                <button 
                  onClick={executeRedeem}
                  className="py-4 rounded-2xl font-strong text-xs tracking-widest bg-[#1b4332] text-white hover:bg-[#005f73] shadow-lg shadow-[#1b4332]/20 transition-all active:scale-95"
                >
                  XÁC NHẬN ĐỔI
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {redeemSuccess && (
        <div className="fixed bottom-24 right-8 z-[60] bg-[#1b4332] text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10 border border-[#e9c46a]/30">
          <div className="bg-[#e9c46a] p-2 rounded-full">
            <CheckCircle2 className="w-6 h-6 text-[#1b4332]" />
          </div>
          <div>
            <p className="font-strong text-sm uppercase tracking-wider">Đổi thưởng thành công!</p>
            <p className="text-[10px] font-bold opacity-80 uppercase tracking-tighter">Bạn đã đổi thành công: {redeemSuccess}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
