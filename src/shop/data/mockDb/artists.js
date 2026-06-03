// =============================================================================
// MOCK DB — ARTISTS COLLECTION
// =============================================================================
// Schema: artists {
//   _id, user_id, slug, name, bio, location, banner_url, genre_ids[],
//   shipping_address (strict), payout_method, payout_balance,
//   created_at, updated_at
// }
// (status ลบออกแล้วตาม mentor feedback — ใช้ users.status เป็น source of truth)
// =============================================================================

export const artists = [
  // ─── 1. Old World Vultures ─────────────────────────────
  {
    _id: "artist_001",
    user_id: "user_002", // ผูกกับ users.owv_band
    slug: "old-world-vultures",
    name: "Old World Vultures",
    bio: "Post-rock instrumental band from Bangkok. We let the guitars speak.",
    location: "Bangkok, Thailand",
    banner_url: "/covers/art4.jpg",
    genre_ids: ["genre_001", "genre_005"], // Rock + Indie
    shipping_address: {
      line1: "123 ซ.ลาดพร้าว 71",
      line2: "แขวงลาดพร้าว",
      city: "กรุงเทพ",
      postal_code: "10230",
      country: "TH",
      phone: "0812345678",
    },
    payout_method: {
      type: "paypal",
      account_info: {
        email: "owv@mail.com",
      },
    },
    payout_balance: 1134,
    created_at: new Date("2025-08-15"),
    updated_at: new Date("2025-08-15"),
  },

  // ─── 2. Velvet Crows ───────────────────────────────────
  {
    _id: "artist_002",
    user_id: "user_003",
    slug: "velvet-crows",
    name: "Velvet Crows",
    bio: "Dreamy indie rock from a rainy night. Music for late-night drives and morning regrets.",
    location: "Chiang Mai, Thailand",
    banner_url: "https://placehold.co/1200x400/1c1c1e/9d6dff?text=Velvet+Crows",
    genre_ids: ["genre_001", "genre_005"], // Rock + Indie
    shipping_address: {
      line1: "88/5 ถ.นิมมานเหมินทร์ ซอย 7",
      line2: "ต.สุเทพ อ.เมือง",
      city: "เชียงใหม่",
      postal_code: "50200",
      country: "TH",
      phone: "0898765432",
    },
    payout_method: {
      type: "paypal",
      account_info: {
        email: "velvetcrows@mail.com",
      },
    },
    payout_balance: 0,
    created_at: new Date("2025-09-01"),
    updated_at: new Date("2025-09-01"),
  },

  // ─── 3. Crystal Mall ───────────────────────────────────
  {
    _id: "artist_003",
    user_id: "user_004",
    slug: "crystal-mall",
    name: "Crystal Mall",
    bio: "Synthwave producer inspired by 80s arcades and neon-lit Bangkok streets at midnight.",
    location: "Bangkok, Thailand",
    banner_url: "https://placehold.co/1200x400/1c1c1e/00d9ff?text=Crystal+Mall",
    genre_ids: ["genre_009", "genre_003"], // Synthwave + Electronic
    shipping_address: {
      line1: "456 ถ.สุขุมวิท ซอย 23",
      line2: "แขวงคลองเตยเหนือ เขตวัฒนา",
      city: "กรุงเทพ",
      postal_code: "10110",
      country: "TH",
      phone: "0823456789",
    },
    payout_method: {
      type: "paypal",
      account_info: {
        email: "crystalmall@mail.com",
      },
    },
    payout_balance: 0,
    created_at: new Date("2025-10-20"),
    updated_at: new Date("2025-10-20"),
  },

  // ─── 4. Static Era ─────────────────────────────────────
  {
    _id: "artist_004",
    user_id: "user_005",
    slug: "static-era",
    name: "Static Era",
    bio: "Indie rock four-piece. Loud guitars, louder feelings.",
    location: "Chiang Mai, Thailand",
    banner_url: "https://placehold.co/1200x400/1c1c1e/ff6b6b?text=Static+Era",
    genre_ids: ["genre_001", "genre_005"], // Rock + Indie
    shipping_address: {
      line1: "77 ถ.ห้วยแก้ว",
      line2: "ต.สุเทพ อ.เมือง",
      city: "เชียงใหม่",
      postal_code: "50200",
      country: "TH",
      phone: "0834567890",
    },
    payout_method: {
      type: "paypal",
      account_info: {
        email: "staticera@mail.com",
      },
    },
    payout_balance: 0,
    created_at: new Date("2025-11-05"),
    updated_at: new Date("2025-11-05"),
  },

  // ─── 5. Bangkok Phantom ────────────────────────────────
  {
    _id: "artist_005",
    user_id: "user_006",
    slug: "bangkok-phantom",
    name: "Bangkok Phantom",
    bio: "Underground hip-hop from BKK. Stories from the streets, beats from the soul.",
    location: "Bangkok, Thailand",
    banner_url: "https://placehold.co/1200x400/1c1c1e/ffd700?text=Bangkok+Phantom",
    genre_ids: ["genre_004"], // Hip-Hop
    shipping_address: {
      line1: "999/12 ถ.พระรามเก้า",
      line2: "แขวงห้วยขวาง เขตห้วยขวาง",
      city: "กรุงเทพ",
      postal_code: "10310",
      country: "TH",
      phone: "0845678901",
    },
    payout_method: {
      type: "paypal",
      account_info: {
        email: "bkphantom@mail.com",
      },
    },
    payout_balance: 0,
    created_at: new Date("2025-12-01"),
    updated_at: new Date("2025-12-01"),
  },

  // ─── 6. Mira Sol ───────────────────────────────────────
  {
    _id: "artist_006",
    user_id: "user_007",
    slug: "mira-sol",
    name: "Mira Sol",
    bio: "Folk songs written in a wooden cabin in Pai. Acoustic guitar, voice, and the sound of birds.",
    location: "Pai, Thailand",
    banner_url: "https://placehold.co/1200x400/1c1c1e/8fbc8f?text=Mira+Sol",
    genre_ids: ["genre_006"], // Folk
    shipping_address: {
      line1: "33 หมู่ 5 ต.เวียงใต้",
      line2: "อ.ปาย",
      city: "แม่ฮ่องสอน",
      postal_code: "58130",
      country: "TH",
      phone: "0856789012",
    },
    payout_method: {
      type: "paypal",
      account_info: {
        email: "mirasol@mail.com",
      },
    },
    payout_balance: 0,
    created_at: new Date("2026-01-15"),
    updated_at: new Date("2026-01-15"),
  },
];
