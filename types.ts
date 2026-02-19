
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  INVESTOR = 'INVESTOR',
  ADMIN = 'ADMIN'
}

export enum MembershipTier {
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  DIAMOND = 'DIAMOND'
}

export interface GrowthProgress {
  date: string;
  weight?: number;
  height?: number;
  status: string;
  photoUrl: string;
  blockchainHash: string;
}

export interface DailyFarmLog {
  id: string;
  date: string;
  temperature: number;
  humidity: number;
  news: string;
  harvestData: {
    item: string;
    amount: string;
    unit: string;
  }[];
  activity: string;
}

export interface FarmBenefit {
  title: string;
  description: string;
  type: 'STAY' | 'HARVEST' | 'DISCOUNT' | 'VIP';
}

export interface FarmAsset {
  id: string;
  type: 'DONG' | 'CHICKEN' | 'FRUIT_TREE' | 'MELON' | 'DURIAN' | 'COW';
  name: string;
  location: 'NINH_THUAN' | 'DA_TEH' | 'TAY_NINH';
  investedAmount: number;
  currentValue: number;
  growthRate: number;
  startDate: string;
  expectedHarvest: string;
  progress: GrowthProgress[];
  tokenSymbol: string;
  sharesOwned: number; // Lượng cổ phần sở hữu (%)
  benefits: FarmBenefit[]; // Quyền lợi đi kèm
}

export interface FarmHub {
  id: string;
  name: string;
  location: 'NINH_THUAN' | 'DA_TEH' | 'TAY_NINH';
  address: string;
  description: string;
  imageUrl: string;
  stats: {
    assets: number;
    investors: number;
  };
}

export interface FarmProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  rating: number;
}

export interface RedeemableItem {
  id: string;
  name: string;
  points: number;
  type: 'PRODUCT' | 'SERVICE' | 'STAY';
  imageUrl: string;
  description: string;
}

export interface PrepaidCard {
  id: string;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  price: number;
  value: number;
  benefits: string[];
}

export interface ResortOption {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  imageUrl: string;
  amenities: string[];
}

export interface TravelDestination {
  id: string;
  name: string;
  category: 'ATTRACTION' | 'FOOD' | 'TOUR' | 'TRANSPORT';
  description: string;
  imageUrl: string;
  location: string;
  priceInfo?: string;
  rating: number;
  commissionRate: number;
}

export interface TierInfo {
  tier: MembershipTier;
  label: string;
  minPoints: number;
  discount: number;
  perks: string[];
  color: string;
}

export interface WalletInfo {
  totalBalance: number;
  rewardPoints: number;
  internalTokens: number;
  pendingTax: number;
  history: Transaction[];
  prepaidCard?: PrepaidCard;
  membershipTier: MembershipTier;
  pointsToNextTier: number;
}

export interface Transaction {
  id: string;
  type: 'INVEST' | 'REWARD' | 'TRADE' | 'TAX_WITHHOLD' | 'PURCHASE' | 'BOOKING' | 'TOPUP';
  amount: number;
  date: string;
  description: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}
