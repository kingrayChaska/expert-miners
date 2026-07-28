import { useState } from "react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Header = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent backdrop-blur-lg">
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between px-7 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <img
            src="/EMP-preview.webp"
            alt="Expert Miners Logo"
            className="h-14 w-auto"
          />

          <span className="hidden text-lg font-extrabold tracking-tight text-white sm:inline">
            EXPERT <span className="gold-text">MINERS</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-9 lg:flex">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-gray-300 transition-colors duration-200 hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Admin Button */}
          <a
            href="/admin"
            className="hidden items-center gap-2 rounded-md border border-white/20 px-4 py-2 font-mono text-xs tracking-wider text-gray-300 transition-all hover:border-yellow-400 hover:text-yellow-400 sm:flex"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-3.5 w-3.5"
            >
              <rect x="5" y="11" width="14" height="9" rx="1" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            Admin Login
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white transition hover:border-white/40"
          >
            {theme === "dark" ? "☀︎" : "☾"}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white transition lg:hidden"
          >
            <span className="relative flex h-[15px] w-[20px] flex-col justify-between">
              <span
                className={`h-0.5 rounded-full bg-white transition-all duration-300 ${
                  isMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 rounded-full bg-white transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 rounded-full bg-white transition-all duration-300 ${
                  isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mb-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="flex flex-col gap-5 p-6">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className="text-gray-300 transition hover:text-white"
              >
                {label}
              </a>
            ))}

            <a
              href="/admin"
              onClick={closeMenu}
              className="text-gray-300 transition hover:text-white"
            >
              Admin Login
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
