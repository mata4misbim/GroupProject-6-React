export const ORDERS = [
  {
    order_id: "ord-001",
    user_id: "u3", // ใครเป็นคนซื้อ (ในที่นี้คือ มาลี malee_fan)
    items: [
      {
        product_id: "p1",
        product_type: "single",
        title_snapshot: "Crimson Dawn (Single)",
        unit_price: 30,
        quantity: 1,
        fulfillment_status: "digital_delivered",
        delivered_at: "2026-05-09T07:00:00Z"
      },
      {
        product_id: "p3",
        product_type: "merch",
        variant_id: "v1", // เลือกไซส์ M
        title_snapshot: "Exquisite Cadaver Shirt",
        unit_price: 980,
        quantity: 1,
        fulfillment_status: "pending" // เสื้อต้องรอส่ง
      }
    ],
    subtotal: 1260,
    shipping_cost: 100,
    platform_fee: 189,
    total: 1360,
    status: "paid",
    shipping_address: {
      recipient_name: "มาลี ใจดี",
      line1: "456 ถนนพหลโยธิน",
      city: "กรุงเทพ",
      postal_code: "10400",
      country: "TH"
    },
    created_at: "2026-05-09T07:00:00Z"
  }
];