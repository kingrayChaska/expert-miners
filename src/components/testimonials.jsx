const testimonials = [
  {
    quote:
      "Three hashboards were written off by another shop. Expert Miners got two back to full hashrate and gave us an honest read on the third.",
    initials: "K.A.",
    name: "Khalid A.",
    role: "Independent miner, Abu Dhabi",
  },
  {
    quote:
      "We run a 40-unit setup and downtime is the only thing that scares me. Their preventive maintenance plan cut our fault rate noticeably.",
    initials: "S.R.",
    name: "Sara R.",
    role: "Mining operation manager",
  },
  {
    quote:
      "Fast diagnosis, clear pricing, and they actually explain what went wrong instead of just handing you a bill.",
    initials: "O.M.",
    name: "Omar M.",
    role: "Small-scale miner",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-[100px]">
      <div className="max-w-[1180px] mx-auto px-[28px]">
        <div className="mb-[56px]">
          
          <h2 className="text-[28px] md:text-[42px] font-[700] text-white">
            Trusted by miners across the UAE.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-navy-panel border border-navy-line rounded-[10px] p-[30px] flex flex-col justify-between min-h-[230px]"
            >
              <p className="text-[15px] text-white mb-[24px]">
                <span className="text-gold text-[22px] mr-[2px]">&ldquo;</span>
                {t.quote}
              </p>
              <div className="flex items-center gap-[12px]">
                <div className="w-[38px] h-[38px] rounded-full bg-navy-panel2 border border-navy-line flex items-center justify-center font-mono text-[13px] text-gold font-[600]">
                  {t.initials}
                </div>
                <div>
                  <div className="text-[14px] font-[600] text-white">{t.name}</div>
                  <div className="text-[12.5px] text-[#9aa0c2]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
