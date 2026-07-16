const items = [
  "ASIC MINER REPAIR",
  "HASHBOARD DIAGNOSTICS",
  "PSU REPAIR",
  "DEEP CLEANING",
  "SPARE PARTS",
  "MINING HOSTING",
  "ABU DHABI · UAE",
];

const Ticker = () => {
  const track = [...items, ...items];

  return (
    <div className="border-t border-b border-navy-line py-[20px] overflow-hidden bg-navy-panel">
      <style>{`
        @keyframes ticker-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
      <div
        className="flex w-max items-center gap-[48px] whitespace-nowrap font-mono text-[13px] text-[#9aa0c2] tracking-[0.05em] uppercase will-change-transform"
        style={{ animation: "ticker-scroll 20s linear infinite" }}
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-[48px]"
          >
            <span>{item}</span>
            {index < track.length - 1 && <span>•</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
