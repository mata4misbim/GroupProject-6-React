// =============================================================================
// AUDIO PLAYER — Side panel ขวา (Bandcamp style)
// =============================================================================
// - เริ่มใต้ header (top-[68px]) สูงเต็มจอ ชิดขวา กว้าง 300px
// - เล่นต่อเนื่องข้ามหน้า — ไม่หยุดเมื่อเปลี่ยน route
// - ปิดได้ทางเดียว = ปุ่ม ✕
// - ไม่มีปุ่ม play ซ้ำ / ไม่มีรูปเล็กซ้ำ (รูปใหญ่บนสุดพอแล้ว)
// =============================================================================

import { Link } from "react-router-dom";
import { useAudioPlayer } from "../../context/AudioPlayerContext";
import { formatDuration, findArtistById } from "../../data/helpers";

export default function AudioPlayer() {
  const {
    isOpen,
    currentProduct,
    currentArtist,
    queue,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    hasNext,
    hasPrev,
    togglePlay,
    playNext,
    playPrev,
    playQueueIndex,
    seek,
    setVolume,
    closePlayer,
  } = useAudioPlayer();

  if (!isOpen || !currentProduct) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const remaining = Math.max(0, duration - currentTime);

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seek(ratio * duration);
  };

  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setVolume(ratio);
  };

  // Up Next = เพลงที่อยู่หลัง current index ใน queue
  const upNext = queue.slice(currentIndex + 1);

  return (
    <aside className="fixed right-0 top-[68px] bottom-0 w-[300px] bg-[#141414] border-l border-white/[0.06] flex flex-col z-30 shadow-[-8px_0_32px_rgba(0,0,0,0.5)]">
      {/* ── Cover + Close ── */}
      <div className="relative shrink-0">
        <div className="aspect-square bg-bg-card">
          {currentProduct.cover_url ? (
            <img
              src={currentProduct.cover_url}
              alt={currentProduct.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/15 text-5xl">
              ♪
            </div>
          )}
        </div>
        <button
          onClick={closePlayer}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-md bg-[rgba(30,30,32,0.85)] backdrop-blur-sm text-white/70 hover:text-white transition-colors"
          aria-label="Close player"
        >
          ✕
        </button>
      </div>

      {/* ── Title + Artist (ไม่มีปุ่ม play ซ้ำ) ── */}
      <div className="px-4 py-3.5 border-b border-white/[0.05]">
        <Link
          to={`/product/${currentProduct.slug}`}
          className="block text-white font-semibold text-[15px] leading-tight no-underline hover:text-white/80 transition-colors truncate"
        >
          {currentProduct.title}
        </Link>
        {currentArtist && (
          <Link
            to={`/artist/${currentArtist.slug}`}
            className="block text-white/45 text-[12px] no-underline hover:text-white/70 transition-colors truncate mt-0.5"
          >
            by {currentArtist.name}
          </Link>
        )}
      </div>

      {/* ── Progress ── */}
      <div className="flex items-center gap-2.5 px-4 pt-3.5 pb-2">
        <span className="text-white/45 text-[11px] tabular-nums shrink-0">
          {formatDuration(Math.floor(currentTime))}
        </span>
        <div
          onClick={handleProgressClick}
          className="relative flex-1 h-[3px] bg-white/15 rounded-full cursor-pointer group"
        >
          <div
            className="absolute inset-y-0 left-0 bg-white rounded-full"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-[11px] h-[11px] bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${progress}% - 5px)` }}
          />
        </div>
        <span className="text-white/45 text-[11px] tabular-nums shrink-0">
          -{formatDuration(Math.floor(remaining))}
        </span>
      </div>

      {/* ── Controls: prev / play-pause / next ── */}
      <div className="flex items-center justify-center gap-6 px-4 pt-2 pb-4">
        <button
          onClick={playPrev}
          disabled={!hasPrev}
          className="text-white/65 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zM9.5 12l8.5 6V6z" />
          </svg>
        </button>

        <button
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 active:scale-95 transition-transform"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          ) : isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "2px" }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          onClick={playNext}
          disabled={!hasNext}
          className="text-white/65 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>

      {/* ── Volume ── */}
      <div className="flex items-center gap-2 px-4 pb-4">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
        <div
          onClick={handleVolumeClick}
          className="relative flex-1 h-[3px] bg-white/15 rounded-full cursor-pointer"
        >
          <div
            className="absolute inset-y-0 left-0 bg-white/60 rounded-full"
            style={{ width: `${volume * 100}%` }}
          />
        </div>
      </div>

      {/* ── Up Next playlist ── */}
      {upNext.length > 0 && (
        <div className="border-t border-white/[0.05] px-4 py-3.5 overflow-y-auto">
          <p className="text-[10px] uppercase tracking-[0.1em] text-white/35 mb-2.5">
            Up next
          </p>
          <div className="flex flex-col">
            {upNext.map((p, i) => {
              const realIndex = currentIndex + 1 + i;
              const artist = findArtistById(p.artist_id);
              return (
                <button
                  key={p._id}
                  onClick={() => playQueueIndex(realIndex)}
                  className="flex items-center gap-2.5 py-1.5 text-left hover:bg-white/[0.04] -mx-2 px-2 rounded transition-colors"
                >
                  <div className="w-8 h-8 rounded overflow-hidden bg-bg-card shrink-0">
                    {p.cover_url ? (
                      <img src={p.cover_url} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20 text-[13px]">♪</div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] text-white/80 truncate">{p.title}</p>
                    {artist && (
                      <p className="text-[10px] text-white/40 truncate">{artist.name}</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}
