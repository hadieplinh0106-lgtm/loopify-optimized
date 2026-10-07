import { CircleDollarSign, ShieldCheck, Zap } from 'lucide-react';

export function QuickActions() {
  return (
    <section className="quick-actions">
      <div className="action-box">
        <div className="icon-wrap">
          <Zap size={20} />
        </div>
        <h3>Cho thuê nhanh</h3>
        <p>Đăng tin và nhận lời mượn trong vài phút nhờ AI gợi ý giá phù hợp.</p>
      </div>

      <div className="action-box">
        <div className="icon-wrap">
          <ShieldCheck size={20} />
        </div>
        <h3>Escrow an toàn</h3>
        <p>Tiền cọc được giữ an toàn, chỉ giải ngân khi quá trình hoàn tất.</p>
      </div>

      <div className="action-box">
        <div className="icon-wrap">
          <CircleDollarSign size={20} />
        </div>
        <h3>Thu nhập ổn định</h3>
        <p>Chủ đồ có thể cho thuê sản phẩm dư thừa và tạo thu nhập linh hoạt.</p>
      </div>
    </section>
  );
}
