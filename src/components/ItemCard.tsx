import { CalendarClock, WalletCards } from 'lucide-react';
import { Item } from '../types';

export function ItemCard({
  item,
  onSuggestPrice
}: {
  item: Item;
  onSuggestPrice: (item: Item) => void;
}) {
  return (
    <article className="item-card">
      <div className="item-image">{item.emoji}</div>

      <div className="item-body">
        <div className="item-topline">
          <h3>{item.name}</h3>
          <span className="badge">{item.category}</span>
        </div>

        <div className="meta-line">
          <MapPin size={14} /> {item.distanceKm} km • {item.sellerName}
        </div>

        <div className="meta-line">
          <ShieldCheck size={14} /> {item.condition}
        </div>

        <div className="price-line">
          <div>
            <div className="price-tag">
              {item.rentalPricePerDay.toLocaleString('vi-VN')} <small>VNĐ/ngày</small>
            </div>
          </div>
          <span className="deposit-tag">Cọc {item.depositAmount.toLocaleString('vi-VN')} VNĐ</span>
        </div>

        <div className="item-actions">
          <button className="link-btn primary">Mượn ngay</button>
          <button className="link-btn" onClick={() => onSuggestPrice(item)}>
            AI giá
          </button>
        </div>
      </div>
    </article>
  );
}

function MapPin(props: any) {
  return <span {...props}>📍</span>;
}

function ShieldCheck(props: any) {
  return <span {...props}>✅</span>;
}
