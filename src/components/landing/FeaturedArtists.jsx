import { Link } from "react-router-dom";
import h1 from "../../assets/art1.jpg";
import h2 from "../../assets/art2.jpg";
import h3 from "../../assets/art3.jpg";
import h4 from "../../assets/art4.jpg";
import h5 from "../../assets/art5.jpg";
import h6 from "../../assets/art6.jpg";
import h7 from "../../assets/art7.jpg";
import h8 from "../../assets/art8.jpg";
import h9 from "../../assets/art9.jpg";
import h10 from "../../assets/art10.jpg";
import h11 from "../../assets/art11.jpg";
import h12 from "../../assets/art12.jpg";

const artists = [
  {
    img: h1,
    name: "Old World Vultures",
    genre: "Indie Rock",
    slug: "old-world-vultures",
  },
  { img: h2, name: "Velvet Crows", genre: "Alternative", slug: "velvet-crows" },
  { img: h3, name: "Crystal Mall", genre: "Electronic", slug: "crystal-mall" },
  { img: h4, name: "Static Era", genre: "Post-Rock", slug: "static-era" },
  {
    img: h5,
    name: "Bangkok Phantom",
    genre: "Synthwave",
    slug: "bangkok-phantom",
  },
  { img: h6, name: "Mira Sol", genre: "Jazz", slug: "mira-sol" },
  {
    img: h7,
    name: "Old World Vultures",
    genre: "Indie Rock",
    slug: "old-world-vultures",
  },
  { img: h8, name: "Velvet Crows", genre: "Alternative", slug: "velvet-crows" },
  { img: h9, name: "Crystal Mall", genre: "Electronic", slug: "crystal-mall" },
  { img: h10, name: "Static Era", genre: "Post-Rock", slug: "static-era" },
  {
    img: h11,
    name: "Bangkok Phantom",
    genre: "Synthwave",
    slug: "bangkok-phantom",
  },
  { img: h12, name: "Mira Sol", genre: "Jazz", slug: "mira-sol" },
  {
    img: h1,
    name: "Old World Vultures",
    genre: "Indie Rock",
    slug: "old-world-vultures",
  },
  { img: h2, name: "Velvet Crows", genre: "Alternative", slug: "velvet-crows" },
  { img: h3, name: "Crystal Mall", genre: "Electronic", slug: "crystal-mall" },
  { img: h4, name: "Static Era", genre: "Post-Rock", slug: "static-era" },
  {
    img: h5,
    name: "Bangkok Phantom",
    genre: "Synthwave",
    slug: "bangkok-phantom",
  },
  { img: h6, name: "Mira Sol", genre: "Jazz", slug: "mira-sol" },
];

function ArtistRow({ hidden = false }) {
  return (
    <div
      className="flex shrink-0 animate-[marquee_40s_linear_infinite] flex-row items-center gap-6 pr-6"
      aria-hidden={hidden}
    >
      {artists.map((artist, i) => (
        <Link
          key={`${artist.slug}-${i}-${hidden}`}
          to={`/artist/${artist.slug}`}
          className="flex shrink-0 flex-col items-center gap-3 no-underline"
        >
          <div className="h-20 w-20 rounded-full ring-2 ring-white/10 transition-all duration-300 hover:scale-105 hover:ring-accent">
            <div className="h-full w-full rounded-full overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={artist.img}
                alt={hidden ? "" : artist.name}
              />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-white">{artist.name}</p>
            <p className="text-xs text-white/40">{artist.genre}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function FeaturedArtists() {
  return (
    <section className="my-12 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="mb-8 flex items-baseline gap-4 px-[5%] after:h-px after:flex-1 after:bg-linear-to-r after:from-white/15 after:to-transparent after:content-[''] md:px-[10%]">
        <h2 className="text-[20px] font-extrabold uppercase text-white md:text-[28px]">
          Discover Artists
        </h2>
      </div>

      <div className="p-1 flex overflow-hidden hover:[&>div]:[animation-play-state:paused]">
        <ArtistRow />
        <ArtistRow hidden />
      </div>
    </section>
  );
}
