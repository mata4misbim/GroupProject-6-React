import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { totalItems, setOpen } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-[rgba(28,28,30,0.85)] backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center gap-6 px-[10%] h-[68px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline shrink-0 hover:opacity-80 transition-opacity">
          <span className="text-2xl">🎵</span>
          <span className="text-white font-bold text-[20px] tracking-tight">Audtlist</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-[340px]">
          <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 focus-within:border-white/40 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input type="text" placeholder="Search" className="bg-transparent outline-none text-[14px] text-white/85 placeholder:text-white/45 w-full" />
          </div>
        </div>

        <div className="flex-1" />

        {/* Auth + Cart */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Cart */}
          <button
            onClick={() => setOpen(true)}
            className="relative w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white/70 hover:bg-white/15 hover:text-white transition-all"
            aria-label="Open cart"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] flex items-center justify-center px-1 bg-accent text-white text-[11px] font-bold rounded-full border-2 border-bg">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>

          {/* Auth buttons */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-[13px] hidden sm:block max-w-[120px] truncate">
                {user?.email}
              </span>
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="px-[18px] py-[9px] rounded-full text-[14px] font-semibold border-[1.5px] border-white/25 text-white/85 hover:border-white/50 hover:bg-white/8 transition-all"
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-[22px] py-[9px] rounded-full text-[15px] font-semibold border-[1.5px] border-white/25 text-white/85 hover:border-white/50 hover:bg-white/8 transition-all"
              >
                Log in
              </button>
              <button
                onClick={() => navigate("/register/fan")}
                className="px-[22px] py-[9px] rounded-full text-[15px] font-semibold bg-accent text-white hover:bg-accent-hover shadow-[0_4px_16px_rgba(252,60,68,0.35)] transition-all"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
