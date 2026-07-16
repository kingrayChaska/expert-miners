const WHATSAPP_LINK =
  "https://wa.me/971588016895?text=Hello%20Expert%20Miners%2C%20I%20need%20professional%20ASIC%20miner%20repair%20services.%20Please%20share%20details%20about%20diagnosis%2C%20repair%20process%2C%20and%20pricing.";

const Packages = () => {
  return (
    <section id="packages" className="py-[100px]">
      <div className="max-w-[1180px] mx-auto px-[28px]">
        <div className="mb-[56px]">
          
          <h2 className="text-[28px] md:text-[42px] font-[700] text-white">
            Packages for miner repairs.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          <div className="bg-navy-panel border border-navy-line rounded-[12px] p-[38px_32px] relative">
            <h3 className="text-[22px] font-[700] text-white mb-[6px]">Starter Package</h3>
            <p className="text-[13.5px] text-[#9aa0c2] mb-[26px]">
              For individual miners and small setups.
            </p>
            <ul className="mb-[30px]">
              {[
                "Regular miner health check",
                "Dust cleaning & optimization",
                "Minor part replacement",
                "Remote support (business hours)",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-[10px] items-start py-[9px] border-b border-navy-line last:border-b-0 text-[14.5px] text-white"
                >
                  <span className="text-gold">—</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex justify-center px-[26px] py-[14px] rounded-[6px] border border-navy-line text-white font-[600] text-[14.5px] hover:border-gold hover:text-gold transition-all"
            >
              Get Price
            </a>
          </div>

          <div className="bg-navy-panel border border-gold rounded-[12px] p-[38px_32px] relative shadow-[0_20px_60px_-20px_rgba(245,197,24,0.18)]">
            <span className="absolute -top-[13px] right-[28px] bg-gold text-[#161005] font-mono text-[11px] font-[600] tracking-[0.04em] px-[12px] py-[5px] rounded-full">
              Premium Fit
            </span>
            <h3 className="text-[22px] font-[700] text-white mb-[6px]">Premium Fit</h3>
            <p className="text-[13.5px] text-[#9aa0c2] mb-[26px]">
              For mining operations and fleets.
            </p>
            <ul className="mb-[30px]">
              {[
                "Full preventive maintenance",
                "Priority repairs & diagnostics",
                "Firmware updates & performance tuning",
                "24/7 support & monitoring",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-[10px] items-start py-[9px] border-b border-navy-line last:border-b-0 text-[14.5px] text-white"
                >
                  <span className="text-gold">—</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex justify-center px-[26px] py-[14px] rounded-[6px] bg-gold text-[#161005] font-[600] text-[14.5px] hover:bg-[#f2b558] transition-all"
            >
              Get Price
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
