import { useState } from "react";
import { Assets } from "../assets";

const Header = ({ theme, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Packages", href: "#packages" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-[color:var(--bg-body)]/85 backdrop-blur-md border-b border-navy-line">
      <nav className="max-w-[1180px] mx-auto flex justify-between items-center px-[28px] py-[14px]">
        <a href="#" className="flex items-center gap-[10px]">
          <img
            src="/EMP-preview.webp"
            alt="Expert Miners logo"
            width="558"
            height="447"
            className="h-[58px] w-auto"
          />
          <span className="font-[800] text-[18px] tracking-[-0.01em] text-white hidden sm:inline">
            EXPERT <span className="gold-text">MINERS</span>
          </span>
        </a>

        <div className="hidden lg:flex gap-[34px] text-[14.5px] text-[#9aa0c2]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-[14px]">
          <a
            href="https://gentle-scripts-run.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-[7px] font-mono text-[12px] tracking-[0.06em] px-[16px] py-[9px] border border-navy-line rounded-[5px] text-[#9aa0c2] hover:border-gold hover:text-gold transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-[13px] h-[13px]"
            >
              <rect x="5" y="11" width="14" height="9" rx="1" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            Admin Login
          </a>

          <button
            aria-label="Toggle theme"
            className="flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border border-navy-line bg-transparent text-white transition-all duration-300 ease-out"
            onClick={toggleTheme}
          >
            {theme === "dark" ? "☀︎" : "☾"}
          </button>

          <button
            aria-label="Toggle menu"
            className="lg:hidden flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border border-navy-line bg-navy-panel/80 text-white transition-all duration-300 ease-out"
            onClick={handleToggle}
          >
            <span className="relative flex h-[14px] w-[18px] flex-col justify-between">
              <span
                className={`block h-[2px] w-full rounded-full bg-white transition-all duration-300 ease-out ${
                  menuOpen
                    ? "translate-y-[6px] rotate-45"
                    : "translate-y-0 rotate-0"
                }`}
              />
              <span
                className={`block h-[2px] w-full rounded-full bg-white transition-all duration-300 ease-out ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-[2px] w-full rounded-full bg-white transition-all duration-300 ease-out ${
                  menuOpen
                    ? "-translate-y-[6px] -rotate-45"
                    : "translate-y-0 rotate-0"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden overflow-hidden border-t border-navy-line bg-navy-panel transition-all duration-300 ease-out ${
          menuOpen ? "max-h-[260px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-[14px] px-[28px] py-[20px]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleToggle}
              className="text-[15px] text-[#9aa0c2] hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://gentle-scripts-run.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] text-gold"
          >
            Admin Login
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
