import { useEffect, useState } from 'react';
import { Star, Package, Calendar } from 'lucide-react';
import { Header } from '../components/Header';

interface UserProfile {
  id: number;
  name: string;
  trustScore: number;
  role: string;
  itemsListed: any[];
  createdAt: string;
}

export function UserProfilePage({ userId }: { userId: number }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/users/public/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Không tìm thấy người dùng');
        return res.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <div className="page-shell">
        <Header />
        <main className="content-wrap">
          <p>Đang tải...</p>
        </main>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="page-shell">
        <Header />
        <main className="content-wrap">
          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '12px', padding: '16px' }}>
            <p style={{ color: '#991b1b', margin: 0 }}>❌ {error || 'Không tìm thấy người dùng'}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <Header />

      <main className="content-wrap">
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
            <div
              style={{
                fontSize: '4rem',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #dfeafc, #eefaf5)',
                display: 'grid',
                placeItems: 'center'
              }}
            >
              👤
            </div>
            <div>
              <h1 style={{ margin: '0 0 10px 0' }}>{user.name}</h1>
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  color: '#475569',
                  fontSize: '0.95rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={16} color="#fbbf24" fill="#fbbf24" />
                  <strong>{user.trustScore.toFixed(1)}</strong> điểm uy tín
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Package size={16} />
                  <strong>{user.itemsListed.length}</strong> sản phẩm
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={16} />
                  Tham gia {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                </div>
              </div>
              <p style={{ marginTop: '8px', color: '#64748b', fontSize: '0.9rem' }}>
                Vai trò: <strong>{user.role === 'seller' ? 'Chủ đồ' : 'Người mượn'}</strong>
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Sản phẩm cho thuê ({user.itemsListed.length})</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '18px' }}>
            {user.itemsListed.length > 0 ? (
              user.itemsListed.map((item: any) => (
                <div key={item.id} className="item-card">
                  <div className="item-image" style={{ fontSize: '2.5rem' }}>📦</div>
                  <div className="item-body">
                    <h3>{item.name}</h3>
                    <div className="meta-line">
                      📂 {item.category}
                    </div>
                    <div className="price-line">
                      <div className="price-tag">
                        {item.rentalPrice.toLocaleString('vi-VN')} <small>VNĐ/ngày</small>
                      </div>
                      <span className="deposit-tag">Cọc {item.depositAmount.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: '#94a3b8', gridColumn: '1 / -1' }}>Chưa có sản phẩm nào</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
