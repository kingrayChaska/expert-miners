import { useReveal } from "../useReveal";

const Broom = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M3 21l7-7" />
    <path d="M12.5 8.5l3 3" />
    <path d="M17 3l4 4-9.5 9.5-4-4z" />
    <path d="M6 18c-1.5 1-3 1-3 1s0-1.5 1-3" />
  </svg>
);

const Zap = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ArrowLeftRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M8 3L4 7l4 4" />
    <path d="M4 7h16" />
    <path d="M16 21l4-4-4-4" />
    <path d="M20 17H4" />
  </svg>
);

const Cpu = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <rect x="9" y="9" width="6" height="6" />
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
  </svg>
);

const Package = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M12 2l9 4.5v11L12 22l-9-4.5v-11z" />
    <path d="M12 22V11" />
    <path d="M3 6.5l9 4.5 9-4.5" />
    <path d="M7.5 4.25l9 4.5" />
  </svg>
);

const Server = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <path d="M6 6h.01M6 18h.01" />
  </svg>
);

const services = [
  {
    icon: <Broom />,
    title: "Miner Deep Cleaning & Preventive Maintenance",
    body: "Removes dust, debris, and buildup that cause overheating, fan failure, and hashrate drops — extending miner lifespan and stabilizing performance.",
  },
  {
    icon: <Zap />,
    title: "ASIC PSU Repairs",
    body: "Component-level power supply repair fixing voltage instability, unexpected shutdowns, and power faults to restore safe, reliable operation.",
  },
  {
    icon: <ArrowLeftRight />,
    title: "Used Miner Trade-In",
    body: "Buy or sell fully tested used ASIC miners with verified condition, transparent pricing, and fair market valuation.",
  },
  {
    icon: <Cpu />,
    title: "Hashboard Repairs",
    body: "Diagnose and repair faulty chips, circuits, and power issues to restore lost hashrate, stability, and efficiency.",
  },
  {
    icon: <Package />,
    title: "Spare Parts",
    body: "Fans, PSUs, control boards, and cables — tested to ensure stable operation and maximum uptime.",
  },
  {
    icon: <Server />,
    title: "Mining Hosting & Consultation",
    body: "Secure, affordable hosting and colocation, plus expert consultation for fleet setup, firmware, and optimization.",
  },
];

const Services = () => {
  const [ref, visible] = useReveal();

  return (
    <section
      id="services"
      className="relative py-[100px] overflow-hidden text-[var(--text-main)] transition-colors duration-300"
    >
      <div className="relative max-w-[1180px] mx-auto px-[28px]">
        <div className="flex flex-wrap justify-between items-end gap-[30px] mb-[56px]">
          <div>
            <h2 className="text-[28px] md:text-[42px] font-[700] leading-[1.15] text-[var(--text-main)]">
              Complete miner <span className="gold-text">solutons</span>,
              <br />
              start to finish.
            </h2>
          </div>
          <p className="text-[17px] text-[var(--text-muted)] max-w-[560px]">
            From a single dead hashboard to fleet-wide preventive maintenance,
            every service is built around getting your miners back to full
            hashrate.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]"
        >
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`service-card group bg-[var(--bg-panel)] border border-[var(--border)] backdrop-blur-[18px] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.55)] hover:border-gold/30 hover:bg-[var(--bg-panel2)] hover:shadow-[0_20px_80px_-32px_rgba(245,197,24,0.28)] hover:-translate-y-1 transform transition-all duration-300 p-[34px_28px] rounded-[10px] ${visible ? " visible" : ""}`}
              style={visible ? { animationDelay: `${i * 80}ms` } : {}}
            >
              <div className="w-[44px] h-[44px] rounded-[10px] bg-[#f5ead0] border border-[#d9ccb0] flex items-center justify-center text-[#8a6b1b] group-hover:text-gold group-hover:border-gold/40 group-hover:shadow-[0_0_18px_rgba(245,197,24,0.18)] transition-all duration-300 mb-[18px] dark:bg-white/10 dark:border-white/15 dark:text-gold-dim">
                {service.icon}
              </div>
              <h3 className="text-[18px] font-[700] text-[var(--text-main)] mb-[10px]">
                {service.title}
              </h3>
              <p className="text-[14.5px] text-[var(--text-muted)]">
                {service.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
