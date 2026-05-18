import { useRef, useState } from "react";
import albumCover from "../assets/album-cover-1.jpg";
import audioSrc from "../assets/audio.mp3";
import coverPoster from "../assets/cover1.jpg";
import trackCover from "../assets/cover3.png";
import nowPlayingImg from "../assets/radio1.jpg";

const tracks = [
  {
    img: trackCover,
    name: "Name of song",
    desc: "Artist - description",
  },
  {
    img: albumCover,
    name: "Name of song",
    desc: "Artist - description",
  },
];

function Radio() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayback = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio.play();
    setIsPlaying(true);
  };

  const updateProgress = () => {
    const audio = audioRef.current;

    if (!audio?.duration) return;

    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const seekAudio = (event) => {
    const audio = audioRef.current;

    if (!audio?.duration) return;

    const { left, width } = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - left;
    audio.currentTime = (clickX / width) * audio.duration;
  };

  return (
    <>
      <section className="mx-[10%] mb-6 flex flex-row overflow-hidden rounded-lg border border-slate-200 bg-[#E7F2EF] shadow-[0_1px_3px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="min-w-0 flex-[2]">
          <h2 className="px-4 pb-3 pt-6 font-['Montserrat',sans-serif] text-[28px] font-bold text-slate-900">
            Audtlist Radio
          </h2>
          <img
            className="block aspect-video w-full object-cover"
            src={coverPoster}
            alt="Nightmares show poster"
          />
          <p className="px-4 py-3 font-['Montserrat',sans-serif] text-sm font-semibold uppercase tracking-[0.04em] text-slate-500">
            The Nightmares Show
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-3 border-x border-slate-200 p-8">
          <img
            className="block aspect-square w-full rounded-lg object-cover shadow-[0_1px_3px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.04)]"
            src={nowPlayingImg}
            alt="Now playing"
          />
          <p className="max-w-[28ch] text-sm leading-[1.7] text-slate-500">
            Name of song and description - now playing on Audtlist Radio
          </p>
          <audio
            ref={audioRef}
            src={audioSrc}
            onTimeUpdate={updateProgress}
            onEnded={() => setIsPlaying(false)}
          />
          <button
            className="flex cursor-pointer justify-center border-0 bg-transparent py-2"
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? "Pause radio" : "Play radio"}
          >
            <svg
              className="cursor-pointer fill-[#6c63ff] drop-shadow-[0_2px_8px_rgba(108,99,255,0.3)] transition-all duration-200 hover:scale-110 hover:drop-shadow-[0_4px_12px_rgba(108,99,255,0.5)]"
              xmlns="http://www.w3.org/2000/svg"
              height="48px"
              viewBox="0 -960 960 960"
              width="48px"
              fill="#000000"
            >
              {isPlaying ? (
                <path d="M370-320h60v-320h-60v320Zm160 0h60v-320h-60v320ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Z" />
              ) : (
                <path d="m383-310 267-170-267-170v340Zm97 230q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" />
              )}
            </svg>
          </button>
        </div>

        <div className="min-w-0 flex-1 px-6 py-8 font-['TikTok_Sans','Noto_Sans_Thai',sans-serif]">
          <h2 className="mb-3 font-['Montserrat',sans-serif] text-[28px] font-bold leading-tight text-slate-900">
            Tracklist
          </h2>
          <p className="mb-6 max-w-[40ch] text-sm leading-[1.7] text-slate-500">
            Discover a new way to experience music with AudioList Radio. Enjoy
            carefully curated playlists designed for every mood whether you're
            relaxing, working, or on the move.
          </p>

          <div className="flex flex-col gap-0">
            {tracks.map((track, i) => (
              <div
                className="flex cursor-pointer flex-row items-center gap-4 rounded-lg border-b border-slate-200 px-2 py-3 transition-colors duration-150 hover:bg-slate-50"
                key={i}
              >
                <img
                  className="h-14 w-14 shrink-0 rounded-lg object-cover shadow-[0_1px_3px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.04)]"
                  src={track.img}
                  alt="Track cover"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold leading-tight text-slate-900">
                    {track.name}
                  </p>
                  <p className="text-xs text-slate-500">{track.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-[10%] mb-6 flex h-20 rounded-b-lg bg-[#0a0a1a] px-[5%]">
        <button
          className="my-[15px] h-5 w-[90%] cursor-pointer overflow-hidden rounded-[10px] border-0 bg-slate-600 p-0"
          type="button"
          onClick={seekAudio}
          aria-label="Seek radio"
        >
          <span
            className="block h-full rounded-[10px] bg-white transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          ></span>
        </button>
      </div>
    </>
  );
}

export default Radio;
