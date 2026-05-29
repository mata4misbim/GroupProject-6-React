import { Link } from "react-router-dom";
import { findArtistById } from "../data/helpers";

// =============================================================================
// LIVE CARD — โผล่ในหน้าแรก (ฝั่งซ้ายของส่วน Audtlist Radio)
// =============================================================================
// แสดงรูป + ชื่อรายการ + ป้าย LIVE สีแดง
// กดแล้วลิงก์ไป /live/:id
//
// 💡 สำคัญ: artist_id ที่ส่งเข้าหน้า Live ต้องตรงกับการ์ดนี้ →
//    ดึง artist เดียวกัน ไม่งั้นกดเข้าไปแล้วเปลี่ยน = ดูไม่โปร
// =============================================================================

export default function LiveCard({ live }) {
  if (!live) return null;
  const artist = findArtistById(live.artist_id);

  return (
    <Link
      to={`/live/${live._id}`}
      className="block group no-underline rounded-2xl overflow-hidden bg-bg-card border border-white/10 hover:border-white/30 transition-all"
    >
      {/* รูป + overlay */}
      <div className="relative aspect-video bg-black overflow-hidden">
        <img
          src={live.thumbnail_url}
          alt={live.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* gradient ดำตามล่างให้ข้อความอ่านได้ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Badge LIVE สีแดง กะพริบ */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#E24B4A] px-2.5 py-1 rounded-md shadow-lg">
          <span className="w-[7px] h-[7px] rounded-full bg-white animate-pulse" />
          <span className="text-white text-[11px] font-semibold tracking-wider">
            LIVE
          </span>
        </div>

        {/* ชื่อรายการ + ศิลปิน ด้านล่าง */}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-white text-[14px] font-semibold leading-tight truncate">
            {live.title}
          </p>
          {artist && (
            <p className="text-white/70 text-[12px] mt-0.5 truncate">
              {artist.name}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
