
import React from 'react';
import { Users, FileCheck, AlertCircle, TrendingUp, Settings } from 'lucide-react';

const AdminPanel: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <h2 className="text-3xl font-luxury font-bold text-[#1e3c1a]">Trung Tâm Quản Trị Hệ Thống</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <Users className="w-5 h-5 text-blue-500" />
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Tổng nhà đầu tư</p>
          <p className="text-2xl font-bold">1,240</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <FileCheck className="w-5 h-5 text-green-500" />
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Lô nuôi mới</p>
          <p className="text-2xl font-bold">18</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Chờ xác minh BC</p>
          <p className="text-2xl font-bold">42</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <TrendingUp className="w-5 h-5 text-[#c5a059]" />
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Doanh thu quý</p>
          <p className="text-2xl font-bold">12.5 tỷ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold">Yêu cầu xác thực tăng trưởng</h3>
            <button className="text-xs text-[#c5a059] font-bold">Tất cả</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
                  <div>
                    <p className="text-sm font-bold">Gà Thả Vườn - Lô 10{i}</p>
                    <p className="text-[10px] text-gray-400">Trọng lượng tăng +150g</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-green-500 text-white p-2 rounded-lg"><FileCheck className="w-4 h-4" /></button>
                  <button className="bg-white text-gray-400 p-2 rounded-lg border border-gray-200"><Settings className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1e3c1a] rounded-[2rem] p-8 text-white">
          <h3 className="font-bold mb-6 text-xl">Quản lý Thuế & Token</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <span className="text-white/60 text-sm">Thuế TNCN đã thu giữ</span>
              <span className="font-bold text-[#c5a059]">845,000,000 đ</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <span className="text-white/60 text-sm">Token đang lưu thông</span>
              <span className="font-bold text-[#c5a059]">12,500,000 ECOT</span>
            </div>
            <button className="w-full bg-white/10 py-4 rounded-xl font-bold hover:bg-white/20 transition-all">Xuất báo cáo tài chính Smart Contract</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
