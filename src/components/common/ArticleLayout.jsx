import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function ArticleLayout({ cover, alt, date, title, children }) {
  return (
    <>
      <main className="min-h-screen bg-[#03030f] px-4 py-8 text-white md:px-[10%] md:py-16">
        <article className="mx-auto max-w-[980px] overflow-hidden rounded-lg border border-[#d1cfcf] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.04)]">
          <img className="block aspect-video w-full object-cover" src={cover} alt={alt} />
          <div className="px-4 py-6 md:px-10 md:py-9">
            <p className="mb-3 font-['Plus_Jakarta_Sans',sans-serif] text-sm font-semibold uppercase tracking-[0.12em] text-white/50">
              {date}
            </p>
            <h1 className="mb-6 text-[26px] font-bold leading-tight text-white md:text-[42px]">
              {title}
            </h1>
            {children}
            <Link
              className="mt-8 inline-flex rounded-full bg-[#0a0a1a] px-6 py-3 font-['Plus_Jakarta_Sans',sans-serif] text-sm font-semibold text-white no-underline transition-colors hover:bg-[#4f46e5]"
              to="/"
            >
              Back to home
            </Link>
          </div>
        </article>
      </main>
      <Footer simple />
    </>
  );
}
