import Footer from "./components/Footer";
import Nav from "./components/Nav";
import flairBanner from "./assets/Flair (2).png";
import Radio from "./components/Radio";
import Head from "./components/Head";
import Banner from "./components/Banner";
import SellingList from "./components/SellingList";
import DailyFeed from "./components/DailyFeed";

export default function App() {
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
