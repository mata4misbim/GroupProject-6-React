import Footer from "../components/common/Footer";
import Head from "../components/common/Head";
import Nav from "../components/common/Nav";
import Banner from "../components/landing/Banner";
import DailyFeed from "../components/landing/DailyFeed";
import Radio from "../components/landing/Radio";
import SellingList from "../components/landing/SellingList";
import flairBanner from "../assets/landing-page/Flair (2).png";

export default function LandingPage() {
  return (
    <div className="min-w-[1200px] bg-[#E7F2EF] font-['TikTok_Sans','Noto_Sans_Thai',sans-serif] text-base leading-normal text-slate-900">
      <div className="relative min-h-[500px] w-full overflow-hidden">
        <img
          src={flairBanner}
          alt="Flair banner"
          className="block h-full min-h-[500px] w-full object-cover object-center"
        />
        <div className="absolute inset-0 z-[100]">
          <Head />
          <Nav />
          <Banner />
        </div>
      </div>
      <main>
        <SellingList />
        <DailyFeed />
        <div className="h-4 bg-[#E7F2EF]"></div>
        <Radio />
      </main>
      <Footer />
    </div>
  );
}
