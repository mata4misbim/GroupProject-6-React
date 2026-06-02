import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserDropdown({ user, handleLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/70 transition-all hover:bg-white/15 hover:text-white cursor-pointer"
      >
        <span className="text-sm font-bold font-['Plus_Jakarta_Sans',sans-serif]">
          {initials}
        </span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-white/10 bg-[#1a1a2e]/90 shadow-xl backdrop-blur-md"
          style={{
            animation: "dropIn 0.15s ease-out forwards",
          }}
        >
          {/* Email header */}
          <div className="border-b border-white/10 px-4 py-3">
            <p className="text-xs text-white/40 font-['Plus_Jakarta_Sans',sans-serif]">
              Signed in as
            </p>
            <p className="mt-0.5 max-w-full truncate text-sm font-semibold text-white/80 font-['Plus_Jakarta_Sans',sans-serif]">
              {user?.email}
            </p>
          </div>

          {/* Menu items */}
          <div className="py-1.5">
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 no-underline transition-colors hover:bg-white/5 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              <span className="font-['Plus_Jakarta_Sans',sans-serif]">
                Profile
              </span>
            </Link>

            <Link
              to="/profilesetting"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 no-underline transition-colors hover:bg-white/5 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span className="font-['Plus_Jakarta_Sans',sans-serif]">
                Settings
              </span>
            </Link>

            <Link
              to="/terms"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 no-underline transition-colors hover:bg-white/5 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />

                <polyline points="14 2 14 8 20 8" />

                <line x1="16" y1="13" x2="8" y2="13" />

                <line x1="16" y1="17" x2="8" y2="17" />

                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>

              <span className="font-['Plus_Jakarta_Sans',sans-serif]">
                Term and Conditions
              </span>
            </Link>

            <Link
              to="/help"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 no-underline transition-colors hover:bg-white/5 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />

                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />

                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>

              <span className="font-['Plus_Jakarta_Sans',sans-serif]">
                Help
              </span>
            </Link>

            <div className="mx-3 my-1 border-t border-white/10" />

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-red-400/80 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold tracking-[0.04em]">
                Log out
              </span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>
    </div>
  );
}
