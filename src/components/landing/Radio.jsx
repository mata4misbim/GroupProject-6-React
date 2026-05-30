import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getRandomLive } from "../../shop/data/liveHelpers";
import albumCover from "../../assets/landing-page/album-cover-1.jpg";
import audioSrc from "../../assets/audio.mp3";
import coverPoster from "../../assets/landing-page/cover1.jpg";
import trackCover from "../../assets/landing-page/cover3.png";
import nowPlayingImg from "../../assets/landing-page/radio1.jpg";

const tracks = [
  {
    img: trackCover,
    name: "Crimson Dawn",
    artist: "Old World Vultures",
    desc: "Indie rock single",
    duration: "4:05",
    src: audioSrc,
  },
  {
    img: albumCover,
    name: "Midnight Echoes",
    artist: "Old World Vultures",
    desc: "Late-night album cut",
    duration: "5:12",
    src: audioSrc,
  },
  {
    img: nowPlayingImg,
    name: "Shadow of the Vulture",
    artist: "Old World Vultures",
    desc: "Live radio preview",
    duration: "4:45",
    src: audioSrc,
  },
];

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
};

const currentLive = getRandomLive();

function Radio() {
  const audioRef = useRef(null);
  const shouldResumePlaybackRef = useRef(false);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  const activeTrack = tracks[activeTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  const playAudio = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    audio.load();

    if (shouldResumePlaybackRef.current) {
      playAudio();
      shouldResumePlaybackRef.current = false;
      return;
    }

    setIsPlaying(false);
  }, [activeTrackIndex]);

  const togglePlayback = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    playAudio();
  };

  const updateProgress = () => {
    const audio = audioRef.current;

    if (!audio?.duration) return;

    setCurrentTime(audio.currentTime);
    setDuration(audio.duration);
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const updateDuration = () => {
    const audio = audioRef.current;

    if (!audio?.duration) return;

    setDuration(audio.duration);
  };

  const seekAudio = (event) => {
    const audio = audioRef.current;

    if (!audio?.duration) return;

    const { left, width } = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - left;
    audio.currentTime = Math.min(Math.max(clickX / width, 0), 1) * audio.duration;
  };

  const selectTrack = (trackIndex) => {
    shouldResumePlaybackRef.current = false;
    setActiveTrackIndex(trackIndex);
  };

  const playPrevious = () => {
    shouldResumePlaybackRef.current = isPlaying;
    setActiveTrackIndex((currentIndex) =>
      currentIndex === 0 ? tracks.length - 1 : currentIndex - 1,
    );
  };

  const playNext = () => {
    shouldResumePlaybackRef.current = isPlaying;
    setActiveTrackIndex((currentIndex) => (currentIndex + 1) % tracks.length);
  };

  return (
    <>
      <section className="mx-[10%] mb-6 grid grid-cols-[1.35fr_1fr_1.15fr] overflow-hidden rounded-2xl bg-[#141420] font-['Plus_Jakarta_Sans',sans-serif] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">

        {/* Left: Live show */}
        <div className="min-w-0 border-r border-white/10">
          <h2 className="px-5 pb-3 pt-6 text-[24px] font-bold text-white">
            Audtlist Radio
          </h2>
          <Link to={currentLive ? `/live/${currentLive._id}` : "#"} className="block no-underline group/live">
            <div className="relative overflow-hidden">
              <img
                className="block aspect-video w-full object-cover transition-transform duration-500 group-hover/live:scale-105"
                src={coverPoster}
                alt="Nightmares show poster"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/live:bg-black/20" />
            </div>
            <div className="flex items-center justify-between gap-4 px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/50">
                The Nightmares Show
              </p>
              <span className="flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-white">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                Live
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Player — Apple Music style */}
        <div className="flex min-w-0 flex-col items-center gap-5 border-x border-white/10 px-8 py-8">
          <img
            className="block aspect-square w-full rounded-2xl object-cover shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            src={activeTrack.img}
            alt={`${activeTrack.name} cover`}
          />

          <div className="w-full">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-red-500">
              Now playing
            </p>
            <h3 className="mt-1 text-[20px] font-bold leading-tight text-white">
              {activeTrack.name}
            </h3>
            <p className="mt-0.5 text-sm text-white/50">
              {activeTrack.artist} — {activeTrack.desc}
            </p>
          </div>

          <audio
            ref={audioRef}
            src={activeTrack.src}
            onLoadedMetadata={updateDuration}
            onTimeUpdate={updateProgress}
            onEnded={playNext}
          />

          <div className="w-full">
            <button
              className="h-1 w-full cursor-pointer overflow-hidden rounded-full border-0 bg-white/20 p-0"
              type="button"
              onClick={seekAudio}
              aria-label="Seek radio"
            >
              <span
                className="block h-full rounded-full bg-white transition-[width] duration-100"
                style={{ width: `${progress}%` }}
              />
            </button>
            <div className="mt-1.5 flex justify-between text-[11px] font-medium text-white/40">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              className="flex h-10 w-10 cursor-pointer items-center justify-center text-white/60 transition-all duration-150 hover:text-white"
              type="button"
              onClick={playPrevious}
              aria-label="Previous track"
            >
              <svg viewBox="0 -960 960 960" width="28" height="28" fill="currentColor">
                <path d="M220-240v-480h60v480h-60Zm520 0L380-480l360-240v480Zm-60-112v-256L488-480l192 128Z" />
              </svg>
            </button>
            <button
              className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white text-[#1c1c1e] shadow-[0_4px_20px_rgba(255,255,255,0.2)] transition-all duration-200 hover:scale-105"
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Pause radio" : "Play radio"}
            >
              <svg viewBox="0 -960 960 960" width="36" height="36" fill="currentColor">
                {isPlaying ? (
                  <path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                ) : (
                  <path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                )}
              </svg>
            </button>
            <button
              className="flex h-10 w-10 cursor-pointer items-center justify-center text-white/60 transition-all duration-150 hover:text-white"
              type="button"
              onClick={playNext}
              aria-label="Next track"
            >
              <svg viewBox="0 -960 960 960" width="28" height="28" fill="currentColor">
                <path d="M680-240v-480h60v480h-60Zm-460 0v-480l360 240-360 240Zm60-112 192-128-192-128v256Z" />
              </svg>
            </button>
          </div>

          <div className="flex w-full items-center gap-3">
            <button
              className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center text-white/50 transition-colors duration-150 hover:text-white"
              type="button"
              onClick={() => setIsMuted((muted) => !muted)}
              aria-label={isMuted ? "Unmute radio" : "Mute radio"}
            >
              <svg viewBox="0 -960 960 960" width="20" height="20" fill="currentColor">
                {isMuted ? (
                  <path d="m792-56-96-96q-41 32-91 50.5T500-82v-82q35-8 66.5-21.5T625-221L480-366v126L280-440H120v-240h188L56-932l56-56L848-112l-56 56ZM820-480q0 46-10 89t-28 80l-60-60q9-26 13.5-53t4.5-56q0-83-44.5-151.5T580-729v-83q108 27 174 117t66 215ZM650-480q0-35-18.5-64.5T580-589v-92q72 24 111 80t39 121q0 21-4 41t-12 39l-64-64v-16ZM480-682 376-786l104-104v208Z" />
                ) : (
                  <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320Z" />
                )}
              </svg>
            </button>
            <input
              className="h-1 w-full cursor-pointer accent-white"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(event) => {
                setVolume(Number(event.target.value));
                setIsMuted(false);
              }}
              aria-label="Radio volume"
            />
          </div>
        </div>

        {/* Right: Tracklist */}
        <div className="min-w-0 px-6 py-8">
          <h2 className="mb-2 text-[24px] font-bold leading-tight text-white">
            Tracklist
          </h2>
          <p className="mb-6 max-w-[40ch] text-sm leading-[1.7] text-white/40">
            Tune into curated independent releases and switch between radio
            previews without leaving the station.
          </p>

          <div className="flex flex-col gap-1">
            {tracks.map((track, index) => {
              const isActive = index === activeTrackIndex;
              return (
                <button
                  className={`flex cursor-pointer flex-row items-center gap-4 rounded-xl px-3 py-3 text-left transition-all duration-150 ${
                    isActive
                      ? "bg-white/10"
                      : "hover:bg-white/5"
                  }`}
                  key={track.name}
                  type="button"
                  onClick={() => selectTrack(index)}
                  aria-current={isActive ? "true" : undefined}
                >
                  <img
                    className="h-12 w-12 shrink-0 rounded-lg object-cover"
                    src={track.img}
                    alt={`${track.name} cover`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className={`truncate text-sm font-semibold leading-tight ${isActive ? "text-red-400" : "text-white"}`}>
                      {track.name}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-white/40">
                      {track.artist} — {track.desc}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-medium text-white/30">
                    {track.duration}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </section>
    </>
  );
}

export default Radio;
