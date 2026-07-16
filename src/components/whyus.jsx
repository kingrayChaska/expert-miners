const points = [
  {
    title: "Expert Hashboard Repairs",
    body: "Restore lost hashrate, stability, and mining efficiency by fixing faulty chips, circuits, and power issues.",
  },
  {
    title: "Tested Spare Parts",
    body: "High-quality, fully tested parts including fans, PSUs, control boards, and cables for maximum uptime.",
  },
  {
    title: "Preventive Maintenance",
    body: "Deep cleaning that removes dust and buildup, reduces overheating, and extends the lifespan of your miners.",
  },
  {
    title: "Complete Solutions",
    body: "From PSU repairs to used miner trade-ins — reliable, transparent solutions at every stage.",
  },
];

const WhyUs = () => {
  return (
    <section className="pb-[100px]">
      <div className="max-w-[1180px] mx-auto px-[28px]">
        <div className="mb-[56px]">
         
          <h2 className="text-[28px] md:text-[42px] font-[700] text-white">
            Designed for reliable ASIC miner repairs.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[28px]">
          {points.map((point) => (
            <div key={point.title} className="border-t-2 border-gold-dim pt-[20px]">
              <h3 className="text-[16.5px] font-[600] text-white mb-[10px]">{point.title}</h3>
              <p className="text-[14px] text-[#9aa0c2]">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
