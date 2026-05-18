import mainCover from "../assets/0043841685_0.jpg";
import articleOne from "../assets/0044010976_0.jpg";
import articleTwo from "../assets/0044247710_0.jpg";

const sideArticles = [
  {
    img: articleOne,
    title: "Music Daily1 (Title)",
    text: "The global music scene continues to grow as new artists and fresh sounds gain popularity. Streaming platforms are helping listeners discover a wider variety of genres, from indie and pop to hip-hop and electronic music.",
  },
  {
    img: articleTwo,
    title: "Music Daily2 (Title)",
    text: "The global music scene continues to grow as new artists and fresh sounds gain popularity. Streaming platforms are helping listeners discover a wider variety of genres, from indie and pop to hip-hop and electronic music.",
  },
];

export default function DailyFeed() {
  return (
    <section className="daily-feed">
      <div className="head-txt">
        <h2>Audtlist Daily</h2>
      </div>

      <div className="feed">
        <article className="left-feed">
          <img src={mainCover} alt="Featured article cover" />
          <div className="left-feed-txt">
            <h2>
              <a href="#">Music Daily (Main)</a>
            </h2>
            <h3>5 April 2026</h3>
            <p>
              Many artists are now experimenting with unique styles and
              collaborating across cultures, creating music that connects people
              around the world. As technology evolves, the way we create and
              enjoy music keeps changing, making the industry more exciting than
              ever.
            </p>
          </div>
        </article>

        <div className="right-feed">
          {sideArticles.map((article) => (
            <article className="pic" key={article.title}>
              <img src={article.img} alt={article.title} />
              <h3>{article.title}</h3>
              <p>{article.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
