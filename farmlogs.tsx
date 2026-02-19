
import React from 'react';
import { MOCK_DAILY_LOGS } from '../constants';
import { Thermometer, Droplets, Sun, Package, Bell, Info } from 'lucide-react';

const FarmLogs: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700 pb-24 md:pb-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-strong text-[#1b4332]">Nhật Ký Oasis Farmstay</h2>
        <p className="text-slate-500 italic">Cập nhật hàng ngày về Oasis - Nông trại và Nghỉ dưỡng.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-8">
          {MOCK_DAILY_LOGS.map((log) => (
            <div key={log.id} className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-xl hover:shadow-2xl transition-all">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-32 flex flex-col items-center justify-center bg-slate-50 rounded-3xl p-4 border border-slate-100">
                  <span className="text-xs font-black text-[#005f73] uppercase tracking-tighter">Tháng 03</span>
                  <span className="text-4xl font-strong text-[#1b4332]">{log.date.split('-')[2]}</span>
                  <span className="text-[10px] font-bold text-slate-400">2024</span>
                </div>
                
                <div className="flex-1 space-y-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-2xl border border-orange-100">
                      <Thermometer className="w-4 h-4" />
                      <span className="text-sm font-bold">{log.temperature}°C</span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-2xl border border-blue-100">
                      <Droplets className="w-4 h-4" />
                      <span className="text-sm font-bold">{log.humidity}%</span>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl border border-emerald-100">
                      <Sun className="w-4 h-4" />
                      <span className="text-sm font-bold">Oasis Sun</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-strong text-lg text-slate-800 leading-tight">{log.news}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{log.activity}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {log.harvestData.map((item, i) => (
                      <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Package className="w-4 h-4 text-[#e9c46a]" />
                          <span className="text-xs font-bold text-slate-600">{item.item}</span>
                        </div>
                        <span className="text-sm font-strong text-[#1b4332]">{item.amount} {item.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <div className="gradient-coastal rounded-[2.5rem] p-8 text-white shadow-xl">
            <Bell className="w-8 h-8 text-[#e9c46a] mb-4" />
            <h4 className="text-xl font-strong mb-4">Thông báo Oasis</h4>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] font-bold uppercase text-[#e9c46a] mb-1">Dự báo 25/03</p>
                <p className="text-xs">Bắt đầu thu hoạch Oasis Dưa lưới A1. Đạt chuẩn Oasis Premium.</p>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] font-bold uppercase text-white/50 mb-1">Kế hoạch 01/04</p>
                <p className="text-xs">Mở bán đợt token mới cho phân khu Oasis Dông #500.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-5 h-5 text-[#005f73]" />
              <h4 className="font-strong text-sm">Chỉ số Oasis Farm</h4>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Độ pH đất Oasis</span>
                <span className="font-bold">6.5 - 7.2</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Nguồn nước Oasis</span>
                <span className="font-bold text-blue-500">Sạch - Tiêu chuẩn Resort</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmLogs;
