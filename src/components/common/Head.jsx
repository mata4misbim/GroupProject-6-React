import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import SearchBar from "./SearchBar.jsx";
import logoA from "../../assets/landing-page/logoa.png";
import { CartContext } from "../../shop/context/CartContext";
import UserDropdown from "./UserDropdown.jsx";

export default function Head() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const cart = useContext(CartContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-100 flex h-17 items-center justify-between gap-6 border-b border-white/10 bg-black/35 px-[10%] backdrop-blur-xl">
      <div className="flex shrink-0 cursor-pointer items-center gap-2 text-white transition-opacity duration-150 hover:opacity-75">
        <Link to="/">
          <img
            src={logoA}
            alt="AUDTLIST"
            className="h-24 w-auto object-contain"
          />
        </Link>
      </div>
      <div className="relative z-[110] mr-auto max-w-[420px] flex-1">
        <SearchBar />
      </div>
      {/*   
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
      </div> */}
      {/* Auth buttons */}
      <div className="flex shrink-0 items-center gap-2">
        {cart && (
          <button
            onClick={() => cart.setOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/70 transition-all hover:bg-white/15 hover:text-white"
            aria-label="Open cart"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cart.totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-bg bg-accent px-1 text-[11px] font-bold text-white">
                {cart.totalItems > 99 ? "99+" : cart.totalItems}
              </span>
            )}
          </button>
        )}
        {isLoggedIn ? (
          <UserDropdown user={user} handleLogout={handleLogout} />
        ) : (
          // <>
          //   <Link
          //     to="/profile"
          //     className="max-w-50 truncate text-sm text-white/70 px-6 py-2 no-underline hover:text-white/90 transition-colors"
          //   >
          //     {user?.email}
          //   </Link>
          //   <button
          //     type="button"
          //     onClick={handleLogout}
          //     className="cursor-pointer rounded-full border-[1.5px] border-white/40 bg-transparent px-6 py-2 font-['Plus_Jakarta_Sans',sans-serif] text-sm font-semibold tracking-[0.04em] text-white no-underline transition-all duration-200 hover:border-white/80 hover:bg-red-500/10"
          //   >
          //     Log out
          //   </button>
          // </>
          <>
            <Link
              to="/login"
              className="cursor-pointer rounded-full border-[1.5px] border-white/40 bg-transparent px-6 py-2 font-['Plus_Jakarta_Sans',sans-serif] text-sm font-semibold tracking-[0.04em] text-white no-underline transition-all duration-200 hover:border-white/80 hover:bg-red-500/10"
            >
              Log in
            </Link>
            <Link
              to="/register/fan"
              className="cursor-pointer rounded-full border-0 bg-linear-to-br from-[#8a8abe] to-[#0d0d99] px-6 py-2 font-['Plus_Jakarta_Sans',sans-serif] text-sm font-semibold tracking-[0.04em] text-white no-underline shadow-[0_4px_16px_rgba(0,0,180,0.45)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(248,248,250,0.45)]"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
