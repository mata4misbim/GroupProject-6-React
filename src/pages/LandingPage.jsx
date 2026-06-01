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
    <div className="min-w-300 bg-[#03030f] font-['Plus_Jakarta_Sans',sans-serif] text-base leading-normal text-white">
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
