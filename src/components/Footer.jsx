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
      <section className="genre-container">
        <ul className="genre-box">
          {[...genres, ...genres.slice(5)].map((genre, index) => (
            <li key={`${genre}-${index}`}>
              <a href="#">{genre}</a>
            </li>
          ))}
        </ul>

        <div className="category-section">
          {categories.map((category) => (
            <div className="cat-card" key={category.title}>
              <img src={category.img} alt={category.title} />
              <span>{category.title}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="bottom-nav">
        <div className="links">
          <a href="#">About us</a>
          <a href="#">Help</a>
          <a href="#">Terms and conditions</a>
        </div>
        <div className="player-bar"></div>
      </footer>
    </>
  );
}
