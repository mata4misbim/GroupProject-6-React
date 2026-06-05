import { Link } from "react-router-dom";

const navItems = [
  { label: "Digital music", to: "/shop?category=digital" },
  { label: "Vinyl", to: "/shop?category=vinyl" },
  { label: "Compact discs", to: "/shop?category=cd" },
  { label: "Cassettes", to: "/shop?category=cassette" },
  { label: "T-shirts", to: "/shop?category=tshirt" },
  { label: "Gift cards", to: "/gift-cards" },
  { label: "Community", to: "/club" },
];

export default function Nav() {
  return (
    <nav className="border-t border-white/8 bg-black/25 backdrop-blur-lg">
      {/* Desktop — centered items */}
      <div className="hidden h-14 items-center justify-center md:flex">
        <ul className="flex list-none items-center gap-0">
          {navItems.map((item) => (
            <li
              className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-medium tracking-[0.04em]"
              key={item.label}
            >
              <Link
                className="block rounded-lg px-3 py-2 text-white/80 no-underline transition-colors duration-150 hover:bg-white/8 hover:text-white"
                to={item.to}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile — horizontal scroll pills */}
      <div className="flex h-11 items-center gap-2 overflow-x-auto px-4 scrollbar-none md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="shrink-0 rounded-full border border-white/15 px-3 py-1 font-['Plus_Jakarta_Sans',sans-serif] text-[12px] font-medium text-white/70 no-underline transition-colors hover:border-white/30 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
