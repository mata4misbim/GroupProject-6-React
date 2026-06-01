import { Link } from "react-router-dom";
import { useAudioPlayer } from "../../context/AudioPlayerContext";
import { formatDuration, findArtistById } from "../../data/helpers";

export default function AudioPlayer() {
  const {
    isOpen, currentProduct, currentArtist, queue, currentIndex,
    isPlaying, currentTime, duration, volume, isLoading,
    hasNext, hasPrev, togglePlay, playNext, playPrev,
    playQueueIndex, seek, setVolume, closePlayer,
  } = useAudioPlayer();

  if (!isOpen || !currentProduct) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const remaining = Math.max(0, duration - currentTime);
  const upNext = queue.slice(currentIndex + 1);

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    seek((e.clientX - rect.left) / rect.width * duration);
  };

  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setVolume(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)));
  };

  return (
    <aside className="fixed right-0 top-[68px] bottom-0 w-[300px] z-30 flex flex-col overflow-hidden bg-[#02020c] border-l border-white/5">
      {/* Accent top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent z-10" />

      {/* Blurred background */}
      {currentProduct.cover_url && (
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center blur-2xl scale-110"
          style={{ backgroundImage: `url(${currentProduct.cover_url})` }}
        />
      )}
      <div className="absolute inset-0 bg-linear-to-b from-[#03030f]/95 via-[#0a0a1f]/90 to-[#03030f]/98" />

      {/* Content */}
      <div className="relative flex flex-col h-full overflow-hidden">

        {/* Album art */}
        <div className="relative shrink-0 px-6 pt-8 pb-4">
          <button
            onClick={closePlayer}
            className="absolute top-3 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-white/10 text-white/50 hover:text-white hover:bg-white/20 transition-all text-xs"
            aria-label="Close player"
          >
            ✕
          </button>
          <div className="aspect-square w-full rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            {currentProduct.cover_url ? (
              <img src={currentProduct.cover_url} alt={currentProduct.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white/5 text-white/20 text-5xl">♪</div>
            )}
          </div>
        </div>

        {/* Title + artist */}
        <div className="px-6 pb-4">
          <Link
            to={`/product/${currentProduct.slug}`}
            className="block text-white font-bold text-[17px] leading-tight no-underline hover:text-white/80 transition-colors truncate"
          >
            {currentProduct.title}
          </Link>
          {currentArtist && (
            <Link
              to={`/artist/${currentArtist.slug}`}
              className="block text-white/50 text-[13px] no-underline hover:text-white/70 transition-colors truncate mt-1"
            >
              {currentArtist.name}
            </Link>
          )}
        </div>

        {/* Progress bar */}
        <div className="px-6 pb-2">
          <div
            onClick={handleProgressClick}
            className="group relative h-1 bg-white/15 rounded-full cursor-pointer hover:h-1.25 transition-all duration-150"
          >
            <div className="absolute inset-y-0 left-0 bg-white rounded-full" style={{ width: `${progress}%` }} />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-[11px] text-white/35 tabular-nums">
            <span>{formatDuration(Math.floor(currentTime))}</span>
            <span>-{formatDuration(Math.floor(remaining))}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8 px-6 py-3">
          <button
            onClick={playPrev}
            disabled={!hasPrev}
            className="text-white/50 hover:text-white disabled:opacity-20 transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zM9.5 12l8.5 6V6z" />
            </svg>
          </button>

          <button
            onClick={togglePlay}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-black shadow-[0_4px_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-transform"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "2px" }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            onClick={playNext}
            disabled={!hasNext}
            className="text-white/50 hover:text-white disabled:opacity-20 transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 px-6 pb-4">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          </svg>
          <div onClick={handleVolumeClick} className="relative flex-1 h-1 bg-white/15 rounded-full cursor-pointer">
            <div className="absolute inset-y-0 left-0 bg-white/50 rounded-full" style={{ width: `${volume * 100}%` }} />
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        </div>

        {/* Up Next */}
        {upNext.length > 0 && (
          <div className="flex-1 overflow-y-auto border-t border-white/6 bg-[#141420]/60 px-6 pt-4 pb-4 scrollbar-none [&::-webkit-scrollbar]:hidden">
            <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 font-semibold mb-3">Up Next</p>
            <div className="flex flex-col gap-1">
              {upNext.map((p, i) => {
                const realIndex = currentIndex + 1 + i;
                const artist = findArtistById(p.artist_id);
                return (
                  <button
                    key={p._id}
                    onClick={() => playQueueIndex(realIndex)}
                    className="flex items-center gap-3 py-2 px-2 -mx-2 rounded-xl text-left hover:bg-white/6 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 shrink-0">
                      {p.cover_url ? (
                        <img src={p.cover_url} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">♪</div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] text-white/80 truncate group-hover:text-white transition-colors">{p.title}</p>
                      {artist && <p className="text-[11px] text-white/35 truncate">{artist.name}</p>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </aside>
  );
}
