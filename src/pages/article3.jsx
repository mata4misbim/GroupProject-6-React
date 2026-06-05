import cover from "../assets/landing-page/0044247710_0.jpg";
import ArticleLayout from "../components/common/ArticleLayout";

export default function Article3Page() {
  return (
    <ArticleLayout
      cover={cover}
      alt="Nate Garrett on the Trials and Tribulations Behind Spirit Adrift's Final LP"
      date="3 April 2026"
      title="Nate Garrett on the Trials and Tribulations Behind Spirit Adrift's Final LP"
    >
      <p className="mb-5 text-[18px] leading-[1.7] text-slate-600">
        The final chapter of a band is rarely simple. For Nate Garrett, it meant sorting through
        years of pressure, ambition, grief, and the stubborn joy of heavy music.
      </p>
      <p className="mb-5 text-base leading-[1.8] text-slate-600">
        The record carries that weight without losing its momentum. Riffs push forward, melodies
        open into big horizons, and the writing keeps returning to what it means to end something
        honestly.
      </p>
      <p className="text-base leading-[1.8] text-slate-600">
        It is a farewell that sounds less like defeat than a clear-eyed bow: loud, generous, and
        deeply human.
      </p>
    </ArticleLayout>
  );
}
