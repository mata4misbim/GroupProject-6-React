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
    <div className="item-list" aria-hidden={hidden}>
      {sellingItems.map((item) => (
        <article className="card" key={`${item.description}-${hidden}`}>
          <img src={item.img} alt={hidden ? "" : item.description} />
          <p className="price">{item.price}</p>
          <p className="description">{item.description}</p>
        </article>
      ))}
    </div>
  );
}

export default function SellingList() {
  return (
    <section>
      <div className="txt-on-top">
        <h2>Selling right now</h2>
      </div>

      <div className="selling-list">
        <ItemRow />
        <ItemRow hidden />
      </div>
    </section>
  );
}
