
import React from 'react';
import { UserRole, ResortOption } from '../types';
import { MOCK_RESORTS } from '../constants';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface ResortProps {
  role: UserRole;
}

const Resort: React.FC<ResortProps> = ({ role }) => {
  const isInvestor = role === UserRole.INVESTOR;
  const discount = isInvestor ? 0.25 : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in slide-in-from-bottom-8 duration-700 pb-20 md:pb-0">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-strong text-[#1b4332]">Oasis Farmstay & Resort</h1>
        <p className="text-gray-500 max-w-2xl mx-auto italic">
          Nơi thiên nhiên giao thoa giữa biển trời và nông trại Oasis xanh mát. Trải nghiệm kỳ nghỉ độc bản.
        </p>
      </div>

      <div className="space-y-16">
        {MOCK_RESORTS.map((resort, idx) => {
          const finalPrice = resort.pricePerNight * (1 - discount);
          return (
            <div key={resort.id} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
              <div className="w-full lg:w-3/5 rounded-[3rem] overflow-hidden shadow-2xl">
                <img src={resort.imageUrl} alt={resort.name} className="w-full h-[400px] object-cover" />
              </div>
              <div className="w-full lg:w-2/5 space-y-6">
                <div className="flex items-center gap-2 text-[#005f73] font-bold text-sm uppercase tracking-widest">
                  <MapPin className="w-4 h-4" />
                  Oasis Coast Line - Ninh Thuận
                </div>
                <h2 className="text-3xl font-strong text-[#1b4332]">{resort.name}</h2>
                <p className="text-gray-600 leading-relaxed">{resort.description}</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {resort.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle2 className="w-4 h-4 text-[#e9c46a]" />
                      {amenity}
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Giá mỗi đêm</p>
                  <div className="flex items-end gap-3 mb-6">
                    <span className="text-3xl font-strong text-[#1b4332]">{finalPrice.toLocaleString('vi-VN')} đ</span>
                    {isInvestor && (
                      <span className="text-lg text-gray-400 line-through mb-1">
                        {resort.pricePerNight.toLocaleString('vi-VN')} đ
                      </span>
                    )}
                  </div>
                  <button className="w-full btn-sand py-4 rounded-2xl font-strong shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                    <Calendar className="w-5 h-5" />
                    Đặt phòng Oasis ngay
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Resort;
