import { Link } from "react-router-dom";
import mainCover from "../../assets/landing-page/0043841685_0.jpg";
import articleOne from "../../assets/landing-page/0044010976_0.jpg";
import articleTwo from "../../assets/landing-page/0044247710_0.jpg";

const sideArticles = [
  {
    img: articleOne,
    to: "/article2",
    title: "Après la Révolution: The Sound of the ’70s French Underground",
    text: "The global music scene continues to grow as new artists and fresh sounds gain popularity. Streaming platforms are helping listeners discover a wider variety of genres, from indie and pop to hip-hop and electronic music.",
  },
  {
    img: articleTwo,
    to: "/article3",
    title:
      "Nate Garrett on the Trials and Tribulations Behind Spirit Adrift’s Final LP",
    text: "The global music scene continues to grow as new artists and fresh sounds gain popularity. Streaming platforms are helping listeners discover a wider variety of genres, from indie and pop to hip-hop and electronic music.",
  },
];

export default function DailyFeed() {
  return (
    <section className="mx-[10%] mb-8 mt-24 overflow-hidden rounded-lg border border-[#d1cfcf] bg-[#E7F2EF] shadow-[0_1px_3px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="border-b border-slate-200 px-8 pb-4 pt-6">
        <h2 className="font-['Montserrat',sans-serif] text-[28px] font-bold leading-tight tracking-normal text-slate-900">
          Audtlist Daily
        </h2>
      </div>

      <div className="flex flex-row">
        <article className="min-w-0 flex-[3]">
          <Link to="/article1" aria-label="Open The Hotlist, Spring 2026">
            <img
              className="block aspect-[16/10] w-full cursor-pointer object-cover"
              src={mainCover}
              alt="Featured article cover"
            />
          </Link>
          <div className="px-8 py-6">
            <h2 className="mb-2 w-fit text-[21px] font-bold leading-tight text-slate-900">
              <Link
                className="text-slate-900 no-underline transition-colors duration-150 hover:text-slate-500 hover:underline"
                to="/article1"
              >
                The Hotlist, Spring 2026
              </Link>
            </h2>
            <h3 className="mb-3 font-['Montserrat',sans-serif] text-sm font-medium tracking-[0.04em] text-slate-500">
              5 April 2026
            </h3>
            <p className="max-w-[60ch] text-base leading-[1.7] text-slate-600">
              Many artists are now experimenting with unique styles and
              collaborating across cultures, creating music that connects people
              around the world. As technology evolves, the way we create and
              enjoy music keeps changing, making the industry more exciting than
              ever.
            </p>
          </div>
        </article>

        <div className="ml-4 min-w-0 flex-[1.5] border-l border-slate-200">
          {sideArticles.map((article) => (
            <article
              className="border-b border-slate-200 last:border-b-0"
              key={article.title}
            >
              <Link to={article.to} aria-label={`Open ${article.title}`}>
                <img
                  className="block aspect-video w-full cursor-pointer object-cover"
                  src={article.img}
                  alt={article.title}
                />
              </Link>
              <h3 className="px-4 pt-3 text-base font-bold text-slate-900">
                <Link
                  className="text-slate-900 no-underline transition-colors duration-150 hover:text-slate-500 hover:underline"
                  to={article.to}
                >
                  {article.title}
                </Link>
              </h3>
              <p className="px-4 py-2 text-sm leading-normal text-slate-500">
                {article.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
