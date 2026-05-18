const navItems = [
  "Digital music",
  "Vinyl",
  "Compact discs",
  "Cassettes",
  "T-shirts",
  "Gift cards",
  "Editorial",
  "Club",
  "Store",
];

export default function Nav() {
  return (
    <nav className="flex h-14 items-center justify-center border-t border-white/8 bg-black/25 px-[10%] backdrop-blur-lg">
      <ul className="flex list-none items-center gap-0">
        <svg
          className="mr-3 shrink-0 opacity-70"
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#e3e3e3"
        >
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
        {navItems.map((item) => (
          <li
            className="font-['Montserrat',sans-serif] text-sm font-medium tracking-[0.04em]"
            key={item}
          >
            <a
              className="block rounded-lg px-3 py-2 text-white/80 no-underline transition-colors duration-150 hover:bg-white/8 hover:text-white"
              href="#"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
