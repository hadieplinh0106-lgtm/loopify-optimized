import { MapPin, ShieldCheck, TrendingUp } from 'lucide-react';

export function Header() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <div className="brand-mark">L</div>
          <span>Loopify</span>
        </div>

        <nav className="nav-menu">
          <a href="#">Trang chủ</a>
          <a href="#">Cho mượn</a>
          <a href="#">Chủ đồ</a>
          <a href="#">Ví</a>
          <a href="#">Hỗ trợ</a>
        </nav>

        <div className="user-actions">
          <button className="secondary-btn">Đăng nhập</button>
          <button className="primary-btn">Tạo tài khoản</button>
        </div>
      </div>
    </header>
  );
}
