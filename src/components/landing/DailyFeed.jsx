import mainCover from "../../assets/landing-page/0043841685_0.jpg";
import articleOne from "../../assets/landing-page/0044010976_0.jpg";
import articleTwo from "../../assets/landing-page/0044247710_0.jpg";

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
    <section className="mx-[10%] mb-8 mt-24 overflow-hidden rounded-lg border border-[#d1cfcf] bg-[#E7F2EF] shadow-[0_1px_3px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="border-b border-slate-200 px-8 pb-4 pt-6">
        <h2 className="font-['Montserrat',sans-serif] text-[28px] font-bold leading-tight tracking-normal text-slate-900">
          Audtlist Daily
        </h2>
      </div>

      <div className="flex flex-row">
        <article className="min-w-0 flex-[3]">
          <img
            className="block aspect-[16/10] w-full object-cover"
            src={mainCover}
            alt="Featured article cover"
          />
          <div className="px-8 py-6">
            <h2 className="mb-2 w-fit text-[21px] font-bold leading-tight text-slate-900">
              <a
                className="text-slate-900 no-underline transition-colors duration-150 hover:text-slate-500 hover:underline"
                href="#"
              >
                Music Daily (Main)
              </a>
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
            <article className="border-b border-slate-200 last:border-b-0" key={article.title}>
              <img
                className="block aspect-video w-full object-cover"
                src={article.img}
                alt={article.title}
              />
              <h3 className="px-4 pt-3 text-base font-bold text-slate-900">
                {article.title}
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
