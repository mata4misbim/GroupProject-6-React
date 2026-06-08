import cover from "../assets/landing-page/0044010976_0.jpg";
import ArticleLayout from "../components/common/ArticleLayout";

export default function Article2Page() {
  return (
    <ArticleLayout
      cover={cover}
      alt="Apres la Revolution: The Sound of the 70s French Underground"
      date="4 April 2026"
      title="Apres la Revolution: The Sound of the 70s French Underground"
    >
      <p className="mb-5 text-[18px] leading-[1.7] text-slate-600">
        In the wake of cultural upheaval, a generation of French musicians built strange, beautiful
        records from jazz, folk, electronics, and restless studio experiments.
      </p>
      <p className="mb-5 text-base leading-[1.8] text-slate-600">
        The music still sounds alive because it refuses to sit neatly in one category. It drifts
        from smoky improvisation to tape-loop hypnosis, from political urgency to private dream logic.
      </p>
      <p className="text-base leading-[1.8] text-slate-600">
        Revisited today, these albums feel less like artifacts and more like open invitations to
        break the rules with care.
      </p>
    </ArticleLayout>
  );
}
