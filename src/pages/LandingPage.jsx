import Footer from "../components/common/Footer";
import Head from "../components/common/Head";
import Nav from "../components/common/Nav";
import Banner from "../components/landing/Banner";
import DailyFeed from "../components/landing/DailyFeed";
import Radio from "../components/landing/Radio";
import SellingList from "../components/landing/SellingList";
import StatsSection from "../components/landing/StatsSection";
import FeaturedArtists from "../components/landing/FeaturedArtists";
import flairBanner from "../assets/landing-page/bannerv05.png";

export default function LandingPage() {
  return (
    <div className="bg-[#03030f] font-['Plus_Jakarta_Sans',sans-serif] text-base leading-normal text-white">

      {/* ── Desktop hero: image + overlay text ── */}
      <div className="hidden md:block">
        <div className="relative min-h-125 w-full overflow-hidden mask-[linear-gradient(to_bottom,black_70%,rgba(0,0,0,0.85)_80%,rgba(0,0,0,0.5)_90%,rgba(0,0,0,0.1)_97%,transparent_100%)]">
          <img
            src={flairBanner}
            alt="Flair banner"
            className="block h-full min-h-125 w-full object-cover object-[center_80%]"
          />
          <div className="absolute inset-0 z-100">
            <Head />
            <Nav />
            <Banner />
          </div>
        </div>
      </div>

      {/* ── Mobile hero: nav on top, image below, text below image ── */}
      <div className="md:hidden">
        <Head />
        <Nav />
        <div className="relative w-full overflow-hidden" style={{ maskImage: "linear-gradient(to bottom, black 60%, rgba(0,0,0,0.5) 85%, transparent 100%)" }}>
          <img
            src={flairBanner}
            alt="Flair banner"
            className="block h-52 w-full object-cover object-[center_60%]"
          />
        </div>
        <MobileBannerText />
      </div>

      <main>
        <SellingList />
        <StatsSection />
        <DailyFeed />
        <div className="h-4 bg-[#03030f]"></div>
        <Radio />
        <FeaturedArtists />
      </main>
      <Footer />
    </div>
  );
}

function MobileBannerText() {
  return (
    <div className="px-5 pb-8 pt-4">
      <p className="text-[11px] font-medium tracking-[0.18em] text-white/60 uppercase">
        Drop your sound into the zone
      </p>
      <h2 className="mt-2 text-[22px] font-extrabold leading-tight tracking-tight text-white">
        Your sound,<br />your space.
      </h2>
      <p className="mt-2 text-[13px] leading-relaxed text-white/50">
        A space built for independent artists to create, release, and connect with fans directly.
      </p>
    </div>
  );
}
