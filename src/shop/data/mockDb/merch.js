// =============================================================================
// MOCK DB — MERCH COLLECTION
// =============================================================================
// Schema: merch {
//   _id, product_id, merch_type, weight_grams, ships_internationally,
//   variants[] (embedded — size/color/stock_quantity/sku),
//   created_at
// }
// merch_type enum: tshirt | vinyl | cd | cassette | poster | snapback | tote | other
//   ⭐ เพิ่ม snapback / tote ให้ครอบ merch ทุกชิ้น (เดิมมีถึง poster)
//
// 💡 ทำไม variants ใช้ Embed ไม่ใช่ Reference?
//    - ใช้คู่กันเสมอ (ทุกครั้งที่แสดง merch ต้องโชว์ size/color)
//    - ขนาดเล็ก (ปกติ < 10 variants ต่อ merch)
//    - Atomic stock update — ลด stock ในคำสั่งเดียวได้
//
// 🔒 Atomic Stock Update Pattern:
//    db.merch.updateOne(
//      { product_id, "variants.sku": targetSku, "variants.stock_quantity": { $gte: qty } },
//      { $inc: { "variants.$.stock_quantity": -qty } }
//    )
//    → ป้องกัน race condition ลูกค้า 2 คนซื้อพร้อมกัน
// =============================================================================

export const merch = [
  // ═══════════════════════════════════════════════════════════════
  // OLD WORLD VULTURES — Cadaver Shirt
  // ═══════════════════════════════════════════════════════════════
  {
    _id: "merch_001",
    product_id: "product_003", // Exquisite Cadaver Shirt
    merch_type: "tshirt",
    weight_grams: 220,
    ships_internationally: true,
    variants: [
      {
        variant_id: "var_001",
        size: "M",
        color: "black",
        stock_quantity: 0, // 25 - 1 (มาลีซื้อไป)
        sku: "OWV-SHIRT-M-BLK",
      },
      {
        variant_id: "var_002",
        size: "L",
        color: "black",
        stock_quantity: 18,
        sku: "OWV-SHIRT-L-BLK",
      },
      {
        variant_id: "var_003",
        size: "XL",
        color: "black",
        stock_quantity: 10,
        sku: "OWV-SHIRT-XL-BLK",
      },
    ],
    created_at: new Date("2025-11-01"),
  },

  // ═══════════════════════════════════════════════════════════════
  // VELVET CROWS — 5 merch
  // ═══════════════════════════════════════════════════════════════
  {
    _id: "merch_002",
    product_id: "product_019", // VC Logo Tshirt
    merch_type: "tshirt",
    weight_grams: 220,
    ships_internationally: true,
    variants: [
      {
        variant_id: "var_004",
        size: "M",
        color: "black",
        stock_quantity: 30,
        sku: "VC-TSHIRT-M-BLK",
      },
      {
        variant_id: "var_005",
        size: "L",
        color: "black",
        stock_quantity: 25,
        sku: "VC-TSHIRT-L-BLK",
      },
      {
        variant_id: "var_006",
        size: "XL",
        color: "black",
        stock_quantity: 15,
        sku: "VC-TSHIRT-XL-BLK",
      },
    ],
    created_at: new Date("2025-09-01"),
  },
  {
    _id: "merch_003",
    product_id: "product_020", // Dark Romantics Vinyl
    merch_type: "vinyl",
    weight_grams: 280,
    ships_internationally: true,
    variants: [
      {
        variant_id: "var_007",
        size: "12in",
        color: "black",
        stock_quantity: 50,
        sku: "VC-VINYL-DR-BLK",
      },
      {
        variant_id: "var_008",
        size: "12in",
        color: "red",
        stock_quantity: 20,
        sku: "VC-VINYL-DR-RED",
      },
    ],
    created_at: new Date("2025-10-01"),
  },
  {
    _id: "merch_004",
    product_id: "product_021", // Live at Sunset CD
    merch_type: "cd",
    weight_grams: 100,
    ships_internationally: true,
    variants: [
      {
        // ⭐ CD ไม่มี size/color → field optional ตาม schema
        variant_id: "var_009",
        stock_quantity: 100,
        sku: "VC-CD-LIVE-001",
      },
    ],
    created_at: new Date("2026-04-20"),
  },
  {
    _id: "merch_005",
    product_id: "product_022", // VC Concert Poster
    merch_type: "poster",
    weight_grams: 80,
    ships_internationally: true,
    variants: [
      {
        variant_id: "var_010",
        size: "A3",
        stock_quantity: 40,
        sku: "VC-POSTER-A3",
      },
      {
        variant_id: "var_011",
        size: "A2",
        stock_quantity: 25,
        sku: "VC-POSTER-A2",
      },
    ],
    created_at: new Date("2025-11-15"),
  },
  {
    _id: "merch_006",
    product_id: "product_023", // VC Logo Cassette
    merch_type: "cassette",
    weight_grams: 90,
    ships_internationally: true,
    variants: [
      {
        variant_id: "var_012",
        color: "clear",
        stock_quantity: 30,
        sku: "VC-CASS-CLR",
      },
      {
        variant_id: "var_013",
        color: "black",
        stock_quantity: 20,
        sku: "VC-CASS-BLK",
      },
    ],
    created_at: new Date("2025-09-15"),
  },

  // ═══════════════════════════════════════════════════════════════
  // CRYSTAL MALL — 1 merch
  // ═══════════════════════════════════════════════════════════════
  {
    _id: "merch_007",
    product_id: "product_026", // Mall After Hours Cassette
    merch_type: "cassette",
    weight_grams: 90,
    ships_internationally: true,
    variants: [
      {
        variant_id: "var_014",
        color: "purple",
        stock_quantity: 40,
        sku: "CM-CASS-MAH-PUR",
      },
    ],
    created_at: new Date("2026-01-15"),
  },

  // ═══════════════════════════════════════════════════════════════
  // STATIC ERA — 1 merch
  // ═══════════════════════════════════════════════════════════════
  {
    _id: "merch_008",
    product_id: "product_028", // Static Era Tour Tshirt 2026
    merch_type: "tshirt",
    weight_grams: 220,
    ships_internationally: true,
    variants: [
      {
        variant_id: "var_015",
        size: "S",
        color: "black",
        stock_quantity: 15,
        sku: "SE-TOUR-S-BLK",
      },
      {
        variant_id: "var_016",
        size: "M",
        color: "black",
        stock_quantity: 35,
        sku: "SE-TOUR-M-BLK",
      },
      {
        variant_id: "var_017",
        size: "L",
        color: "black",
        stock_quantity: 30,
        sku: "SE-TOUR-L-BLK",
      },
      {
        variant_id: "var_018",
        size: "XL",
        color: "black",
        stock_quantity: 12,
        sku: "SE-TOUR-XL-BLK",
      },
    ],
    created_at: new Date("2026-02-01"),
  },

  // ═══════════════════════════════════════════════════════════════
  // ⭐ เพิ่มใหม่ — merch ที่เดิมไม่มี entry (ทำให้การ์ดโชว์ป้ายผิด)
  // ═══════════════════════════════════════════════════════════════

  // OLD WORLD VULTURES — Logo Tshirt
  {
    _id: "merch_009",
    product_id: "product_036", // Old World Vultures Logo Tshirt
    merch_type: "tshirt",
    weight_grams: 220,
    ships_internationally: true,
    variants: [
      {
        variant_id: "var_019",
        size: "M",
        color: "black",
        stock_quantity: 28,
        sku: "OWV-LOGO-M-BLK",
      },
      {
        variant_id: "var_020",
        size: "L",
        color: "black",
        stock_quantity: 22,
        sku: "OWV-LOGO-L-BLK",
      },
      {
        variant_id: "var_021",
        size: "XL",
        color: "black",
        stock_quantity: 14,
        sku: "OWV-LOGO-XL-BLK",
      },
    ],
    created_at: new Date("2026-02-01"),
  },

  // CRYSTAL MALL — Logo Tshirt
  {
    _id: "merch_010",
    product_id: "product_041", // Crystal Mall Logo Tshirt
    merch_type: "tshirt",
    weight_grams: 210,
    ships_internationally: true,
    variants: [
      {
        variant_id: "var_022",
        size: "M",
        color: "white",
        stock_quantity: 26,
        sku: "CM-LOGO-M-WHT",
      },
      {
        variant_id: "var_023",
        size: "L",
        color: "white",
        stock_quantity: 20,
        sku: "CM-LOGO-L-WHT",
      },
      {
        variant_id: "var_024",
        size: "XL",
        color: "white",
        stock_quantity: 12,
        sku: "CM-LOGO-XL-WHT",
      },
    ],
    created_at: new Date("2026-03-01"),
  },

  // STATIC ERA — Snapback
  {
    _id: "merch_011",
    product_id: "product_045", // Static Era Snapback
    merch_type: "snapback",
    weight_grams: 130,
    ships_internationally: true,
    variants: [
      {
        // ⭐ Snapback ปรับขนาดได้ → one size (ไม่มี size/color variant)
        variant_id: "var_025",
        color: "black",
        stock_quantity: 45,
        sku: "SE-SNAP-BLK",
      },
    ],
    created_at: new Date("2026-03-01"),
  },

  // BANGKOK PHANTOM — Snapback
  {
    _id: "merch_012",
    product_id: "product_050", // Bangkok Phantom Snapback
    merch_type: "snapback",
    weight_grams: 130,
    ships_internationally: true,
    variants: [
      {
        variant_id: "var_026",
        color: "black/gold",
        stock_quantity: 50, // limited run of 50
        sku: "BP-SNAP-BLKGLD",
      },
    ],
    created_at: new Date("2026-03-10"),
  },

  // MIRA SOL — Canvas Tote Bag
  {
    _id: "merch_013",
    product_id: "product_054", // Mira Sol Canvas Tote Bag
    merch_type: "tote",
    weight_grams: 150,
    ships_internationally: true,
    variants: [
      {
        // ⭐ Tote bag → one size (ไม่มี size/color variant)
        variant_id: "var_027",
        color: "natural",
        stock_quantity: 60,
        sku: "MS-TOTE-NAT",
      },
    ],
    created_at: new Date("2026-05-01"),
  },
];

/*
═══════════════════════════════════════════════════════════════
SUMMARY: 13 merch entries (เดิม 8 + เพิ่มใหม่ 5)

📦 Stock distribution:
  - tshirts:  6 (OWV×2 + VC + SE + CM)  with size variants
  - vinyl:    1 (VC Dark Romantics) with 2 colors
  - cd:       1 (VC Live at Sunset) — no variants
  - cassette: 2 (VC + CM) with color variants
  - poster:   1 (VC Concert) with size variants
  - snapback: 2 (SE + BP) — one size  ⭐ ใหม่
  - tote:     1 (Mira Sol) — one size ⭐ ใหม่

✅ ตอนนี้ merch ครบทั้ง 11 ชิ้นใน products.js — ไม่มีตัวไหนตกป้าย "Merch" อีก

🔒 Stock-managed via atomic update pattern (ดู comment ด้านบนสุด)
═══════════════════════════════════════════════════════════════
*/
