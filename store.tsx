
import React, { useState, useMemo } from 'react';
import { UserRole, FarmProduct } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import { ShoppingCart, Tag, Star, Filter, ArrowUpDown, ChevronDown } from 'lucide-react';

interface StoreProps {
  role: UserRole;
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating';

const Store: React.FC<StoreProps> = ({ role }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  
  const isInvestor = role === UserRole.INVESTOR;
  const discount = isInvestor ? 0.25 : 0;

  const categories = useMemo(() => {
    const cats = new Set(MOCK_PRODUCTS.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    // Lọc theo danh mục
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sắp xếp
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.price * (1 - discount)) - (b.price * (1 - discount)));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.price * (1 - discount)) - (a.price * (1 - discount)));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Mặc định giữ nguyên thứ tự
        break;
    }

    return result;
  }, [selectedCategory, sortBy, discount]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-gradient-coastal p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-strong">Oasis Farm Store</h2>
          <p className="text-white/70 mt-2 italic">Sản phẩm sạch từ đất mẹ Oasis, minh bạch nguồn gốc.</p>
        </div>
        {isInvestor && (
          <div className="relative z-10 bg-[#e9c46a] text-[#1b4332] px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg animate-bounce">
            <Tag className="w-5 h-5" />
            Ưu đãi Oasis Investor: -25%
          </div>
        )}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
      </div>

      {/* Controls: Filtering & Sorting */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          <div className="flex items-center gap-2 text-slate-400 mr-2">
            <Filter className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Lọc:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-xl text-xs font-strong whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-[#1b4332] text-white shadow-md' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {cat === 'All' ? 'Tất cả' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 text-slate-400">
            <ArrowUpDown className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Sắp xếp:</span>
          </div>
          <div className="relative flex-1 md:flex-none">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none w-full bg-slate-50 border border-slate-100 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#005f73]/10 cursor-pointer"
            >
              <option value="default">Mặc định</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="rating">Đánh giá cao nhất</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((product) => {
            const finalPrice = product.price * (1 - discount);
            return (
              <div key={product.id} className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-strong text-[#1b4332] shadow-lg uppercase tracking-wider">
                    {product.category}
                  </div>
                  {product.stock < 20 && (
                    <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase shadow-lg animate-pulse">
                      Chỉ còn {product.stock} sản phẩm
                    </div>
                  )}
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className="text-xl font-strong text-slate-800 mb-3 group-hover:text-[#005f73] transition-colors leading-tight">{product.name}</h4>
                  <div className="flex items-center gap-3 mb-6">
                     <div className="flex text-[#e9c46a]">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`} 
                        />
                      ))}
                     </div>
                     <span className="text-xs font-black text-[#005f73] bg-[#005f73]/5 px-2 py-0.5 rounded-md">{product.rating}</span>
                     <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">({(Math.floor(Math.random() * 50) + 10)} Đánh giá)</span>
                  </div>
                  
                  <div className="mt-auto space-y-6">
                    <div className="flex items-end gap-3">
                      <div className="flex flex-col">
                        {isInvestor && (
                          <span className="text-xs text-slate-400 line-through font-bold mb-1">
                            {product.price.toLocaleString('vi-VN')} đ
                          </span>
                        )}
                        <span className={`text-2xl font-strong ${isInvestor ? 'text-[#005f73]' : 'text-[#1b4332]'}`}>
                          {finalPrice.toLocaleString('vi-VN')} <span className="text-xs font-normal">đ</span>
                        </span>
                      </div>
                      {isInvestor && (
                        <span className="mb-1 text-[10px] font-black bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded uppercase">Tiết kiệm 25%</span>
                      )}
                    </div>
                    
                    <button className="w-full py-4 rounded-2xl font-strong text-xs tracking-widest transition-all bg-[#1b4332] text-white hover:bg-[#005f73] hover:shadow-xl active:scale-95 flex items-center justify-center gap-3 group/btn">
                      <ShoppingCart className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                      THÊM VÀO GIỎ HÀNG
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <Filter className="w-10 h-10" />
            </div>
            <p className="text-slate-500 font-strong text-lg tracking-widest uppercase">Không tìm thấy sản phẩm phù hợp</p>
            <button 
              onClick={() => {setSelectedCategory('All'); setSortBy('default');}}
              className="text-[#005f73] font-bold text-sm underline underline-offset-4"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;
