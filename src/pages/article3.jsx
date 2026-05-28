import { Link } from "react-router-dom";
import articleCover from "../assets/landing-page/0044247710_0.jpg";

export default function Article3Page() {
  return (
    <main className="min-h-screen bg-[#E7F2EF] px-[10%] py-16 text-slate-900">
      <article className="mx-auto max-w-[980px] overflow-hidden rounded-lg border border-[#d1cfcf] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.04)]">
        <img
          className="block aspect-[16/9] w-full object-cover"
          src={articleCover}
          alt="Nate Garrett on the Trials and Tribulations Behind Spirit Adrift's Final LP"
        />
        <div className="px-10 py-9">
          <p className="mb-3 font-['Montserrat',sans-serif] text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
            3 April 2026
          </p>
          <h1 className="mb-6 text-[40px] font-bold leading-tight text-slate-900">
            Nate Garrett on the Trials and Tribulations Behind Spirit Adrift's
            Final LP
          </h1>
          <p className="mb-5 text-[18px] leading-[1.7] text-slate-600">
            The final chapter of a band is rarely simple. For Nate Garrett, it
            meant sorting through years of pressure, ambition, grief, and the
            stubborn joy of heavy music.
          </p>
          <p className="mb-5 text-base leading-[1.8] text-slate-600">
            The record carries that weight without losing its momentum. Riffs
            push forward, melodies open into big horizons, and the writing keeps
            returning to what it means to end something honestly.
          </p>
          <p className="text-base leading-[1.8] text-slate-600">
            It is a farewell that sounds less like defeat than a clear-eyed bow:
            loud, generous, and deeply human.
          </p>
          <Link
            className="mt-8 inline-flex rounded-full bg-[#0a0a1a] px-6 py-3 font-['Montserrat',sans-serif] text-sm font-semibold text-white no-underline transition-colors hover:bg-[#4f46e5]"
            to="/"
          >
            Back to home
          </Link>
        </div>
      </article>
    </main>
  );
}
