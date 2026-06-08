import { Link } from "react-router-dom";
import { genres } from "../../shop/data/mockDb/genres";
import cassetteImg from "../../assets/landing-page/cas3.avif";
import vinylImg from "../../assets/landing-page/vin.avif";
import cdsImg from "../../assets/landing-page/cd.avif";
import tshirtImg from "../../assets/landing-page/T.webp";

const categories = [
  { title: "Cassettes", img: cassetteImg, to: "/shop?category=cassette" },
  { title: "Vinyl",     img: vinylImg,    to: "/shop?category=vinyl" },
  { title: "CDs",       img: cdsImg,      to: "/shop?category=cd" },
  { title: "T-Shirts",  img: tshirtImg,   to: "/shop?category=tshirt" },
];

export default function GenreSection() {
  return (
    <section className="py-12 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="mb-6 flex items-baseline gap-4 px-[5%] after:h-px after:flex-1 after:bg-linear-to-r after:from-white/15 after:to-transparent after:content-[''] md:px-[10%]">
        <h2 className="text-[20px] font-extrabold uppercase text-white md:text-[28px]">
          Browse by Genre
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-2 px-[5%] md:px-[10%]">
        {genres.map((g) => (
          <Link
            key={g._id}
            to={`/discover/${g.slug}`}
            className="rounded-full bg-white/[0.07] px-6 py-2.5 text-[15px] font-medium text-white/55 no-underline transition-all hover:bg-white/10 hover:text-white/85"
          >
            {g.name.toLowerCase()}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 px-[5%] md:grid-cols-4 md:px-[20%]">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            to={cat.to}
            className="group relative overflow-hidden rounded-xl no-underline"
          >
            <img
              src={cat.img}
              alt={cat.title}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
            <p className="absolute bottom-3 left-4 text-[15px] font-bold text-white">
              {cat.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
