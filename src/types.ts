export type Category = 'Học tập' | 'Điện tử' | 'Thể thao' | 'Phụ kiện';

export interface Item {
  id: number;
  name: string;
  category: Category;
  condition: 'Tốt' | 'Cực tốt' | 'Khá mới';
  originalPrice: number;
  rentalPricePerDay: number;
  depositAmount: number;
  distanceKm: number;
  sellerName: string;
  emoji: string;
}
