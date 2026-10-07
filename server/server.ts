import express from 'express';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';
import { getPricingSuggestion } from './services/aiService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '25mb' }));

const items = [
  {
    id: 1,
    name: 'Máy tính Casio FX-580VN',
    category: 'Học tập',
    originalPrice: 1800000,
    condition: 'Cực tốt',
    image: '📐'
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

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    message: 'Loopify backend is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/items', (_req, res) => {
  res.json({ items });
});

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
    });

    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
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
