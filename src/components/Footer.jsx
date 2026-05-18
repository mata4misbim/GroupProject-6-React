import cassetteImg from "../assets/cas3.avif";
import vinylImg from "../assets/vin.avif";
import cdsImg from "../assets/cd.avif";
import tshirtImg from "../assets/T.webp";

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
  { title: "Cassettes", img: cassetteImg },
  { title: "Vinyl", img: vinylImg },
  { title: "CDs", img: cdsImg },
  { title: "T-Shirts", img: tshirtImg },
];

export default function Footer() {
  return (
    <>
      <section className="mx-[10%] flex flex-col overflow-hidden rounded-t-lg bg-linear-to-br from-[#1a1a40] to-[#0a0a1a] text-white">
        <ul className="flex list-none flex-row flex-wrap gap-2 px-8 pb-6 pt-8">
          {[...genres, ...genres.slice(5)].map((genre, index) => (
            <li
              className="cursor-pointer rounded-full border-[1.5px] border-white/15 px-4 py-2 text-sm font-medium tracking-[0.04em] transition-all duration-200 hover:-translate-y-px hover:border-[#6c63ff]/70 hover:bg-[#6c63ff]/35"
              key={`${genre}-${index}`}
            >
              <a className="text-white no-underline" href="#">
                {genre}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center justify-center gap-8 border-t border-white/6 p-8">
          {categories.map((category) => (
            <div
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
            </div>
          ))}
        </div>
      </section>

      <footer className="mx-[10%] flex min-h-[100px] flex-row items-start justify-between rounded-b-lg bg-[#0a0a1a] p-8 text-white">
        <div className="flex flex-col gap-2">
          <a
            className="font-['Montserrat',sans-serif] text-sm tracking-[0.04em] text-white/55 no-underline transition-colors duration-150 hover:text-white"
            href="#"
          >
            About us
          </a>
          <a
            className="font-['Montserrat',sans-serif] text-sm tracking-[0.04em] text-white/55 no-underline transition-colors duration-150 hover:text-white"
            href="#"
          >
            Help
          </a>
          <a
            className="font-['Montserrat',sans-serif] text-sm tracking-[0.04em] text-white/55 no-underline transition-colors duration-150 hover:text-white"
            href="#"
          >
            Terms and conditions
          </a>
        </div>
        <div className="flex-1"></div>
      </footer>
    </>
  );
}
