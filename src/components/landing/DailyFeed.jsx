import { Link } from "react-router-dom";
import mainCover from "../../assets/landing-page/0043841685_0.jpg";
import articleOne from "../../assets/landing-page/0044010976_0.jpg";
import articleTwo from "../../assets/landing-page/0044247710_0.jpg";

const sideArticles = [
  {
    img: articleOne,
    to: "/article2",
    title: "Après la Révolution: The Sound of the '70s French Underground",
    text: "The global music scene continues to grow as new artists and fresh sounds gain popularity. Streaming platforms are helping listeners discover a wider variety of genres, from indie and pop to hip-hop and electronic music.",
  },
  {
    img: articleTwo,
    to: "/article3",
    title: "Nate Garrett on the Trials and Tribulations Behind Spirit Adrift's Final LP",
    text: "The global music scene continues to grow as new artists and fresh sounds gain popularity. Streaming platforms are helping listeners discover a wider variety of genres, from indie and pop to hip-hop and electronic music.",
  },
];

export default function DailyFeed() {
  return (
    <section className="mx-[5%] mb-8 mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#141420] shadow-[0_8px_32px_rgba(0,0,0,0.4)] md:mx-[10%]">
      <div className="border-b border-white/10 px-8 pb-4 pt-6">
        <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[20px] font-bold leading-tight text-white md:text-[28px]">
          Audtlist Daily
        </h2>
      </div>

      <div className="flex flex-col md:flex-row">
        <article className="min-w-0 flex-[3]">
          <Link to="/article1" aria-label="Open The Hotlist, Spring 2026">
            <img
              className="block aspect-[16/10] w-full cursor-pointer object-cover"
              src={mainCover}
              alt="Featured article cover"
            />
          </Link>
          <div className="px-8 py-6">
            <h2 className="mb-2 w-fit text-[21px] font-bold leading-tight">
              <Link
                className="text-white no-underline transition-colors duration-150 hover:text-white/60"
                to="/article1"
              >
                The Hotlist, Spring 2026
              </Link>
            </h2>
            <h3 className="mb-3 font-['Plus_Jakarta_Sans',sans-serif] text-sm font-medium tracking-[0.04em] text-white/40">
              5 April 2026
            </h3>
            <p className="max-w-[60ch] text-base leading-[1.7] text-white/60">
              Many artists are now experimenting with unique styles and
              collaborating across cultures, creating music that connects people
              around the world. As technology evolves, the way we create and
              enjoy music keeps changing, making the industry more exciting than
              ever.
            </p>
          </div>
        </article>

        <div className="min-w-0 flex-[1.5] border-t border-white/10 md:ml-4 md:border-l md:border-t-0">
          {sideArticles.map((article) => (
            <article
              className="border-b border-white/10 last:border-b-0"
              key={article.title}
            >
              <Link to={article.to} aria-label={`Open ${article.title}`}>
                <img
                  className="block aspect-video w-full cursor-pointer object-cover"
                  src={article.img}
                  alt={article.title}
                />
              </Link>
              <h3 className="px-4 pt-3 text-base font-bold">
                <Link
                  className="text-white no-underline transition-colors duration-150 hover:text-white/60"
                  to={article.to}
                >
                  {article.title}
                </Link>
              </h3>
              <p className="px-4 py-2 text-sm leading-normal text-white/40">
                {article.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
