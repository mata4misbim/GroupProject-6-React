import { Link } from "react-router-dom";

const navItems = [
  { label: "Digital music", to: "/shop?category=digital" },
  { label: "Vinyl", to: "/shop?category=vinyl" },
  { label: "Compact discs", to: "/shop?category=cd" },
  { label: "Cassettes", to: "/shop?category=cassette" },
  { label: "T-shirts", to: "/shop?category=tshirt" },
  { label: "Gift cards", to: "/shop" },
  { label: "Editorial", to: "/shop" },
  { label: "Club", to: "/shop" },
  { label: "Store", to: "/shop" },
];

export default function Nav() {
  return (
    <nav className="flex h-14 items-center justify-center border-t border-white/8 bg-black/25 px-[10%] backdrop-blur-lg">
      <ul className="flex list-none items-center gap-0">
        {navItems.map((item) => (
          <li
            className="font-['Montserrat',sans-serif] text-sm font-medium tracking-[0.04em]"
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
    </nav>
  );
}
