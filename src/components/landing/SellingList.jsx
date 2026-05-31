import t1 from "../../assets/landing-page/t1.jpg";
import t2 from "../../assets/landing-page/t2.png";
import album1 from "../../assets/landing-page/album-cover-1.jpg";
import album2 from "../../assets/landing-page/album-cover-2.jpg";
import album3 from "../../assets/landing-page/album-cover-3.jpg";
import album4 from "../../assets/landing-page/album-cover-4.jpg";
import album5 from "../../assets/landing-page/album-cover-5.jpg";
import album6 from "../../assets/landing-page/album-cover-6.jpg";
import album7 from "../../assets/landing-page/album-cover-7.jpg";
import album8 from "../../assets/landing-page/album-cover-8.jpg";

const sellingItems = [
  { img: t1, price: "$4", description: "Midnight Echo" },
  { img: t2, price: "$8", description: "Lost Signals" },
  { img: album1, price: "$10", description: "Neon Dreams" },
  { img: album2, price: "$17", description: "Silent Waves" },
  { img: album3, price: "$23", description: "Broken Frequency" },
  { img: album4, price: "$7", description: "Soft Chaos" },
  { img: album5, price: "$23", description: "Crystal Nights" },
  { img: album6, price: "$9", description: "Blue Mirage" },
  { img: album7, price: "$3", description: "Hidden Tones" },
  { img: album8, price: "$12", description: "Final Sunset" },
];

function ItemRow({ hidden = false }) {
  return (
    <div
      className="flex shrink-0 animate-[marquee_30s_linear_infinite] flex-row items-center gap-3 pr-3"
      aria-hidden={hidden}
    >
      {sellingItems.map((item) => (
        <article
          className="flex w-40 shrink-0 cursor-pointer flex-col items-start rounded-xl border border-white/10 bg-[#141420] p-2 text-xs transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
          key={`${item.description}-${hidden}`}
        >
          <img
            className="aspect-square w-full rounded-lg object-cover"
            src={item.img}
            alt={hidden ? "" : item.description}
          />
          <p className="mt-2 w-full overflow-hidden text-ellipsis whitespace-nowrap px-1 font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold leading-tight text-white">
            {item.price}
          </p>
          <p className="mt-1 w-full overflow-hidden text-ellipsis whitespace-nowrap px-1 text-xs leading-tight text-white/40">
            {item.description}
          </p>
        </article>
      ))}
    </div>
  );
}

export default function SellingList() {
  return (
    <section>
      <div className="flex items-baseline gap-4 bg-[#03030f] px-[10%] pb-4 pt-8 after:h-px after:flex-1 after:bg-linear-to-r after:from-white/15 after:to-transparent after:content-['']">
        <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[28px] font-extrabold uppercase text-white">
          Selling right now
        </h2>
      </div>

      <div className="flex h-[300px] overflow-hidden bg-[#03030f] pb-6 hover:[&>div]:[animation-play-state:paused]">
        <ItemRow />
        <ItemRow hidden />
      </div>
    </section>
  );
}
