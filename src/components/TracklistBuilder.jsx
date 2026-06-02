import { useState, useRef } from "react";
import PickSingleModal from "./PickSingleModal";
import { validateAudioFile, formatBytes } from "../utils/uploadValidation";
import { formatDuration } from "../shop/data/mySingles";

export default function TracklistBuilder({ tracks, onChange, error }) {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showPickModal, setShowPickModal] = useState(false);
  const audioInputRef = useRef(null);

  const handleAddNewTrack = () => { setShowAddMenu(false); audioInputRef.current?.click(); };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const err = validateAudioFile(file);
    if (err) { alert(err); e.target.value = ""; return; }
    const newTrack = { id: `temp-${Date.now()}`, type: "new", file, title: file.name.replace(/\.[^/.]+$/, "") };
    onChange([...tracks, newTrack]);
    e.target.value = "";
  };

  const handleAddFromSingles = () => { setShowAddMenu(false); setShowPickModal(true); };

  const handlePicked = (singles) => {
    const newTracks = singles.map((s) => ({
      id: `existing-${s.track_id}`,
      type: "existing",
      track_id: s.track_id,
      title: s.title,
      duration: s.duration,
      cover_url: s.cover_url,
    }));
    onChange([...tracks, ...newTracks]);
  };

  const handleRemove = (idx) => onChange(tracks.filter((_, i) => i !== idx));

  const handleTitleChange = (idx, title) => {
    const next = [...tracks];
    next[idx] = { ...next[idx], title };
    onChange(next);
  };

  const handleMove = (idx, direction) => {
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= tracks.length) return;
    const next = [...tracks];
    [next[idx], next[targetIdx]] = [next[targetIdx], next[idx]];
    onChange(next);
  };

  const usedTrackIds = tracks.filter((t) => t.type === "existing").map((t) => t.track_id);

  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <label className="text-[11px] uppercase tracking-[0.1em] text-white/50">
          Tracklist * ({tracks.length})
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowAddMenu((v) => !v)}
            className="text-[11px] px-3 py-1.5 rounded-md bg-[#6c63ff]/15 text-[#9d6dff] border border-[#6c63ff]/30 hover:bg-[#6c63ff]/25 transition-colors inline-flex items-center gap-1"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Track
          </button>
          {showAddMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowAddMenu(false)} />
              <div className="absolute right-0 top-full mt-1 z-20 w-[200px] bg-[#1a1a1a] border border-white/[0.1] rounded-lg shadow-xl overflow-hidden">
                <button type="button" onClick={handleAddNewTrack} className="w-full text-left px-3 py-2.5 text-[12px] text-white/85 hover:bg-white/[0.05] transition-colors flex items-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                  </svg>
                  Upload new track
                </button>
                <button type="button" onClick={handleAddFromSingles} className="w-full text-left px-3 py-2.5 text-[12px] text-white/85 hover:bg-white/[0.05] transition-colors border-t border-white/[0.04] flex items-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                  </svg>
                  Pick from your singles
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <input ref={audioInputRef} type="file" accept="audio/mpeg,audio/wav,audio/flac,audio/x-flac" onChange={handleFileChange} className="hidden" />

      {tracks.length === 0 ? (
        <div className={`p-6 text-center rounded-lg border ${error ? "border-[#fc3c44]" : "border-dashed border-white/[0.12]"} bg-white/[0.02]`}>
          <p className="text-[13px] text-white/40 mb-1">No tracks added yet</p>
          <p className="text-[11px] text-white/30">Add at least 2 tracks for an album</p>
        </div>
      ) : (
        <div className={`rounded-lg overflow-hidden border ${error ? "border-[#fc3c44]" : "border-white/[0.08]"} bg-white/[0.02]`}>
          {tracks.map((track, idx) => (
            <div key={track.id} className={`flex items-center gap-2.5 px-3 py-2.5 ${idx !== tracks.length - 1 ? "border-b border-white/[0.04]" : ""}`}>
              <div className="flex flex-col gap-0.5 shrink-0">
                <button type="button" onClick={() => handleMove(idx, "up")} disabled={idx === 0} aria-label="Move up" className="w-4 h-3 flex items-center justify-center text-white/30 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
                </button>
                <button type="button" onClick={() => handleMove(idx, "down")} disabled={idx === tracks.length - 1} aria-label="Move down" className="w-4 h-3 flex items-center justify-center text-white/30 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </button>
              </div>
              <span className="text-[12px] text-white/40 w-5 tabular-nums shrink-0">{idx + 1}.</span>
              <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded font-medium shrink-0 ${track.type === "existing" ? "bg-[#1D9E75]/15 text-[#4ECCA3]" : "bg-[#6c63ff]/15 text-[#9d6dff]"}`}>
                {track.type === "existing" ? "single" : "new"}
              </span>
              <div className="flex-1 min-w-0">
                {track.type === "new" ? (
                  <input type="text" value={track.title} onChange={(e) => handleTitleChange(idx, e.target.value)} placeholder="Track title" className="w-full bg-transparent text-white text-[13px] outline-none focus:bg-white/[0.04] rounded px-1 py-0.5 -mx-1" />
                ) : (
                  <span className="text-white text-[13px] truncate block">{track.title}</span>
                )}
                {track.type === "new" && (
                  <p className="text-[10px] text-white/30 truncate">{track.file?.name} · {formatBytes(track.file?.size || 0)}</p>
                )}
              </div>
              {track.type === "existing" && <span className="text-[11px] text-white/40 tabular-nums shrink-0">{formatDuration(track.duration)}</span>}
              <button type="button" onClick={() => handleRemove(idx)} aria-label="Remove track" className="w-7 h-7 flex items-center justify-center rounded text-[rgba(255,80,110,0.6)] hover:text-[rgba(255,80,110,1)] hover:bg-[rgba(255,80,110,0.08)] transition-colors shrink-0">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-[10px] text-white/30 mt-1.5">Use ↑↓ to reorder · Min 2 tracks</p>
      {error && <p className="text-[11px] text-[#fc3c44] mt-1.5">{error}</p>}

      <PickSingleModal isOpen={showPickModal} onClose={() => setShowPickModal(false)} onPick={handlePicked} excludeIds={usedTrackIds} />
    </div>
  );
}
