// =============================================================================
// MOCK DB — GENRES COLLECTION (Master Data)
// =============================================================================
// Schema: genres { _id, name, slug, description, created_at }
// ตาม MOM 29/4: Admin จัดการ genres, ศิลปินเลือก genre ของตัวเองตอนสมัคร
// =============================================================================

export const genres = [
  {
    _id: "genre_001",
    name: "Rock",
    slug: "rock",
    description: "Rock music — guitar-driven, energetic",
    created_at: new Date("2026-01-01"),
  },
  {
    _id: "genre_002",
    name: "Pop",
    slug: "pop",
    description: "Popular music with catchy melodies",
    created_at: new Date("2026-01-01"),
  },
  {
    _id: "genre_003",
    name: "Electronic",
    slug: "electronic",
    description: "Synthesizer-based electronic music",
    created_at: new Date("2026-01-01"),
  },
  {
    _id: "genre_004",
    name: "Hip-Hop",
    slug: "hip-hop",
    description: "Rap and hip-hop beats",
    created_at: new Date("2026-01-01"),
  },
  {
    _id: "genre_005",
    name: "Indie",
    slug: "indie",
    description: "Independent artists, alternative sounds",
    created_at: new Date("2026-01-01"),
  },
  {
    _id: "genre_006",
    name: "Folk",
    slug: "folk",
    description: "Acoustic folk, traditional storytelling",
    created_at: new Date("2026-01-01"),
  },
  {
    _id: "genre_007",
    name: "Jazz",
    slug: "jazz",
    description: "Jazz, blues, improvisation",
    created_at: new Date("2026-01-01"),
  },
  {
    _id: "genre_008",
    name: "Ambient",
    slug: "ambient",
    description: "Atmospheric, drone, and ambient music",
    created_at: new Date("2026-01-01"),
  },
  {
    _id: "genre_009",
    name: "Synthwave",
    slug: "synthwave",
    description: "Retrowave, 80s-inspired electronic",
    created_at: new Date("2026-01-01"),
  },
  {
    _id: "genre_010",
    name: "Metal",
    slug: "metal",
    description: "Heavy metal and its subgenres",
    created_at: new Date("2026-01-01"),
  },
];
