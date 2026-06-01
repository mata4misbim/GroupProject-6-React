import Footer from '../components/common/Footer';
import Head from '../components/common/Head';
import Nav from '../components/common/Nav';
import { Link } from "react-router-dom";
import articleCover from "../assets/landing-page/0044010976_0.jpg";

export default function Article2Page() {
  return (
<>
    <Head />
    <Nav />
    <main className="min-h-screen bg-[#03030f] px-[10%] py-16 text-white">
      <article className="mx-auto max-w-[980px] overflow-hidden rounded-lg border border-[#d1cfcf] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.04)]">
        <img
          className="block aspect-[16/9] w-full object-cover"
          src={articleCover}
          alt="Apres la Revolution: The Sound of the 70s French Underground"
        />
        <div className="px-10 py-9">
          <p className="mb-3 font-['Plus_Jakarta_Sans',sans-serif] text-sm font-semibold uppercase tracking-[0.12em] text-white/50">
            4 April 2026
          </p>
          <h1 className="mb-6 text-[40px] font-bold leading-tight text-white">
            Apres la Revolution: The Sound of the 70s French Underground
          </h1>
          <p className="mb-5 text-[18px] leading-[1.7] text-slate-600">
            In the wake of cultural upheaval, a generation of French musicians
            built strange, beautiful records from jazz, folk, electronics, and
            restless studio experiments.
          </p>
          <p className="mb-5 text-base leading-[1.8] text-slate-600">
            The music still sounds alive because it refuses to sit neatly in one
            category. It drifts from smoky improvisation to tape-loop hypnosis,
            from political urgency to private dream logic.
          </p>
          <p className="text-base leading-[1.8] text-slate-600">
            Revisited today, these albums feel less like artifacts and more like
            open invitations to break the rules with care.
          </p>
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
