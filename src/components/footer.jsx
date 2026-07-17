import { useState } from "react";
import { Assets } from "../assets";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="border-t border-navy-line bg-navy-panel pt-[64px] pb-[28px]">
      <div className="max-w-[1180px] mx-auto px-[28px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[40px] mb-[50px]">
          <div>
            <a href="#" className="flex items-center gap-[10px] mb-[14px]">
              <img
                src={Assets.logo}
                alt="Expert Miners logo"
                width="558"
                height="447"
                className="h-[34px] w-auto"
              />
              <span className="font-[800] text-[18px] text-white">
                EXPERT <span className="gold-text">MINERS</span>
              </span>
            </a>
            <p className="text-[14px] text-[#9aa0c2] max-w-[280px] mb-[14px]">
              Fast and professional ASIC repair services. Maximize uptime, boost
              efficiency, and mine with confidence.
            </p>
            <div className="flex gap-[12px] text-white">
              {[
                {
                  href: "https://www.facebook.com/share/1CZp457YhU/?mibextid=wwXIfr",
                  label: "Facebook",
                  path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-[34px] h-[34px] border border-navy-line rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-[15px] h-[15px]"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
              <a
                href="https://www.instagram.com/bitcoinminers.repairs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-[34px] h-[34px] border border-navy-line rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-[15px] h-[15px]"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@bitcoinminers.repairs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-[34px] h-[34px] border border-navy-line rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-[15px] h-[15px]"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[12px] tracking-[0.08em] uppercase text-gold mb-[18px]">
              Services
            </h4>
            <ul>
              {[
                "Deep Cleaning & Maintenance",
                "ASIC PSU Repairs",
                "Used Miner Trade-In",
                "Hashboard Repairs",
                "Spare Parts",
              ].map((item) => (
                <li key={item} className="py-[6px] text-[14px] text-[#9aa0c2]">
                  <a
                    href="#services"
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[12px] tracking-[0.08em] uppercase text-gold mb-[18px]">
              Useful Links
            </h4>
            <ul>
              {[
                { label: "Home", href: "#" },
                { label: "Services", href: "#services" },
                { label: "Packages", href: "#packages" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li
                  key={link.label}
                  className="py-[6px] text-[14px] text-[#9aa0c2]"
                >
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[12px] tracking-[0.08em] uppercase text-gold mb-[18px]">
              Newsletter
            </h4>
            <p className="text-[14px] text-[#9aa0c2] mb-[14px] max-w-[280px]">
              Get repair tips and mining insights.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex border border-navy-line rounded-[6px] overflow-hidden max-w-[280px]"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border-none px-[12px] py-[11px] text-white text-[13.5px] focus:outline-none"
              />
              <button className="bg-gold text-[#161005] font-[600] text-[12.5px] font-mono px-[16px]">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-[14px] pt-[28px] border-t border-navy-line text-[13px] text-[#9aa0c2]">
          <span>© 2026 Expert Miners. All rights reserved.</span>
          <span>Built for the UAE mining community.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
