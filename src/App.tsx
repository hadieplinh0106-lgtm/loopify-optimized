import { useMemo, useState } from 'react';
import { ArrowRight, BadgeCheck, CircleDollarSign, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { mockItems } from './data/mockData';
import { Item } from './types';
import { Header } from './components/Header';
import { StatCard } from './components/StatCard';
import { ItemCard } from './components/ItemCard';
import { QuickActions } from './components/QuickActions';

const categories = ['Tất cả', 'Học tập', 'Điện tử', 'Thể thao', 'Phụ kiện'];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [items, setItems] = useState<Item[]>(mockItems);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'Tất cả') return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  const totalValue = items.reduce((sum, item) => sum + item.originalPrice, 0);
  const avgPrice = Math.round(totalValue / items.length);

  const handleSuggestPrice = async (item: Item) => {
    const response = await fetch('/api/ai/pricing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemName: item.name,
        category: item.category,
        originalPrice: item.originalPrice,
        condition: item.condition
      })
    });

    const data = await response.json();
    setItems((current) =>
      current.map((currentItem) =>
        currentItem.id === item.id
          ? {
              ...currentItem,
              rentalPricePerDay: data.data.suggestedRentalPrice,
              depositAmount: data.data.suggestedDeposit
            }
          : currentItem
      )
    );
  };

  return (
    <div className="page-shell">
      <Header />

      <main className="content-wrap">
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">
              <Sparkles size={14} />
              Dịch vụ cho mượn đồ ngắn hạn cho sinh viên
            </span>
            <h1>Loopify — cho thuê đồ nhanh, an toàn, cộng đồng.</h1>
            <p>
              Mượn sách, thiết bị, dụng cụ học tập, đồ thể thao và phụ kiện chỉ với vài bước.
              Tất cả đều có ví ký quỹ, xác minh người dùng và đề xuất giá hợp lý.
            </p>

            <div className="hero-actions">
              <button className="primary-btn">
                Khám phá ngay <ArrowRight size={16} />
              </button>
              <button className="secondary-btn">Đăng tin cho mượn</button>
            </div>

            <div className="trust-row">
              <div>
                <BadgeCheck size={16} /> 4.9/5 đánh giá cộng đồng
              </div>
              <div>
                <ShieldCheck size={16} /> Bảo vệ cọc kỹ thuật số
              </div>
            </div>
          </div>

          <div className="hero-panel">
            <div className="mini-card premium">
              <span>Đang cần mượn</span>
              <strong>Máy tính Casio</strong>
              <small>2 người đang chờ xác nhận</small>
            </div>

            <div className="mini-card">
              <span>Ví ký quỹ</span>
              <strong>3.240.000 VNĐ</strong>
              <small>Đủ điều kiện hoàn cọc</small>
            </div>
          </div>
        </section>

        <section className="stats-grid">
          <StatCard icon={<CircleDollarSign size={20} />} label="Tổng giá trị đồ" value={`${totalValue.toLocaleString('vi-VN')} VNĐ`} />
          <StatCard icon={<MapPin size={20} />} label="Khu vực hoạt động" value="Quanh HNUE" />
          <StatCard icon={<ShieldCheck size={20} />} label="Mức bảo vệ" value="Escrow 100%" />
          <StatCard icon={<BadgeCheck size={20} />} label="Giá thuê trung bình" value={`${avgPrice.toLocaleString('vi-VN')} VNĐ/ngày`} />
        </section>

        <QuickActions />

        <section className="market-section">
          <div className="section-header">
            <div>
              <span className="eyebrow small">Marketplace</span>
              <h2>Danh sách đồ cho mượn</h2>
            </div>

            <div className="filter-group">
              {categories.map((category) => (
                <button
                  key={category}
                  className={selectedCategory === category ? 'filter-btn active' : 'filter-btn'}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="item-grid">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} onSuggestPrice={handleSuggestPrice} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
