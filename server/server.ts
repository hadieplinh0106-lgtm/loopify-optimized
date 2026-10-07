import express from 'express';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';
import { getPricingSuggestion } from './services/aiService.js';
import { initializeDatabase, getDatabase } from './database/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '25mb' }));

// ===== Database =====
await initializeDatabase();
const db = getDatabase();

const mockItems = [
  {
    id: 1,
    name: 'Máy tính Casio FX-580VN',
    category: 'Học tập',
    originalPrice: 1800000,
    condition: 'Cực tốt',
    image: '📖'
  },
  {
    id: 2,
    name: 'Laptop Dell Inspiron 15',
    category: 'Điện tử',
    originalPrice: 18500000,
    condition: 'Tốt',
    image: '💻'
  },
  {
    id: 3,
    name: 'Lều cắm trại mini',
    category: 'Thể thao',
    originalPrice: 2600000,
    condition: 'Khá mới',
    image: '⛺'
  },
  {
    id: 4,
    name: 'Tai nghe Sony WH-CH520',
    category: 'Phụ kiện',
    originalPrice: 2100000,
    condition: 'Cực tốt',
    image: '🎧'
  }
];

// ===== API Routes =====
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    message: 'Loopify backend is running',
    timestamp: new Date().toISOString(),
    database: 'connected'
  });
});

// Danh sách items
app.get('/api/items', (_req, res) => {
  res.json({ items: mockItems });
});

// AI gợi ý giá
app.post('/api/ai/pricing', (req, res) => {
  const { itemName, category, originalPrice, condition } = req.body;
  const pricing = getPricingSuggestion({
    itemName,
    category,
    originalPrice: Number(originalPrice) || 500000,
    condition: condition || 'Tốt'
  });

  res.json({ success: true, data: pricing });
});

// ===== User Management =====

// 1. Tạo người dùng mới
app.post('/api/users/register', (req, res) => {
  try {
    const { email, name, phone, role } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Email và tên là bắt buộc' });
    }

    const userId = Date.now();
    const user = {
      id: userId,
      email,
      name,
      phone: phone || '',
      role: role || 'borrower',
      walletBalance: 0,
      trustScore: 0,
      createdAt: new Date().toISOString(),
      isPublic: false
    };

    db.users.push(user);

    res.json({
      success: true,
      message: 'Tạo tài khoản thành công',
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Lấy danh sách người dùng công khai (ai cũng xem được)
app.get('/api/users/public', (_req, res) => {
  const publicUsers = db.users
    .filter((user: any) => user.isPublic)
    .map((user: any) => ({
      id: user.id,
      name: user.name,
      trustScore: user.trustScore,
      itemsListed: db.items.filter((item: any) => item.ownerId === user.id).length,
      createdAt: user.createdAt
    }));

  res.json({ users: publicUsers });
});

// 3. Lấy chi tiết người dùng công khai (xem profile)
app.get('/api/users/public/:userId', (req, res) => {
  const user = db.users.find((u: any) => u.id == req.params.userId && u.isPublic);

  if (!user) {
    return res.status(404).json({ error: 'Người dùng không công khai hoặc không tồn tại' });
  }

  const userItems = db.items.filter((item: any) => item.ownerId === user.id);

  res.json({
    id: user.id,
    name: user.name,
    trustScore: user.trustScore,
    role: user.role,
    itemsListed: userItems,
    createdAt: user.createdAt
  });
});

// 4. Cập nhật user làm công khai
app.put('/api/users/:userId/public', (req, res) => {
  const user = db.users.find((u: any) => u.id == req.params.userId);

  if (!user) {
    return res.status(404).json({ error: 'Người dùng không tồn tại' });
  }

  user.isPublic = true;
  res.json({ success: true, message: 'Người dùng bây giờ công khai' });
});

// 5. Thêm item cho người dùng
app.post('/api/items', (req, res) => {
  try {
    const { ownerId, name, category, originalPrice, rentalPrice, depositAmount } = req.body;

    if (!ownerId || !name) {
      return res.status(400).json({ error: 'ownerId và tên là bắt buộc' });
    }

    const itemId = Date.now();
    const item = {
      id: itemId,
      ownerId,
      name,
      category,
      originalPrice: originalPrice || 500000,
      rentalPrice: rentalPrice || 50000,
      depositAmount: depositAmount || 200000,
      createdAt: new Date().toISOString()
    };

    db.items.push(item);

    res.json({ success: true, item });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Lấy tất cả items công khai
app.get('/api/items/public', (_req, res) => {
  const publicItems = db.items.map((item: any) => {
    const owner = db.users.find((u: any) => u.id === item.ownerId && u.isPublic);
    return {
      ...item,
      owner: owner ? { id: owner.id, name: owner.name, trustScore: owner.trustScore } : null
    };
  });

  res.json({ items: publicItems });
});

// ===== Vite + Static Files =====
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, '../dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const ports = [port, 5000, 5173, 8080];
  let index = 0;

  const tryPort = () => {
    const currentPort = ports[index];
    if (!currentPort) {
      console.error('Không có cổng khả dụng');
      return;
    }

    const server = app.listen(currentPort, () => {
      console.log(`✅ Loopify đang chạy tại http://localhost:${currentPort}`);
      console.log(`📊 API: http://localhost:${currentPort}/api/health`);
      console.log(`👥 Xem người dùng công khai: http://localhost:${currentPort}/api/users/public`);
    });

    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`⚠️  Cổng ${currentPort} đã được sử dụng, thử cổng khác...`);
        index += 1;
        tryPort();
        return;
      }

      console.error('Lỗi khởi động server:', error);
    });
  };

  tryPort();
}

startServer();
