import Footer from '../components/common/Footer';
import { Link } from "react-router-dom";
import mainCover from "../assets/landing-page/0043841685_0.jpg";

export default function Article1Page() {
  return (
<>
    <main className="min-h-screen bg-[#03030f] px-[10%] py-16 text-white">
      <article className="mx-auto max-w-[980px] overflow-hidden rounded-lg border border-[#d1cfcf] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.04)]">
        <img
          className="block aspect-[16/9] w-full object-cover"
          src={mainCover}
          alt="The Hotlist, Spring 2026"
        />
        <div className="px-10 py-9">
          <p className="mb-3 font-['Plus_Jakarta_Sans',sans-serif] text-sm font-semibold uppercase tracking-[0.12em] text-white/50">
            5 April 2026
          </p>
          <h1 className="mb-6 text-[42px] font-bold leading-tight text-white">
            The Hotlist, Spring 2026
          </h1>
          <p className="mb-5 text-[18px] leading-[1.7] text-slate-600">
            This season's essential listening is full of bright left turns:
            guitar bands stretching into electronics, producers bringing warmth
            back to club music, and independent artists finding new ways to
            connect with listeners.
          </p>
          <p className="mb-5 text-base leading-[1.8] text-slate-600">
            Across the scene, collaboration is the strongest signal. Artists are
            trading files across cities, folding local traditions into global
            sounds, and releasing records that feel both handmade and
            future-facing.
          </p>
          <p className="text-base leading-[1.8] text-slate-600">
            The result is a spring list built for discovery. Put these records
            on while the day changes light, and let the new favorites find you.
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
