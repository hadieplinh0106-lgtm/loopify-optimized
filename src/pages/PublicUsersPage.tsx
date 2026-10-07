import { useEffect, useState } from 'react';
import { Star, MapPin, Package } from 'lucide-react';
import { Header } from '../components/Header';

interface PublicUser {
  id: number;
  name: string;
  trustScore: number;
  itemsListed: number;
  createdAt: string;
}

export function PublicUsersPage() {
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/users/public')
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-shell">
      <Header />

      <main className="content-wrap">
        <section className="hero-section" style={{ gridTemplateColumns: '1fr' }}>
          <div className="hero-copy">
            <span className="eyebrow">
              <MapPin size={14} />
              Cộng đồng Loopify
            </span>
            <h1>Các chủ đồ & người mượn uy tín</h1>
            <p>
              Xem hồ sơ công khai của những thành viên tích cực trong cộng đồng Loopify. Mỗi người dùng đều được xác thực và có điểm
              uy tín dựa trên lịch sử giao dịch.
            </p>
          </div>
        </section>

        <section className="market-section">
          <div className="section-header">
            <div>
              <span className="eyebrow small">Công khai</span>
              <h2>Danh sách người dùng ({users.length})</h2>
            </div>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Đang tải...</p>
            </div>
          )}

          {error && (
            <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '12px', padding: '16px' }}>
              <p style={{ color: '#991b1b', margin: 0 }}>❌ Lỗi: {error}</p>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '18px' }}>
            {users.map(user => (
              <article key={user.id} className="item-card" style={{ cursor: 'pointer' }} onClick={() => navigateToUser(user.id)}>
                <div className="item-image" style={{ fontSize: '2.5rem' }}>👤</div>

                <div className="item-body">
                  <h3>{user.name}</h3>

                  <div className="meta-line">
                    <Star size={14} color="#fbbf24" />
                    {user.trustScore.toFixed(1)} / 5.0 điểm uy tín
                  </div>

                  <div className="meta-line">
                    <Package size={14} />
                    {user.itemsListed} sản phẩm đang cho thuê
                  </div>

                  <div className="meta-line" style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '10px' }}>
                    Tham gia: {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                  </div>

                  <button
                    style={{
                      marginTop: '14px',
                      width: '100%',
                      padding: '10px',
                      background: 'linear-gradient(135deg, #0f766e, #2563eb)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                    onClick={() => navigateToUser(user.id)}
                  >
                    Xem hồ sơ →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function navigateToUser(userId: number) {
  window.location.href = `/user/${userId}`;
}
