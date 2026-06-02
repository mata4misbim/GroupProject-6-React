// ตอนนี้: ดึงจาก mockDb — อนาคต: GET /api/my-singles
const DEMO_ARTIST_ID = "artist_002"; // Velvet Crows

export function getMySingles(products, tracks) {
  const singleProducts = products.filter(
    (p) => p.type === "single" && p.artist_id === DEMO_ARTIST_ID && p.status === "published"
  );
  return singleProducts.map((p) => {
    const track = tracks.find((t) => t._id === p.track_id);
    return {
      track_id: p.track_id,
      product_id: p._id,
      title: p.title,
      duration: track?.duration_sec || 0,
      cover_url: p.cover_url,
    };
  });
}

export function formatDuration(sec) {
  if (!sec) return "—";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
