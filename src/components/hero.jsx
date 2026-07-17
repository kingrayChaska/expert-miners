import { useMemo } from "react";

const WHATSAPP_LINK =
  "https://wa.me/971501562488?text=Hello%20Expert%20Miners%2C%20I%20need%20professional%20ASIC%20miner%20repair%20services.%20Please%20share%20details%20about%20diagnosis%2C%20repair%20process%2C%20and%20pricing.";

const stats = [
  { num: "1000+", label: "Miners repaired successfully" },
  { num: "100+", label: "Satisfied clients across the UAE" },
  { num: "24/7", label: "Support & monitoring" },
];

const Hero = () => {
  const faultyChips = useMemo(() => {
    const set = new Set();
    while (set.size < 3) {
      set.add(Math.floor(Math.random() * 96));
    }
    return set;
  }, []);

  return (
    <section
      className="pt-[168px] pb-[100px] relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/technician.webp')",
      }}
    >
      <div className="hero-overlay absolute inset-0 bg-black/65" />
      <div
        className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(245,197,24,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1180px] mx-auto px-[28px] grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[60px] items-center">
        <div>
          <h1 className="text-[34px] md:text-[46px] lg:text-[58px] leading-[1.08] font-[700] text-white mb-[22px]">
            Precision repair for miners that can&apos;t afford{" "}
            <span className="gold-text">downtime</span>.
          </h1>

          <p className="text-[17px] text-[#c7cadc] max-w-[560px]">
            Hashboard diagnostics, PSU repair, deep cleaning and preventive
            maintenance for Bitcoin ASIC miners serving individuals and mining
            operations across the UAE with fast turnaround and tested solutions.
          </p>

          <div className="flex flex-wrap gap-[14px] mt-[34px]">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[8px] px-[26px] py-[14px] rounded-[6px] bg-gold text-[#161005] font-[600] text-[14.5px] hover:bg-[#f2b558] hover:-translate-y-[1px] transition-all"
            >
              Message Our Repair Team
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-[8px] px-[26px] py-[14px] rounded-[6px] border border-navy-line text-white font-[600] text-[14.5px] hover:border-gold hover:text-gold transition-all"
            >
              View Services
            </a>
          </div>

          <div className="flex flex-wrap gap-[38px] mt-[52px]">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-mono text-[26px] font-[600] text-gold">
                  {stat.num}
                </div>
                <div className="text-[12.5px] text-[#9aa0c2] mt-[4px] max-w-[120px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-navy-panel border border-navy-line rounded-[10px] p-[22px] relative overflow-hidden">
          <div className="flex justify-between items-center mb-[16px] font-mono text-[11px] text-[#9aa0c2] tracking-[0.08em] uppercase">
            <span>Hashboard Diagnostic Live Scan</span>
            <span className="flex items-center gap-[6px] text-gold">
              <span className="live-dot w-[6px] h-[6px] rounded-full bg-gold inline-block" />
              Scanning
            </span>
          </div>

          <div className="grid grid-cols-12 gap-[5px] relative">
            {Array.from({ length: 96 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-[2px] border border-navy-line ${
                  faultyChips.has(i)
                    ? "chip-fault bg-gold-dim"
                    : "bg-navy-panel2"
                }`}
              />
            ))}
            <div className="scan-line absolute left-0 right-0 top-[70px] h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          <div className="flex justify-between mt-[16px] font-mono text-[11px] text-[#9aa0c2]">
            <span>
              Chips checked: <b className="text-white">384</b>
            </span>
            <span>
              Faults found: <b className="text-gold">3</b>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
