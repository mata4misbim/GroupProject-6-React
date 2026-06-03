import { useEffect, useRef, useState } from "react";
import Footer from "../../components/common/Footer";
import { useParams, Link } from "react-router-dom";
import {
  findLiveById,
  getCurrentLiveTimestamp,
  getLiveElapsedMinutes,
  getViewerCount,
} from "../data/liveHelpers";
import { findArtistById } from "../data/helpers";
import LiveChat from "../components/LiveChat";
import FollowButton from "../components/FollowButton"; // จากชุด follow-feature

// =============================================================================
// LIVE PAGE — หน้า Live เต็ม (route: /live/:id)
// =============================================================================
// องค์ประกอบ:
//   - วิดีโอใหญ่ aspect 16:9 (loop คลิปสั้น + sync timestamp)
//   - Badge 🔴 LIVE กะพริบ + จำนวนคนดู + เวลาที่ live ผ่านมา
//   - ห้าม seek (ลบ progress bar) ห้าม pause (pause แล้ว resume เอง)
//   - ใต้วิดีโอ: avatar + ชื่อรายการ + ศิลปิน + ปุ่ม Follow
//   - ข้างขวา: LiveChat (สุ่มข้อความเอง)
//
// 💡 Sync trick: เปิดมากลางคันเห็นจุดเดียวกับทุกคน (เหมือน live จริง)
// =============================================================================

export default function LivePage() {
  const { id } = useParams();
  const live = findLiveById(id);
  const artist = live ? findArtistById(live.artist_id) : null;

  const videoRef = useRef(null);
  const [viewerCount, setViewerCount] = useState(0);
  const [elapsedMin, setElapsedMin] = useState(0);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.8);

  const handleVolumeChange = (e) => {
    const val = Number(e.target.value);
    setVolume(val);

    if (val === 0) {
      setMuted(true);
    } else {
      setMuted(false);
    }
  };

  const toggleMute = () => {
    if (muted && volume === 0) {
      setVolume(0.8);
    }

    setMuted((current) => !current);
  };

  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.volume = volume;
    videoRef.current.muted = muted;
  }, [muted, volume]);

  // ── ตั้งค่าวิดีโอเมื่อโหลดเสร็จ ──
  useEffect(() => {
    if (!live || !videoRef.current) return;
    const video = videoRef.current;

    const handleLoadedMetadata = () => {
      // คำนวณจุดที่ควรเล่น (sync กับ live timestamp)
      const targetSec = getCurrentLiveTimestamp(live.started_at, video.duration);
      video.currentTime = targetSec;
      video.play().catch((err) => console.warn("Autoplay blocked:", err));
    };

    // ห้าม pause — ถ้าผู้ใช้ pause ให้ resume ทันที (ทำให้รู้สึกเหมือน live)
    const handlePause = () => {
      // ให้เวลานิดหน่อย เผื่อ user เป็นคนกดจริงๆ ก็ resume กลับ
      setTimeout(() => {
        if (video.paused && !video.ended) {
          video.play().catch(() => {});
        }
      }, 100);
    };

    // ห้าม seek — ถ้า user seek ดึงกลับมาจุดที่ควรเล่นตามเวลา live
    const handleSeeking = () => {
      const targetSec = getCurrentLiveTimestamp(live.started_at, video.duration);
      if (Math.abs(video.currentTime - targetSec) > 2) {
        video.currentTime = targetSec;
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("pause", handlePause);
    video.addEventListener("seeking", handleSeeking);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("seeking", handleSeeking);
    };
  }, [live]);

  // ── อัปเดต viewer count + elapsed ทุก 30 วินาที ──
  useEffect(() => {
    if (!live) return;
    const update = () => {
      setViewerCount(getViewerCount(live._id));
      setElapsedMin(getLiveElapsedMinutes(live.started_at));
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, [live]);

  // ── ถ้าไม่เจอ live ── 404
  if (!live) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-white/30 text-2xl mb-3">404</p>
          <p className="text-white/50 text-[15px] mb-6">Live stream not found</p>
          <Link to="/" className="text-accent hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="px-[5%] py-8">
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-white/55 hover:text-white text-[14px] no-underline mb-6 transition-colors"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to home
      </Link>

      {/* Main content — วิดีโอ + chat */}
      <div className="flex gap-6 items-start">
        {/* ── ฝั่งซ้าย: วิดีโอ + info ── */}
        <div className="flex-1 min-w-0">
          {/* Video container */}
          <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              src={live.video_url}
              autoPlay
              muted={muted}
              playsInline
              loop
              className="w-full h-full object-cover"
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
            />

            {/* Badge LIVE กะพริบ */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#E24B4A] px-3 py-1.5 rounded-md shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
              </span>
              <span className="text-white text-[12px] font-bold tracking-wider">
                LIVE
              </span>
            </div>

            {/* จำนวนคนดู */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-md">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span className="text-white text-[12px] font-medium tabular-nums">
                {viewerCount.toLocaleString()} watching
              </span>
            </div>

            {/* Volume control */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
              <button
                onClick={toggleMute}
                className="text-white hover:text-white/70 transition-colors shrink-0"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted || volume === 0 ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : volume < 0.5 ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={muted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 accent-white cursor-pointer"
                aria-label="Volume"
              />
            </div>

            {/* progress bar สีแดงเต็มเส้น = live */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/15">
              <div className="h-full bg-[#E24B4A]" />
            </div>
          </div>

          {/* Info ใต้วิดีโอ */}
          <div className="mt-4 flex items-start gap-3">
            {/* Avatar ศิลปิน */}
            <Link
              to={artist ? `/artist/${artist.slug}` : "#"}
              className="shrink-0 w-12 h-12 rounded-full overflow-hidden bg-bg-card no-underline"
            >
              {artist?.banner_url ? (
                <img
                  src={artist.banner_url.replace("1200x400", "200x200")}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
                  ?
                </div>
              )}
            </Link>

            <div className="flex-1 min-w-0">
              <h1 className="text-white text-[18px] font-bold leading-tight">
                {live.title}
              </h1>
              {artist && (
                <Link
                  to={`/artist/${artist.slug}`}
                  className="text-white/55 text-[13px] hover:text-white/85 transition-colors no-underline"
                >
                  {artist.name} · Live for {elapsedMin} min
                </Link>
              )}
            </div>

            {/* ปุ่ม Follow */}
            {artist && <FollowButton artistId={artist._id} />}
          </div>

          {/* Description */}
          {live.description && (
            <div className="mt-4 p-4 bg-white/[0.04] border border-white/[0.06] rounded-lg">
              <p className="text-white/70 text-[13px] leading-relaxed">
                {live.description}
              </p>
            </div>
          )}
        </div>

        {/* ── ฝั่งขวา: Chat ── */}
        <LiveChat liveId={live._id} />
      </div>
      </div>
      <Footer simple />
    </div>
  );
}
