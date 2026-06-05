import cover from "../assets/landing-page/0043841685_0.jpg";
import ArticleLayout from "../components/common/ArticleLayout";

export default function Article1Page() {
  return (
    <ArticleLayout cover={cover} alt="The Hotlist, Spring 2026" date="5 April 2026" title="The Hotlist, Spring 2026">
      <p className="mb-5 text-[18px] leading-[1.7] text-slate-600">
        This season's essential listening is full of bright left turns: guitar bands stretching into
        electronics, producers bringing warmth back to club music, and independent artists finding
        new ways to connect with listeners.
      </p>
      <p className="mb-5 text-base leading-[1.8] text-slate-600">
        Across the scene, collaboration is the strongest signal. Artists are trading files across
        cities, folding local traditions into global sounds, and releasing records that feel both
        handmade and future-facing.
      </p>
      <p className="text-base leading-[1.8] text-slate-600">
        The result is a spring list built for discovery. Put these records on while the day changes
        light, and let the new favorites find you.
      </p>
    </ArticleLayout>
  );
}
