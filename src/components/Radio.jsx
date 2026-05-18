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
      <section className="radio">
        <div className="banner">
          <h2>Audtlist Radio</h2>
          <img src={coverPoster} alt="Nightmares show poster" />
          <p>The Nightmares Show</p>
        </div>

        <div className="banner-2">
          <img src={nowPlayingImg} alt="Now playing" />
          <p>Name of song and description - now playing on Audtlist Radio</p>
          <audio
            ref={audioRef}
            src={audioSrc}
            onTimeUpdate={updateProgress}
            onEnded={() => setIsPlaying(false)}
          />
          <button
            className="play-icon"
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? "Pause radio" : "Play radio"}
          >
            <svg
              className="play-button"
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

        <div className="track-list">
          <h2>Tracklist</h2>
          <p>
            Discover a new way to experience music with AudioList Radio. Enjoy
            carefully curated playlists designed for every mood whether you're
            relaxing, working, or on the move.
          </p>

          <div className="track-img">
            {tracks.map((track, i) => (
              <div className="track" key={i}>
                <img src={track.img} alt="Track cover" />
                <div className="track1-txt">
                  <p>{track.name}</p>
                  <p>{track.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="progress-box">
        <button
          className="progress-container"
          type="button"
          onClick={seekAudio}
          aria-label="Seek radio"
        >
          <span className="progress" style={{ width: `${progress}%` }}></span>
        </button>
      </div>
    </>
  );
}

export default Radio;
