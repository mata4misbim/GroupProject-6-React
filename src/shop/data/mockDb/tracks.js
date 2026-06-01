// =============================================================================
// MOCK DB — TRACKS COLLECTION
// =============================================================================
// 🎵 Audio Source: SoundHelix (royalty-free, direct MP3 URLs)
//    16 tracks available — used for demo purposes
// =============================================================================

const SOUNDHELIX = (n) =>
  `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${n}.mp3`;

export const tracks = [
  // OLD WORLD VULTURES
  { _id: "track_001", product_id: "product_001", duration_sec: 480, audio_file_url: SOUNDHELIX(1), preview_url: SOUNDHELIX(1), is_streamable: true, created_at: new Date("2025-09-01") },

  // VELVET CROWS (10 singles)
  { _id: "track_002", product_id: "product_004", duration_sec: 180, audio_file_url: SOUNDHELIX(2), preview_url: SOUNDHELIX(2), is_streamable: true, created_at: new Date("2025-08-12") },
  { _id: "track_003", product_id: "product_005", duration_sec: 210, audio_file_url: SOUNDHELIX(3), preview_url: SOUNDHELIX(3), is_streamable: true, created_at: new Date("2025-08-12") },
  { _id: "track_004", product_id: "product_006", duration_sec: 245, audio_file_url: SOUNDHELIX(4), preview_url: SOUNDHELIX(4), is_streamable: true, created_at: new Date("2025-08-12") },
  { _id: "track_005", product_id: "product_007", duration_sec: 195, audio_file_url: SOUNDHELIX(5), preview_url: SOUNDHELIX(5), is_streamable: true, created_at: new Date("2025-08-12") },
  { _id: "track_006", product_id: "product_008", duration_sec: 220, audio_file_url: SOUNDHELIX(6), preview_url: SOUNDHELIX(6), is_streamable: true, created_at: new Date("2025-12-03") },
  { _id: "track_007", product_id: "product_009", duration_sec: 260, audio_file_url: SOUNDHELIX(7), preview_url: SOUNDHELIX(7), is_streamable: true, created_at: new Date("2025-12-03") },
  { _id: "track_008", product_id: "product_010", duration_sec: 175, audio_file_url: SOUNDHELIX(8), preview_url: SOUNDHELIX(8), is_streamable: true, created_at: new Date("2025-12-03") },
  { _id: "track_009", product_id: "product_011", duration_sec: 290, audio_file_url: SOUNDHELIX(9), preview_url: SOUNDHELIX(9), is_streamable: true, created_at: new Date("2026-04-20") },
  { _id: "track_010", product_id: "product_012", duration_sec: 205, audio_file_url: SOUNDHELIX(10), preview_url: SOUNDHELIX(10), is_streamable: true, created_at: new Date("2026-02-14") },
  { _id: "track_011", product_id: "product_013", duration_sec: 230, audio_file_url: SOUNDHELIX(11), preview_url: SOUNDHELIX(11), is_streamable: true, created_at: new Date("2026-04-20") },

  // CRYSTAL MALL
  { _id: "track_012", product_id: "product_024", duration_sec: 240, audio_file_url: SOUNDHELIX(12), preview_url: SOUNDHELIX(12), is_streamable: true, created_at: new Date("2025-11-01") },

  // BANGKOK PHANTOM
  { _id: "track_013", product_id: "product_029", duration_sec: 215, audio_file_url: SOUNDHELIX(13), preview_url: SOUNDHELIX(13), is_streamable: true, created_at: new Date("2025-12-15") },

  // MIRA SOL
  { _id: "track_014", product_id: "product_031", duration_sec: 195, audio_file_url: SOUNDHELIX(14), preview_url: SOUNDHELIX(14), is_streamable: true, created_at: new Date("2026-02-01") },

  // STATIC ERA
  { _id: "track_015", product_id: "product_033", duration_sec: 220, audio_file_url: SOUNDHELIX(1),  preview_url: SOUNDHELIX(1),  is_streamable: true, created_at: new Date("2026-01-10") },
  { _id: "track_016", product_id: "product_034", duration_sec: 240, audio_file_url: SOUNDHELIX(2),  preview_url: SOUNDHELIX(2),  is_streamable: true, created_at: new Date("2026-01-10") },

  // CRYSTAL MALL (additional)
  { _id: "track_017", product_id: "product_037", duration_sec: 195, audio_file_url: SOUNDHELIX(3),  preview_url: SOUNDHELIX(3),  is_streamable: true, created_at: new Date("2025-11-01") },
  { _id: "track_018", product_id: "product_038", duration_sec: 210, audio_file_url: SOUNDHELIX(4),  preview_url: SOUNDHELIX(4),  is_streamable: true, created_at: new Date("2025-11-01") },
  { _id: "track_019", product_id: "product_039", duration_sec: 230, audio_file_url: SOUNDHELIX(5),  preview_url: SOUNDHELIX(5),  is_streamable: true, created_at: new Date("2025-11-01") },

  // BANGKOK PHANTOM (additional)
  { _id: "track_020", product_id: "product_042", duration_sec: 200, audio_file_url: SOUNDHELIX(6),  preview_url: SOUNDHELIX(6),  is_streamable: true, created_at: new Date("2025-12-15") },
  { _id: "track_021", product_id: "product_043", duration_sec: 215, audio_file_url: SOUNDHELIX(7),  preview_url: SOUNDHELIX(7),  is_streamable: true, created_at: new Date("2025-12-15") },

  // MIRA SOL (additional)
  { _id: "track_022", product_id: "product_046", duration_sec: 185, audio_file_url: SOUNDHELIX(8),  preview_url: SOUNDHELIX(8),  is_streamable: true, created_at: new Date("2026-02-01") },
  { _id: "track_023", product_id: "product_047", duration_sec: 205, audio_file_url: SOUNDHELIX(9),  preview_url: SOUNDHELIX(9),  is_streamable: true, created_at: new Date("2026-02-01") },
  { _id: "track_024", product_id: "product_048", duration_sec: 225, audio_file_url: SOUNDHELIX(10), preview_url: SOUNDHELIX(10), is_streamable: true, created_at: new Date("2026-02-01") },
  { _id: "track_025", product_id: "product_051", duration_sec: 190, audio_file_url: SOUNDHELIX(11), preview_url: SOUNDHELIX(11), is_streamable: true, created_at: new Date("2026-02-01") },
  { _id: "track_026", product_id: "product_052", duration_sec: 215, audio_file_url: SOUNDHELIX(12), preview_url: SOUNDHELIX(12), is_streamable: true, created_at: new Date("2026-02-01") },
  { _id: "track_027", product_id: "product_055", duration_sec: 240, audio_file_url: SOUNDHELIX(13), preview_url: SOUNDHELIX(13), is_streamable: true, created_at: new Date("2026-02-01") },
];
