import { useAudio } from "../../contexts/AudioContext";

const formatTime = (s) => {
  if (!Number.isFinite(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

export default function MiniPlayer() {
  const {
    activeTrack, isPlaying, progress, currentTime, duration,
    volume, isMuted, isVisible,
    togglePlayback, playNext, playPrevious, seekAudio,
    setVolume, setIsMuted, closeMiniPlayer,
  } = useAudio();

  if (!isVisible || (!isPlaying && currentTime === 0)) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-999 flex items-center gap-3 border-t border-white/15 bg-[#0a0a1f]/95 px-5 py-2 backdrop-blur-xl font-['Plus_Jakarta_Sans',sans-serif] shadow-[0_-2px_18px_rgba(255,255,255,0.07)]">

      {/* Track info */}
      <div className="flex items-center gap-2 w-56 shrink-0">
        <img src={activeTrack.img} alt={activeTrack.name} className="h-8 w-8 rounded-md object-cover" />
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-white">{activeTrack.name}</p>
          <p className="truncate text-[11px] text-white/40">{activeTrack.artist}</p>
        </div>
      </div>

      {/* Controls + progress */}
      <div className="flex flex-1 flex-col items-center gap-1">
        <div className="flex items-center gap-4">
          <button onClick={playPrevious} className="text-white/50 hover:text-white transition-colors" type="button">
            <svg viewBox="0 -960 960 960" width="18" height="18" fill="currentColor">
              <path d="M220-240v-480h60v480h-60Zm520 0L380-480l360-240v480Zm-60-112v-256L488-480l192 128Z" />
            </svg>
          </button>
          <button
            onClick={togglePlayback}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0d0d0d] hover:scale-105 transition-transform"
            type="button"
          >
            <svg viewBox="0 -960 960 960" width="18" height="18" fill="currentColor">
              {isPlaying ? (
                <path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
              ) : (
                <path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
              )}
            </svg>
          </button>
          <button onClick={playNext} className="text-white/50 hover:text-white transition-colors" type="button">
            <svg viewBox="0 -960 960 960" width="18" height="18" fill="currentColor">
              <path d="M680-240v-480h60v480h-60Zm-460 0v-480l360 240-360 240Zm60-112 192-128-192-128v256Z" />
            </svg>
          </button>
        </div>

        <div className="flex w-full max-w-lg items-center gap-2">
          <span className="text-[10px] text-white/40 w-8 text-right">{formatTime(currentTime)}</span>
          <button
            className="h-1 flex-1 cursor-pointer overflow-hidden rounded-full border-0 bg-white/20 p-0"
            type="button"
            onClick={seekAudio}
          >
            <span className="block h-full rounded-full bg-white transition-[width] duration-100" style={{ width: `${progress}%` }} />
          </button>
          <span className="text-[10px] text-white/40 w-8">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume + Close */}
      <div className="flex items-center gap-2 w-36 shrink-0 justify-end">
        <button
          onClick={() => setIsMuted((m) => !m)}
          className="text-white/40 hover:text-white transition-colors"
          type="button"
        >
          <svg viewBox="0 -960 960 960" width="18" height="18" fill="currentColor">
            {isMuted ? (
              <path d="m792-56-96-96q-41 32-91 50.5T500-82v-82q35-8 66.5-21.5T625-221L480-366v126L280-440H120v-240h188L56-932l56-56L848-112l-56 56Z" />
            ) : (
              <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320Z" />
            )}
          </svg>
        </button>
        <input
          type="range" min="0" max="1" step="0.01"
          value={isMuted ? 0 : volume}
          onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false); }}
          className="h-1 w-20 cursor-pointer accent-white"
        />
        <button
          onClick={closeMiniPlayer}
          className="ml-1 text-white/40 hover:text-white transition-colors"
          type="button"
          aria-label="Close player"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>

    </div>
  );
}
