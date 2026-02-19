
import { FarmAsset, Transaction, FarmProduct, ResortOption, DailyFarmLog, TravelDestination, PrepaidCard, FarmHub, MembershipTier, TierInfo, RedeemableItem } from './types';

export const COLORS = {
  nature: '#1b4332',
  ocean: '#005f73',
  sand: '#e9c46a',
  white: '#f8fafc',
};

export const TIER_DEFINITIONS: Record<MembershipTier, TierInfo> = {
  [MembershipTier.SILVER]: {
    tier: MembershipTier.SILVER,
    label: 'Hội viên Bạc',
    minPoints: 0,
    discount: 0.05,
    perks: ['Tích điểm 1% hóa đơn', 'Giảm 5% dịch vụ ăn uống', 'Ưu đãi quà tặng sinh nhật'],
    color: 'from-slate-400 to-slate-500'
  },
  [MembershipTier.GOLD]: {
    tier: MembershipTier.GOLD,
    label: 'Hội viên Vàng',
    minPoints: 10000,
    discount: 0.15,
    perks: ['Tích điểm 3% hóa đơn', 'Giảm 15% đặt phòng Resort', 'Miễn phí check-in sớm', 'Ưu tiên đặt tour sầu riêng'],
    color: 'from-amber-400 to-amber-600'
  },
  [MembershipTier.DIAMOND]: {
    tier: MembershipTier.DIAMOND,
    label: 'Hội viên Kim cương',
    minPoints: 50000,
    discount: 0.25,
    perks: ['Tích điểm 5% hóa đơn', 'Giảm 25% toàn hệ sinh thái', 'Xe đưa đón VIP tận nơi', 'Quản gia riêng tại Resort', 'Quyền mua cổ phần ưu đãi'],
    color: 'from-cyan-400 to-blue-600'
  }
};

export const MOCK_REDEEMABLES: RedeemableItem[] = [
  {
    id: 'r1',
    name: 'Thùng Dưa Lưới Oasis Premium',
    points: 1500,
    type: 'PRODUCT',
    imageUrl: 'https://images.unsplash.com/photo-1571767454098-246b94fbcf70?auto=format&fit=crop&q=80&w=400',
    description: 'Thùng 3 quả dưa lưới TL3 tuyển chọn từ farm Ninh Thuận.'
  },
  {
    id: 'r2',
    name: 'Sầu Riêng Musang King (2kg)',
    points: 2500,
    type: 'PRODUCT',
    imageUrl: 'https://images.unsplash.com/photo-1621255562768-d36484e0c476?auto=format&fit=crop&q=80&w=400',
    description: 'Thưởng thức sầu riêng vua từ vùng đất Da Teh.'
  },
  {
    id: 'r3',
    name: 'Tiệc Tối Lãng Mạn Tại Vườn',
    points: 4500,
    type: 'SERVICE',
    imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400',
    description: 'Set menu đặc sản địa phương phục vụ tại khu vực Glamping.'
  },
  {
    id: 'r4',
    name: 'Đêm Nghỉ Glamping Cao Cấp',
    points: 8000,
    type: 'STAY',
    imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800',
    description: '01 đêm nghỉ dưỡng hòa mình cùng thiên nhiên tại Oasis Farmstay.'
  },
  {
    id: 'r5',
    name: 'Tour Khám Phá Farm & Hái Quả',
    points: 1000,
    type: 'SERVICE',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    description: 'Trải nghiệm thực tế quy trình trồng trọt và tự tay hái nông sản.'
  }
];

export const MOCK_HUBS: FarmHub[] = [
  {
    id: 'hub1',
    name: 'Oasis Coastal Ninh Thuận',
    location: 'NINH_THUAN',
    address: 'Thôn Sơn Hải, xã Phước Dinh, huyện Thuận Nam, Ninh Thuận',
    description: 'Tâm điểm nghỉ dưỡng ven biển kết hợp nuôi dông và dưa lưới công nghệ cao.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    stats: { assets: 12, investors: 450 }
  },
  {
    id: 'hub2',
    name: 'Oasis Highlands Da Teh',
    location: 'DA_TEH',
    address: 'Xã Đạ Kho, huyện Đạ Tẻh, tỉnh Lâm Đồng',
    description: 'Thủ phủ sầu riêng Musang King và vùng nguyên liệu trái cây đặc sản cao nguyên.',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    stats: { assets: 8, investors: 320 }
  },
  {
    id: 'hub3',
    name: 'Oasis Sun Tây Ninh',
    location: 'TAY_NINH',
    address: 'Xã Thạnh Tân, Thành phố Tây Ninh, tỉnh Tây Ninh',
    description: 'Tổ hợp chăn nuôi bò Wagyu thảo mộc và chế biến thực phẩm sạch thượng hạng.',
    imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    stats: { assets: 5, investors: 180 }
  }
];

export const MOCK_PREPAID_CARDS: PrepaidCard[] = [
  { id: 'c1', tier: 'BRONZE', price: 5000000, value: 5500000, benefits: ['Nâng hạng SILVER ngay', 'Tặng 1 đêm Glamping'] },
  { id: 'c2', tier: 'SILVER', price: 10000000, value: 11500000, benefits: ['Nâng hạng GOLD ngay', 'Tặng 2 đêm Glamping', 'Ưu tiên đặt phòng'] },
  { id: 'c3', tier: 'GOLD', price: 50000000, value: 60000000, benefits: ['Nâng hạng DIAMOND ngay', 'Tặng 3 đêm Villa', 'Quà tặng nông sản mùa vụ'] },
  { id: 'c4', tier: 'PLATINUM', price: 100000000, value: 125000000, benefits: ['Duy trì DIAMOND 2 năm', 'Nghỉ dưỡng không giới hạn', 'Xe đưa đón VIP'] },
];

export const MOCK_ASSETS: FarmAsset[] = [
  {
    id: 'a1',
    type: 'MELON',
    name: 'Dưa Lưới Oasis TL3 - Khu A1',
    location: 'NINH_THUAN',
    investedAmount: 10000000,
    currentValue: 10800000,
    growthRate: 12,
    startDate: '2024-02-01',
    expectedHarvest: '2024-04-15',
    tokenSymbol: 'OASIS-MELON-A1',
    sharesOwned: 15.5,
    benefits: [
      { title: 'Chia sẻ mùa vụ', description: 'Nhận 10% sản lượng dưa thu hoạch tại phân khu.', type: 'HARVEST' },
      { title: 'Nghỉ dưỡng', description: '01 đêm nghỉ miễn phí tại Glamping khu A1.', type: 'STAY' }
    ],
    progress: [
      { date: '2024-03-01', weight: 800, status: 'Bắt đầu tạo lưới', photoUrl: 'https://images.unsplash.com/photo-1571767454098-246b94fbcf70?auto=format&fit=crop&q=80&w=400', blockchainHash: '0xabc...123' },
      { date: '2024-03-15', weight: 1200, status: 'Phát triển ổn định', photoUrl: 'https://images.unsplash.com/photo-1596326166005-78e7c5c06637?auto=format&fit=crop&q=80&w=400', blockchainHash: '0xdef...456' },
    ]
  },
  {
    id: 'a3',
    type: 'DURIAN',
    name: 'Sầu Riêng Musang King - Oasis Da Teh',
    location: 'DA_TEH',
    investedAmount: 50000000,
    currentValue: 55000000,
    growthRate: 8.5,
    startDate: '2023-11-15',
    expectedHarvest: '2024-12-01',
    tokenSymbol: 'OASIS-DA-TEH-D1',
    sharesOwned: 5,
    benefits: [
      { title: 'Lợi nhuận cao', description: 'Cam kết mua lại sầu riêng với giá xuất khẩu.', type: 'VIP' },
      { title: 'Trải nghiệm Farm', description: '02 ngày 01 đêm trải nghiệm hái sầu riêng tại vườn.', type: 'STAY' }
    ],
    progress: [
      { date: '2024-01-10', status: 'Cắt tỉa cành vụ mới', photoUrl: 'https://images.unsplash.com/photo-1621255562768-d36484e0c476?auto=format&fit=crop&q=80&w=400', blockchainHash: '0xghi...789' },
    ]
  },
  {
    id: 'a4',
    type: 'COW',
    name: 'Bò Wagyu Thảo Mộc - Oasis Tây Ninh',
    location: 'TAY_NINH',
    investedAmount: 25000000,
    currentValue: 27500000,
    growthRate: 10,
    startDate: '2024-01-01',
    expectedHarvest: '2025-01-01',
    tokenSymbol: 'OASIS-TN-WAGYU',
    sharesOwned: 2.5,
    benefits: [
      { title: 'Quà tặng thượng hạng', description: '02kg thịt bò Wagyu chuẩn xuất khẩu mỗi quý.', type: 'HARVEST' },
      { title: 'VIP Lounge', description: 'Sử dụng khu vực VIP tại Resort Tây Ninh.', type: 'VIP' }
    ],
    progress: [
      { date: '2024-02-15', status: 'Tiêm chủng định kỳ', photoUrl: 'https://images.unsplash.com/photo-1543336496-e248b1d9c9e5?auto=format&fit=crop&q=80&w=400', blockchainHash: '0xjkl...012' },
    ]
  }
];

export const MOCK_DAILY_LOGS: DailyFarmLog[] = [
  {
    id: 'log1',
    date: '2024-03-20',
    temperature: 28,
    humidity: 65,
    news: 'Thời tiết tại Oasis Farmstay nắng ráo, lý tưởng cho quá trình tạo ngọt của dưa lưới.',
    harvestData: [
      { item: 'Dưa lưới Oasis TL3', amount: '120', unit: 'kg' },
      { item: 'Trứng gà Oasis sạch', amount: '450', unit: 'quả' }
    ],
    activity: 'Bón phân hữu cơ đợt 3 cho khu vực sầu riêng Musang King tại Oasis Farm.'
  }
];

export const MOCK_PRODUCTS: FarmProduct[] = [
  { id: 'p1', name: 'Dông Cát Oasis Hút Chân Không', price: 450000, category: 'Thực phẩm', imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400', stock: 50, rating: 4.8 },
  { id: 'p2', name: 'Sầu Riêng Oasis Musang King', price: 680000, category: 'Trái cây', imageUrl: 'https://images.unsplash.com/photo-1621255562768-d36484e0c476?auto=format&fit=crop&q=80&w=400', stock: 20, rating: 5.0 },
];

export const MOCK_RESORTS: ResortOption[] = [
  { id: 'r1', name: 'Oasis Villa Hướng Biển', description: 'Biệt thự sinh thái tại Ninh Thuận.', pricePerNight: 2500000, imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800', amenities: ['Wifi', 'Hồ bơi'] },
];

export const MOCK_DESTINATIONS: TravelDestination[] = [
  { id: 'd1', name: 'Hải Đăng Mũi Dinh', category: 'ATTRACTION', description: 'Điểm tham quan hoang sơ.', imageUrl: 'https://images.unsplash.com/photo-1500049222539-6cb8838d752c?auto=format&fit=crop&q=80&w=800', location: 'Ninh Thuận', rating: 4.8, commissionRate: 0 },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'INVEST', amount: 5000000, date: '2024-02-15', description: 'Đầu tư Sầu Riêng Da Teh', status: 'COMPLETED' },
];
