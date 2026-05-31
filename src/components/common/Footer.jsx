import cassetteImg from "../../assets/landing-page/cas3.avif";
import logoA from "../../assets/landing-page/logoa.png";
import vinylImg from "../../assets/landing-page/vin.avif";
import cdsImg from "../../assets/landing-page/cd.avif";
import tshirtImg from "../../assets/landing-page/T.webp";
import { Link } from "react-router-dom";

const genres = [
  "Rock",
  "Alternative",
  "Electronic",
  "Metal",
  "Pop",
  "Jazz",
  "Hip-hop / Rap",
  "Blues",
  "Classical",
  "J-pop",
  "K-pop",
  "Thai",
  "R&B",
  "Morlam",
  "EDM",
  "Anime",
  "DnB",
];

const categories = [
  { title: "Cassettes", img: cassetteImg, to: "/shop?category=cassette" },
  { title: "Vinyl", img: vinylImg, to: "/shop?category=vinyl" },
  { title: "CDs", img: cdsImg, to: "/shop?category=cd" },
  { title: "T-Shirts", img: tshirtImg, to: "/shop?category=tshirt" },
];

export default function Footer() {
  return (
    <>
      <section className="mx-0 flex flex-col overflow-hidden rounded-t-lg bg-linear-to-br from-[#1a1a40] to-[#0a0a1a] text-white">
        <ul className="flex list-none flex-row flex-wrap gap-2 px-8 pb-6 pt-8">
          {[...genres, ...genres.slice(5)].map((genre, index) => (
            <li
              className="cursor-pointer rounded-full border-[1.5px] border-white/15 px-4 py-2 text-sm font-medium tracking-[0.04em] transition-all duration-200 hover:-translate-y-px hover:border-[#6c63ff]/70 hover:bg-[#6c63ff]/35"
              key={`${genre}-${index}`}
            >
              <Link className="text-white no-underline" to="/shop">
                {genre}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center justify-center gap-8 border-t border-white/6 p-8">
          {categories.map((category) => (
            <Link
              to={category.to}
              className="relative w-[180px] cursor-pointer overflow-hidden rounded-lg text-center transition-[box-shadow,transform] duration-200 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
              key={category.title}
            >
              <img
                className="block aspect-square w-full object-cover brightness-[0.65] transition-[filter] duration-200 hover:brightness-[0.8]"
                src={category.img}
                alt={category.title}
              />
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-['Montserrat',sans-serif] text-sm font-bold uppercase tracking-[0.1em] text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
                {category.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mx-0 bg-[#0a0a1a] px-10 py-10 text-white">
        <div className="flex flex-col gap-3">
          <img src={logoA} alt="AUDTLIST" className="h-24 w-auto object-contain self-start" />
          <p className="text-white/45 text-[13px] max-w-sm leading-relaxed">
            A marketplace for independent artists. Discover, support, and own
            music directly from the people who make it.
          </p>
          <ul className="mt-2 flex flex-col gap-3">
            <li>
              <Link to="/about" className="text-white/50 hover:text-white text-[14px] no-underline transition-colors">
                About us
              </Link>
            </li>
            <li>
              <a href="#" className="text-white/50 hover:text-white text-[14px] no-underline transition-colors">
                Help
              </a>
            </li>
            <li>
              <Link to="/terms" className="text-white/50 hover:text-white text-[14px] no-underline transition-colors">
                Terms and conditions
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-white/25 text-[11px]">
            © 2026 Audtlist · Made with ♪ in Bangkok
          </p>
        </div>
      </footer>
    </>
  );
}
