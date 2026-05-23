// =============================================================================
// MOCK DB — ALBUMS COLLECTION
// =============================================================================
// Schema: albums {
//   _id, product_id, track_ids[], created_at
// }
// (release_date ย้ายไป products แล้วตาม mentor feedback)
//
// ⭐ Many-to-Many: track เดียวกันอยู่ในหลาย albums ได้
//    เก็บเป็น array of track_ids — ลำดับใน array = ลำดับเพลงใน album
//
// 📌 Note: บาง album อาจมี tracks ที่ "ไม่มี product แยก"
//    เช่น OWV "Midnight Echoes" มี 4 tracks แต่ไม่ขายแยกเป็น single
//    → ตอนนี้ผมข้าม OWV album ไปก่อน (รอ decision จากทีม)
//    → focus ที่ Velvet Crows เพราะทุก track ขายแยกเป็น single ได้
// =============================================================================

export const albums = [
  // ═══════════════════════════════════════════════════════════════
  // VELVET CROWS — 5 albums
  // ═══════════════════════════════════════════════════════════════

  // Album 1: Dark Romantics (4 tracks)
  {
    _id: "album_001",
    product_id: "product_014", // Dark Romantics
    track_ids: [
      "track_002", // Hollow Bones        ⭐ ซ้ำกับ B-Sides Vol.1
      "track_003", // Cigarette Burns     ⭐ ซ้ำกับ Live at Sunset
      "track_004", // Static Lights
      "track_005", // Rust on Velvet
    ],
    created_at: new Date("2025-08-12"),
  },

  // Album 2: Under the Streetlight (3 tracks)
  {
    _id: "album_002",
    product_id: "product_015",
    track_ids: [
      "track_006", // Slow Dance Goodbye  ⭐ ซ้ำกับ B-Sides Vol.1
      "track_007", // Feather and Glass
      "track_008", // Honey, Don't Stay
    ],
    created_at: new Date("2025-12-03"),
  },

  // Album 3: B-Sides Vol. 1 (3 tracks — ซ้ำกับ albums อื่นทั้ง 3 ตัว!)
  {
    _id: "album_003",
    product_id: "product_016",
    track_ids: [
      "track_002", // Hollow Bones        ⭐ ก็อยู่ใน Dark Romantics
      "track_006", // Slow Dance Goodbye  ⭐ ก็อยู่ใน Under the Streetlight
      "track_010", // Ghost Years         ⭐ ก็อยู่ใน Dust
    ],
    created_at: new Date("2026-02-14"),
  },

  // Album 4: Live at Sunset (3 tracks)
  {
    _id: "album_004",
    product_id: "product_017",
    track_ids: [
      "track_003", // Cigarette Burns     ⭐ ก็อยู่ใน Dark Romantics
      "track_009", // Coal Eyes
      "track_011", // Salt and Memory
    ],
    created_at: new Date("2026-04-20"),
  },

  // Album 5: Dust (1 track — single album!)
  {
    _id: "album_005",
    product_id: "product_018",
    track_ids: [
      "track_010", // Ghost Years         ⭐ ก็อยู่ใน B-Sides Vol.1
    ],
    created_at: new Date("2026-05-01"),
  },

  // ═══════════════════════════════════════════════════════════════
  // CRYSTAL MALL — 1 album
  // ═══════════════════════════════════════════════════════════════
  // Note: Mall After Hours มี 5 tracks แต่ใน mock data เรามี track เดียว
  //       (Neon Reflection) — ที่เหลือยังไม่ได้ใส่ track + product แยก
  //       ตอนนี้ใส่แค่ 1 track ใน album นี้
  {
    _id: "album_006",
    product_id: "product_025", // Mall After Hours
    track_ids: [
      "track_012", // Neon Reflection
    ],
    created_at: new Date("2025-12-15"),
  },

  // ═══════════════════════════════════════════════════════════════
  // BANGKOK PHANTOM — 1 album
  // ═══════════════════════════════════════════════════════════════
  {
    _id: "album_007",
    product_id: "product_030", // Phantom Tales
    track_ids: [
      "track_013", // Sukhumvit Nights
    ],
    created_at: new Date("2026-03-10"),
  },

  // ═══════════════════════════════════════════════════════════════
  // MIRA SOL — 1 album
  // ═══════════════════════════════════════════════════════════════
  {
    _id: "album_008",
    product_id: "product_032", // Cabin Songs
    track_ids: [
      "track_014", // Morning Birds
    ],
    created_at: new Date("2026-04-01"),
  },
];

/*
═══════════════════════════════════════════════════════════════
SUMMARY: 8 albums

⭐ Many-to-Many DEMO:
   "Hollow Bones" (track_002)        → Dark Romantics + B-Sides Vol.1
   "Cigarette Burns" (track_003)     → Dark Romantics + Live at Sunset
   "Slow Dance Goodbye" (track_006)  → Under the Streetlight + B-Sides Vol.1
   "Ghost Years" (track_010)         → B-Sides Vol.1 + Dust

📌 Single album: "Dust" มี 1 track → ตาม MOM
   "Album ที่มี Track เดียวก็ถือเป็น Single ได้"
═══════════════════════════════════════════════════════════════
*/
