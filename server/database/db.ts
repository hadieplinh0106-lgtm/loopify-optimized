// ===== In-memory Database =====
// Trong production, bạn sẽ dùng SQLite, PostgreSQL, MongoDB...

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: 'borrower' | 'seller' | 'admin';
  walletBalance: number;
  trustScore: number;
  createdAt: string;
  isPublic: boolean;
}

interface Item {
  id: number;
  ownerId: number;
  name: string;
  category: string;
  originalPrice: number;
  rentalPrice: number;
  depositAmount: number;
  createdAt: string;
}

interface Transaction {
  id: number;
  borrowerId: number;
  sellerId: number;
  itemId: number;
  status: 'pending' | 'active' | 'completed' | 'disputed';
  createdAt: string;
}

class Database {
  users: User[] = [];
  items: Item[] = [];
  transactions: Transaction[] = [];

  constructor() {
    this.seed();
  }

  seed() {
    // Người dùng mẫu công khai
    this.users = [
      {
        id: 1,
        email: 'lan.anh@hnue.edu.vn',
        name: 'Lan Anh',
        phone: '0358667230',
        role: 'seller',
        walletBalance: 1500000,
        trustScore: 4.9,
        createdAt: '2024-10-01T08:00:00Z',
        isPublic: true
      },
      {
        id: 2,
        email: 'quang.hoang@hnue.edu.vn',
        name: 'Quang Hoàng',
        phone: '0389303172',
        role: 'seller',
        walletBalance: 3200000,
        trustScore: 4.8,
        createdAt: '2024-09-15T10:30:00Z',
        isPublic: true
      },
      {
        id: 3,
        email: 'my.linh@hnue.edu.vn',
        name: 'Mỹ Linh',
        phone: '0918002456',
        role: 'borrower',
        walletBalance: 800000,
        trustScore: 4.7,
        createdAt: '2024-10-05T14:00:00Z',
        isPublic: true
      },
      {
        id: 4,
        email: 'private.user@hnue.edu.vn',
        name: 'Người dùng riêng tư',
        phone: '0968193013',
        role: 'borrower',
        walletBalance: 500000,
        trustScore: 4.5,
        createdAt: '2024-09-20T09:00:00Z',
        isPublic: false
      }
    ];

    // Items mẫu
    this.items = [
      {
        id: 101,
        ownerId: 1,
        name: 'Máy tính Casio FX-580VN',
        category: 'Học tập',
        originalPrice: 1800000,
        rentalPrice: 32000,
        depositAmount: 700000,
        createdAt: '2024-10-01T08:15:00Z'
      },
      {
        id: 102,
        ownerId: 2,
        name: 'Laptop Dell Inspiron 15',
        category: 'Điện tử',
        originalPrice: 18500000,
        rentalPrice: 260000,
        depositAmount: 6200000,
        createdAt: '2024-09-16T11:00:00Z'
      },
      {
        id: 103,
        ownerId: 1,
        name: 'Lều cắm trại mini',
        category: 'Thể thao',
        originalPrice: 2600000,
        rentalPrice: 120000,
        depositAmount: 950000,
        createdAt: '2024-10-03T15:30:00Z'
      },
      {
        id: 104,
        ownerId: 3,
        name: 'Tai nghe Sony WH-CH520',
        category: 'Phụ kiện',
        originalPrice: 2100000,
        rentalPrice: 60000,
        depositAmount: 850000,
        createdAt: '2024-10-05T14:20:00Z'
      }
    ];

    // Transactions mẫu
    this.transactions = [
      {
        id: 1001,
        borrowerId: 3,
        sellerId: 1,
        itemId: 101,
        status: 'completed',
        createdAt: '2024-10-06T09:00:00Z'
      },
      {
        id: 1002,
        borrowerId: 4,
        sellerId: 2,
        itemId: 102,
        status: 'active',
        createdAt: '2024-10-06T13:30:00Z'
      }
    ];
  }
}

let dbInstance: Database | null = null;

export async function initializeDatabase() {
  if (!dbInstance) {
    dbInstance = new Database();
    console.log('✅ Database initialized (In-memory)');
  }
  return dbInstance;
}

export function getDatabase() {
  if (!dbInstance) {
    dbInstance = new Database();
  }
  return dbInstance;
}
