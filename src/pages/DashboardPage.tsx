import { useEffect, useState } from 'react';
import { Header } from '../components/Header';

interface DashboardStats {
  totalUsers: number;
  totalItems: number;
  totalTransactions: number;
  totalWalletValue: string;
}

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetch('/api/users/public').then(r => r.json()), fetch('/api/items/public').then(r => r.json())])
      .then(([usersRes, itemsRes]) => {
        setStats({
          totalUsers: usersRes.users.length,
          totalItems: itemsRes.items.length,
          totalTransactions: 2, // Mock
          totalWalletValue: '12.3M VNĐ'
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="page-shell">
      <Header />
      <main className="content-wrap">
        <h1>📊 Dashboard Loopify</h1>

        {loading ? (
          <p>Đang tải thống kê...</p>
        ) : stats ? (
          <div className="stats-grid">
            <div className="stat-card">
              <div style={{ fontSize: '2rem' }}>👥</div>
              <div>
                <p className="stat-label">Người dùng công khai</p>
                <p className="stat-value">{stats.totalUsers}</p>
              </div>
            </div>
            <div className="stat-card">
              <div style={{ fontSize: '2rem' }}>📦</div>
              <div>
                <p className="stat-label">Sản phẩm cho thuê</p>
                <p className="stat-value">{stats.totalItems}</p>
              </div>
            </div>
            <div className="stat-card">
              <div style={{ fontSize: '2rem' }}>💰</div>
              <div>
                <p className="stat-label">Giá trị ví Escrow</p>
                <p className="stat-value">{stats.totalWalletValue}</p>
              </div>
            </div>
            <div className="stat-card">
              <div style={{ fontSize: '2rem' }}>🔄</div>
              <div>
                <p className="stat-label">Giao dịch hoàn tất</p>
                <p className="stat-value">{stats.totalTransactions}</p>
              </div>
            </div>
          </div>
        ) : null}

        <div style={{ marginTop: '40px' }}>
          <h2>🔗 API Công khai</h2>
          <ul style={{ color: '#475569' }}>
            <li>
              <strong>GET /api/users/public</strong> — Danh sách người dùng công khai
            </li>
            <li>
              <strong>GET /api/users/public/:userId</strong> — Chi tiết hồ sơ người dùng
            </li>
            <li>
              <strong>GET /api/items/public</strong> — Danh sách sản phẩm công khai
            </li>
            <li>
              <strong>POST /api/ai/pricing</strong> — AI gợi ý giá
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
