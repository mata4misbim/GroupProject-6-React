import t1 from "../assets/t1.jpg";
import t2 from "../assets/t2.png";
import album1 from "../assets/album-cover-1.jpg";
import album2 from "../assets/album-cover-2.jpg";
import album3 from "../assets/album-cover-3.jpg";
import album4 from "../assets/album-cover-4.jpg";
import album5 from "../assets/album-cover-5.jpg";
import album6 from "../assets/album-cover-6.jpg";
import album7 from "../assets/album-cover-7.jpg";
import album8 from "../assets/album-cover-8.jpg";

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
          className="flex w-40 shrink-0 cursor-pointer flex-col items-start rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1.5 hover:border-slate-400 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.06)]"
          key={`${item.description}-${hidden}`}
        >
          <img
            className="aspect-square w-full rounded-sm object-cover shadow-[0_1px_3px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.04)]"
            src={item.img}
            alt={hidden ? "" : item.description}
          />
          <p className="mt-2 w-full overflow-hidden text-ellipsis whitespace-nowrap px-1 font-['Montserrat',sans-serif] text-sm font-bold leading-tight text-slate-900">
            {item.price}
          </p>
          <p className="mt-2 w-full overflow-hidden text-ellipsis whitespace-nowrap px-1 text-xs leading-tight text-slate-500">
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
      <div className="flex items-baseline gap-4 bg-[#E7F2EF] px-[10%] pb-4 pt-8 after:h-[1.5px] after:flex-1 after:bg-linear-to-r after:from-slate-200 after:to-transparent after:content-['']">
        <h2 className="font-['Montserrat',sans-serif] text-[28px] font-extrabold uppercase text-slate-900">
          Selling right now
        </h2>
      </div>

      <div className="flex h-[300px] overflow-hidden bg-[#E7F2EF] pb-6 hover:[&>div]:[animation-play-state:paused]">
        <ItemRow />
        <ItemRow hidden />
      </div>
    </section>
  );
}
