export function getPricingSuggestion({
  itemName,
  category,
  originalPrice,
  condition
}: {
  itemName: string;
  category: string;
  originalPrice: number;
  condition: string;
}) {
  const baseRate = originalPrice * 0.05;
  const suggestedRentalPrice = Math.max(15000, Math.min(250000, Math.round(baseRate / 5000) * 5000));
  const suggestedDeposit = Math.round((originalPrice * 0.4) / 10000) * 10000;
  const discountedDepositForVIP = Math.round((suggestedDeposit * 0.7) / 10000) * 10000;

  return {
    suggestedRentalPrice,
    suggestedDeposit,
    discountedDepositForVIP,
    rationale: `Mức giá hợp lý cho ${itemName} thuộc danh mục ${category}. Tình trạng ${condition} phù hợp với chính sách Loopify: giá thuê bằng khoảng 5% giá trị đồ, tiền cọc bằng 40% giá trị ban đầu, ưu đãi cho người dùng uy tín.`
  };
}
