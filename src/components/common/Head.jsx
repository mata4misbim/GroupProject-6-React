import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

export default function Head() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex h-[68px] items-center justify-between gap-6 border-b border-white/10 bg-black/35 px-[10%] backdrop-blur-xl">
      <div className="flex shrink-0 cursor-pointer items-center gap-2 text-white transition-opacity duration-150 hover:opacity-75">
        <Link to="/">
          <span className="font-['Caesar_Dressing',system-ui] text-[37px] leading-tight">
            AUDTLIST
          </span>
        </Link>
      </div>

      <div className="mr-auto max-w-[340px] flex-1">
        <form action="https://www.youtube.com/results" method="get" target="_blank">
          <div className="flex w-full items-center gap-2 rounded-full border-[1.5px] border-white/25 bg-white/12 px-4 py-2 transition-[border-color,box-shadow] duration-200 focus-within:border-white/60 focus-within:shadow-[0_0_0_3px_rgba(255,255,255,0.1)]">
            <span
              className="material-symbols-outlined text-white/70"
              style={{ fontSize: "20px" }}
            >
              search
            </span>
            <input
              className="w-full border-0 bg-transparent font-['TikTok_Sans','Noto_Sans_Thai',sans-serif] text-sm text-white outline-none placeholder:text-white/55"
              type="text"
              placeholder="search"
              name="search_query"
            />
          </div>
        </form>
      </div>
      {/* Auth buttons */}
      <div className="flex shrink-0 gap-2">
        {isLoggedIn ? (
          <>
            <span className="max-w-[200px] truncate text-sm text-white/70   px-6 py-2">
              {user?.email}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer rounded-full border-[1.5px] border-white/40 bg-transparent px-6 py-2 font-['Montserrat',sans-serif] text-sm font-semibold tracking-[0.04em] text-white no-underline transition-all duration-200 hover:border-white/80 hover:bg-red-500/10"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="cursor-pointer rounded-full border-[1.5px] border-white/40 bg-transparent px-6 py-2 font-['Montserrat',sans-serif] text-sm font-semibold tracking-[0.04em] text-white no-underline transition-all duration-200 hover:border-white/80 hover:bg-red-500/10"
            >
              Sign in
            </Link>
            <Link
              to="/register/fan"
              className="cursor-pointer rounded-full border-0 bg-linear-to-br from-[#8a8abe] to-[#0d0d99] px-6 py-2 font-['Montserrat',sans-serif] text-sm font-semibold tracking-[0.04em] text-white no-underline shadow-[0_4px_16px_rgba(0,0,180,0.45)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(248,248,250,0.45)]"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
