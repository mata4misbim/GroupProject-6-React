// =============================================================================
// MOCK DB — USERS COLLECTION
// =============================================================================
// Schema: users { _id, username, email, password_hash, user_type,
//                 display_name, avatar_url, status, created_at, updated_at }
// user_type enum: ADMIN | USER | ARTIST
// status enum: active | inactive | banned | deleted
//
// หมายเหตุ: password_hash เป็น mock string เท่านั้น
//          จริงต้องใช้ bcrypt hash ในระบบ production
// =============================================================================

export const users = [
  // ─── ADMIN ──────────────────────────────────────────
  {
    _id: "user_001",
    username: "admin",
    email: "admin@audtlist.com",
    password_hash: "$2b$10$mockadminhash",
    user_type: "ADMIN",
    display_name: "Audtlist Admin",
    avatar_url: null,
    status: "active",
    created_at: new Date("2026-01-01"),
    updated_at: new Date("2026-01-01"),
  },

  // ─── ARTISTS (5 คน) ─────────────────────────────────
  {
    _id: "user_002",
    username: "owv_band",
    email: "owv@mail.com",
    password_hash: "$2b$10$mockowvhash",
    user_type: "ARTIST",
    display_name: "Old World Vultures",
    avatar_url: "https://placehold.co/200x200/2c2c2e/fff?text=OWV",
    status: "active",
    created_at: new Date("2025-08-15"),
    updated_at: new Date("2025-08-15"),
  },
  {
    _id: "user_003",
    username: "velvet_crows",
    email: "velvetcrows@mail.com",
    password_hash: "$2b$10$mockvchash",
    user_type: "ARTIST",
    display_name: "Velvet Crows",
    avatar_url: "https://placehold.co/200x200/2c2c2e/fff?text=VC",
    status: "active",
    created_at: new Date("2025-09-01"),
    updated_at: new Date("2025-09-01"),
  },
  {
    _id: "user_004",
    username: "crystal_mall",
    email: "crystalmall@mail.com",
    password_hash: "$2b$10$mockcmhash",
    user_type: "ARTIST",
    display_name: "Crystal Mall",
    avatar_url: "https://placehold.co/200x200/2c2c2e/fff?text=CM",
    status: "active",
    created_at: new Date("2025-10-20"),
    updated_at: new Date("2025-10-20"),
  },
  {
    _id: "user_005",
    username: "static_era",
    email: "staticera@mail.com",
    password_hash: "$2b$10$mocksehash",
    user_type: "ARTIST",
    display_name: "Static Era",
    avatar_url: "https://placehold.co/200x200/2c2c2e/fff?text=SE",
    status: "active",
    created_at: new Date("2025-11-05"),
    updated_at: new Date("2025-11-05"),
  },
  {
    _id: "user_006",
    username: "bangkok_phantom",
    email: "bkphantom@mail.com",
    password_hash: "$2b$10$mockbphash",
    user_type: "ARTIST",
    display_name: "Bangkok Phantom",
    avatar_url: "https://placehold.co/200x200/2c2c2e/fff?text=BP",
    status: "active",
    created_at: new Date("2025-12-01"),
    updated_at: new Date("2025-12-01"),
  },
  {
    _id: "user_007",
    username: "mira_sol",
    email: "mirasol@mail.com",
    password_hash: "$2b$10$mockmshash",
    user_type: "ARTIST",
    display_name: "Mira Sol",
    avatar_url: "https://placehold.co/200x200/2c2c2e/fff?text=MS",
    status: "active",
    created_at: new Date("2026-01-15"),
    updated_at: new Date("2026-01-15"),
  },

  // ─── CUSTOMERS (USER type) ──────────────────────────
  {
    _id: "user_008",
    username: "malee_fan",
    email: "malee@mail.com",
    password_hash: "$2b$10$mockmaleehash",
    user_type: "USER",
    display_name: "มาลี ใจดี",
    avatar_url: null,
    status: "active",
    created_at: new Date("2026-02-10"),
    updated_at: new Date("2026-02-10"),
  },
  {
    _id: "user_009",
    username: "somchai_dev",
    email: "somchai@mail.com",
    password_hash: "$2b$10$mocksomchaihash",
    user_type: "USER",
    display_name: "สมชาย รักเพลง",
    avatar_url: null,
    status: "active",
    created_at: new Date("2026-03-05"),
    updated_at: new Date("2026-03-05"),
  },
];
