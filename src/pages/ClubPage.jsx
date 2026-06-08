import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";
import Nav from "../components/common/Nav";
import headclub from "../assets/landing-page/headclub.png";
import club1 from "../assets/landing-page/clubdjjoe.png";
import club2 from "../assets/landing-page/clubsn2.jpg";
import club3 from "../assets/landing-page/clubg3.png";
import club4 from "../assets/landing-page/clubptri.png";

const clubs = [
  {
    id: 1,
    img: club1,
    tag: "Audtlist Club",
    title: "DJ Joe Buddha Club",
    desc: "A club built for people who live for underground sounds, dusty samples, distorted basslines, and music that exists far away from the mainstream. This is a space for crate diggers, vinyl collectors, beat lovers, and listeners who believe the best music is often the rawest and most imperfect.\n\nInside the club, members share hidden gems, experimental hip-hop, rare mixes, underground electronic sounds, and tracks filled with texture, attitude, and late-night energy. Every song here feels like discovering something secret music made not for charts, but for people who truly listen.",
    tagline: "No trends. No algorithms. Just pure sound and real music culture.",
    accent: "#fc3c44",
  },
  {
    id: 2,
    img: club2,
    tag: "Audtlist Club",
    title: "Snake Refill Club T-POP",
    desc: "A colorful little club for people who fall in love with catchy melodies, dreamy synths, emotional pop lyrics, and the chaos of modern indie pop culture. Built for listeners who sing heartbreak songs in their bedrooms, replay the same song all night, and find comfort inside glittery sounds and dramatic feelings.\n\nMembers share indie pop, bedroom pop, hyperpop, soft-girl anthems, and addictive tracks that feel sweet, emotional, playful, and impossible not to dance to. Every playlist inside this club carries a mix of vulnerability, fun, and late-night energy that turns sadness into something beautiful.",
    tagline: "For people with loud headphones, soft hearts, and too many favorite songs.",
    accent: "#9d6dff",
  },
  {
    id: 3,
    img: club3,
    tag: "Audtlist Club",
    title: "Ghost Stories & Metal Music Club",
    desc: "A late-night club for people who enjoy ghost stories, strange internet mysteries, unsettling ambience, and music that sounds beautiful in the dark. This space is made for listeners who feel strangely comforted by silence, static noise, eerie melodies, and the feeling of walking alone at midnight.\n\nInside the club, members share horror-inspired playlists, dark ambient music, haunted soundscapes, lo-fi for sleepless nights, and experimental tracks that blur the line between fear and comfort. Every sound here feels cinematic, emotional, and slightly cursed in the best possible way.",
    tagline: "Turn the lights off, put your headphones on, and let the music haunt you for a while.",
    accent: "#00d9ff",
  },
  {
    id: 4,
    img: club4,
    tag: "Audtlist Club",
    title: "Urban Luk Thung & Molam Club",
    desc: "A club for city people who still carry the sound of home inside their headphones. Built for listeners who grew up with luk thung on the radio, molam at temple fairs, long bus rides back to their hometown, and songs that somehow understand real life better than anyone else.\n\nMembers share classic luk thung hits, modern indie molam, emotional ballads, isaan grooves, and warm nostalgic tracks filled with storytelling, heartbreak, celebration, and hometown spirit. From traditional khaen melodies to modern folk-inspired sounds, this club is where old memories and new generations meet through music.",
    tagline: "No matter where you come from, if your heart still moves with the rhythm of luk thung and molam — you belong here.",
    accent: "#ffd700",
  },
];

export default function ClubPage() {
  return (
    <div className="min-h-screen bg-[#03030f] font-['Plus_Jakarta_Sans',sans-serif] text-white">
      <Nav />
      {/* Page header */}
      <div className="relative overflow-hidden border-b border-white/8 px-[5%] py-10 md:px-[10%] md:py-16"
        style={{ background: "linear-gradient(135deg, #0d0d2e 0%, #1a0a2e 50%, #0a0a1a 100%)" }}
      >
        {/* Glow blobs */}
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full opacity-30"
          style={{ background: "#9d6dff", filter: "blur(80px)" }} />
        <div className="pointer-events-none absolute right-[20%] top-4 h-48 w-48 rounded-full opacity-20"
          style={{ background: "#fc3c44", filter: "blur(60px)" }} />

        {/* Head decoration */}
        <img
          src={headclub}
          alt=""
          className="pointer-events-none absolute right-0 top-1/2 h-48 w-48 -translate-y-1/2 object-contain opacity-30 md:right-[13%] md:h-192 md:w-3xl md:opacity-100"
        />

        <div className="relative z-10">
          <p className="mb-3 font-['Plus_Jakarta_Sans',sans-serif] text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">
            Audtlist
          </p>
          <h1 className="mb-4 font-['Plus_Jakarta_Sans',sans-serif] text-[48px] font-extrabold tracking-tight"
            style={{ background: "linear-gradient(90deg, #fff 0%, #c8b4ff 60%, #fc3c44 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Community
          </h1>
          <p className="max-w-lg font-['Plus_Jakarta_Sans',sans-serif] text-[15px] font-normal leading-[1.8] text-white/60">
            Subscribe-to-own music discovery, curated by trusted experts and
            rooted in community. A new way to collect music that matters.
          </p>
        </div>
      </div>

      {/* Club list */}
      <div className="flex flex-col gap-0">
        {clubs.map((club, i) => {
          const reversed = i % 2 !== 0;
          return (
            <div
              key={club.id}
              className={`mx-[5%] my-5 flex flex-col overflow-hidden rounded-2xl border border-white/8 shadow-[0_4px_32px_rgba(0,0,0,0.4)] md:mx-[7%] md:my-7 md:flex-row ${reversed && "md:flex-row-reverse"}`}
            >
              {/* Image */}
              <div className="relative h-56 w-full shrink-0 overflow-hidden flex items-center justify-center md:h-auto md:w-[44%]"
                style={{ background: club.accent + "18" }}
              >
                <img
                  src={club.img}
                  alt={club.title}
                  className="w-full h-full object-contain brightness-110 saturate-[1.2]"
                />
              </div>

              {/* Text */}
              <div className="flex flex-1 flex-col justify-center gap-4 bg-[#0c0c1e] px-6 py-8 md:px-12 md:py-10">
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[24px] font-extrabold leading-[1.25] tracking-tight text-white">
                  {club.title}
                </h2>

                <div className="flex flex-col gap-3">
                  {club.desc.split("\n\n").map((para, j) => (
                    <p
                      key={j}
                      className="font-['Plus_Jakarta_Sans',sans-serif] text-[13.5px] font-normal leading-[1.85] text-white/45"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[12.5px] font-medium italic leading-relaxed text-white/30">
                  — {club.tagline}
                </p>

                <span
                  className="mt-1 w-fit cursor-default rounded-full px-6 py-2.5 font-['Plus_Jakarta_Sans',sans-serif] text-[13px] font-bold tracking-wide text-white cursor-pointer"
                  style={{ background: "#fc3c44" }}
                >
                  Explore club →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
