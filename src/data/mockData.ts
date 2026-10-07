import { Item } from '../types';

export const mockItems: Item[] = [
  {
    id: 1,
    name: 'Máy tính Casio FX-580VN',
    category: 'Học tập',
    condition: 'Cực tốt',
    originalPrice: 1800000,
    rentalPricePerDay: 32000,
    depositAmount: 700000,
    distanceKm: 1.4,
    sellerName: 'Lan Anh',
    emoji: '📐'
  },
  {
    id: 2,
    name: 'Laptop Dell Inspiron 15',
    category: 'Điện tử',
    condition: 'Tốt',
    originalPrice: 18500000,
    rentalPricePerDay: 260000,
    depositAmount: 6200000,
    distanceKm: 2.3,
    sellerName: 'Quang',
    emoji: '💻'
  },
  {
    id: 3,
    name: 'Lều cắm trại mini',
    category: 'Thể thao',
    condition: 'Khá mới',
    originalPrice: 2600000,
    rentalPricePerDay: 120000,
    depositAmount: 950000,
    distanceKm: 3.1,
    sellerName: 'Hân',
    emoji: '⛺'
  },
  {
    id: 4,
    name: 'Tai nghe Sony WH-CH520',
    category: 'Phụ kiện',
    condition: 'Cực tốt',
    originalPrice: 2100000,
    rentalPricePerDay: 60000,
    depositAmount: 850000,
    distanceKm: 0.9,
    sellerName: 'Mỹ Linh',
    emoji: '🎧'
  }
];
