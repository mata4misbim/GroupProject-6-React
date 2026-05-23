import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-bg-dark border-t border-white/8 px-[10%] py-12">
      <div className="max-w-[1400px]">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xl">🎵</span>
          <span className="text-white font-bold text-[16px]">Audtlist</span>
        </div>

        <p className="text-white/45 text-[13px] mb-6 max-w-md">
          A marketplace for independent artists. Discover, support, and own
          music directly from the people who make it.
        </p>

        <ul className="flex flex-col gap-3">
          <li>
            <Link
              to="/about"
              className="text-white/50 hover:text-white text-[14px] no-underline transition-colors"
            >
              About us
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="text-white/50 hover:text-white text-[14px] no-underline transition-colors"
            >
              Help
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white/50 hover:text-white text-[14px] no-underline transition-colors"
            >
              Terms and conditions
              
            </a>
            <p className="text-white/25 text-[11px] mt-8">
              © 2026 Audtlist · Made with ♪ in Bangkok
            </p>
          </li>
        </ul>


      </div>
    </footer>
  );
}
