// =============================================================================
// MOCK DB — ORDERS COLLECTION
// =============================================================================
// Schema: orders {
//   _id, user_id,
//   items[] (embedded — marketplace logic):
//     { product_id, artist_id, title_snapshot, unit_price, quantity,
//       variant_id, fulfillment_status, tracking_number,
//       shipped_at, delivered_at }
//   subtotal, shipping_cost, platform_fee, total, currency,
//   status, shipping_address (strict),
//   created_at, updated_at
// }
// (product_type ลบออกแล้วตาม mentor feedback — lookup จาก products ได้)
//
// 📊 Marketplace Pattern:
//    - แต่ละ item มี artist_id → artist เห็น order ของตัวเองได้
//    - fulfillment_status แยกต่อ item (digital ส่งทันที / merch รอ artist)
//    - Order Snapshot — title_snapshot + unit_price บันทึก ณ เวลาซื้อ
//    - Platform fee — % หักก่อนเข้า artist payout
// =============================================================================

export const orders = [
  // ═══════════════════════════════════════════════════════════════
  // ORDER 1: Malee — Multi-artist + multi-type (test scenario หลัก)
  // ═══════════════════════════════════════════════════════════════
  // มาลีซื้อ:
  //   1. OWV Single (Crimson Dawn) 30 บาท         → digital
  //   2. OWV Album (Midnight Echoes) 250 บาท      → digital
  //   3. OWV Merch (Cadaver Shirt size M) 980 บาท → physical
  //
  // Subtotal:      1,260
  // Shipping:        100 (fixed rate ตาม mentor)
  // Platform fee:    189 (15% ของ subtotal)
  // Total customer paid: 1,360
  // Artist (OWV) payout: 1,071  (1260 - 189 = 1071)
  {
    _id: "order_001",
    user_id: "user_008", // Malee
    items: [
      {
        product_id: "product_001", // Crimson Dawn (single)
        artist_id: "artist_001", // OWV
        title_snapshot: "Crimson Dawn",
        unit_price: 30,
        quantity: 1,
        variant_id: null, // digital → ไม่มี variant
        fulfillment_status: "digital_delivered",
        tracking_number: null,
        shipped_at: null,
        delivered_at: new Date("2026-05-09T10:00:00"),
      },
      {
        product_id: "product_002", // Midnight Echoes (album)
        artist_id: "artist_001",
        title_snapshot: "Midnight Echoes",
        unit_price: 250,
        quantity: 1,
        variant_id: null,
        fulfillment_status: "digital_delivered",
        tracking_number: null,
        shipped_at: null,
        delivered_at: new Date("2026-05-09T10:00:00"),
      },
      {
        product_id: "product_003", // Cadaver Shirt (merch)
        artist_id: "artist_001",
        title_snapshot: "Exquisite Cadaver Shirt",
        unit_price: 980,
        quantity: 1,
        variant_id: "var_001", // size M black
        fulfillment_status: "shipped",
        tracking_number: "TH1234567890",
        shipped_at: new Date("2026-05-10T09:00:00"),
        delivered_at: null, // ยังไม่ถึงมือลูกค้า
      },
    ],
    subtotal: 1260,
    shipping_cost: 100,
    platform_fee: 189, // 15% of 1260 ≈ 189
    total: 1360,
    currency: "THB",
    status: "partially_shipped", // ⭐ digital ส่งแล้ว, merch กำลังส่ง
    shipping_address: {
      recipient_name: "มาลี ใจดี",
      line1: "456 ถนนพหลโยธิน",
      line2: "เขตจตุจักร",
      city: "กรุงเทพ",
      postal_code: "10400",
      country: "TH",
      phone: "0867891234",
    },
    created_at: new Date("2026-05-09T10:00:00"),
    updated_at: new Date("2026-05-10T09:00:00"),
  },

  // ═══════════════════════════════════════════════════════════════
  // ORDER 2: Somchai — Digital only (Velvet Crows fan)
  // ═══════════════════════════════════════════════════════════════
  // ซื้อ Velvet Crows ทุกอย่างที่เป็น digital
  {
    _id: "order_002",
    user_id: "user_009", // Somchai
    items: [
      {
        product_id: "product_004", // Hollow Bones (single)
        artist_id: "artist_002", // VC
        title_snapshot: "Hollow Bones",
        unit_price: 25,
        quantity: 1,
        variant_id: null,
        fulfillment_status: "digital_delivered",
        tracking_number: null,
        shipped_at: null,
        delivered_at: new Date("2026-05-29T14:30:00"),
      },
      {
        product_id: "product_014", // Dark Romantics (album)
        artist_id: "artist_002",
        title_snapshot: "Dark Romantics",
        unit_price: 150,
        quantity: 1,
        variant_id: null,
        fulfillment_status: "digital_delivered",
        tracking_number: null,
        shipped_at: null,
        delivered_at: new Date("2026-05-29T14:30:00"),
      },
    ],
    subtotal: 175,
    shipping_cost: 0, // digital only → no shipping
    platform_fee: 26, // 15% of 175 ≈ 26
    total: 175,
    currency: "THB",
    status: "completed", // ✅ ทุกอย่างส่งแล้ว
    shipping_address: {
      recipient_name: "สมชาย รักเพลง",
      line1: "(digital order — no shipping needed)",
      city: "-",
      postal_code: "-",
      country: "TH",
    },
    created_at: new Date("2026-05-29T14:30:00"),
    updated_at: new Date("2026-05-29T14:30:00"),
  },

  // ═══════════════════════════════════════════════════════════════
  // ORDER 3: Somchai — name_your_price example (Mira Sol)
  // ═══════════════════════════════════════════════════════════════
  // สมชายซื้อ Cabin Songs ราคา 200 บาท (สูงกว่า min_price 100)
  // → demo feature name_your_price
  {
    _id: "order_003",
    user_id: "user_009",
    items: [
      {
        product_id: "product_032", // Cabin Songs (NYP)
        artist_id: "artist_006", // Mira Sol
        title_snapshot: "Cabin Songs",
        unit_price: 200, // ⭐ user-chosen price (above min 100)
        quantity: 1,
        variant_id: null,
        fulfillment_status: "digital_delivered",
        tracking_number: null,
        shipped_at: null,
        delivered_at: new Date("2026-06-02T11:00:00"),
      },
    ],
    subtotal: 200,
    shipping_cost: 0,
    platform_fee: 30, // 15% of 200
    total: 200,
    currency: "THB",
    status: "completed",
    shipping_address: {
      recipient_name: "สมชาย รักเพลง",
      line1: "(digital order — no shipping needed)",
      city: "-",
      postal_code: "-",
      country: "TH",
    },
    created_at: new Date("2026-06-02T11:00:00"),
    updated_at: new Date("2026-06-02T11:00:00"),
  },
];

/*
═══════════════════════════════════════════════════════════════
SUMMARY: 3 sample orders

📊 Statistics:
  Total revenue (all orders):  1,735 บาท
  Platform fees:                 245 บาท (revenue ของ platform)
  Artist payouts:              1,490 บาท (รวมไป artists)

  Orders by status:
    - partially_shipped: 1 (Malee — merch ยังไม่ถึง)
    - completed:         2 (Somchai × 2)

🎯 Demo features ของ schema:
  ✅ Multi-item order (1 order มีหลาย items)
  ✅ Marketplace (artist_id ใน items, fulfillment แยกต่อ item)
  ✅ Order Snapshot (title_snapshot + unit_price)
  ✅ Platform fee (15% หัก)
  ✅ Partial shipping (digital ส่งทันที, merch รอ)
  ✅ name_your_price (สมชายจ่าย 200 ทั้งที่ min 100)
═══════════════════════════════════════════════════════════════
*/
