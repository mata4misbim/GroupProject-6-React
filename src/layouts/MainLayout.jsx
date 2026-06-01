import { Outlet } from "react-router-dom";
import Head from "../components/common/Head";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#03030f] font-['TikTok_Sans','Noto_Sans_Thai',sans-serif]">
      <Head />
      <Outlet />
    </div>
  );
}
