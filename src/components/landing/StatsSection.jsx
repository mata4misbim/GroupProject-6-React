const stats = [
  { value: "1,200+", label: "Independent Artists" },
  { value: "5,000+", label: "Tracks Available" },
  { value: "1 Year", label: "Supporting Local Music" },
  { value: "Bangkok", label: "& Beyond" },
];

export default function StatsSection() {
  return (
    <section className="mx-[5%] my-12 font-['Plus_Jakarta_Sans',sans-serif] md:mx-[10%]">
      <div className="mb-10 flex items-baseline gap-4 after:h-px after:flex-1 after:bg-linear-to-r after:from-white/15 after:to-transparent after:content-['']">
        <h2 className="text-[22px] font-extrabold uppercase text-white md:text-[28px]">
          Audtlist in numbers
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-3 text-center">
            <span className="text-[36px] font-extrabold leading-none text-accent [text-shadow:0_0_16px_rgba(252,60,68,0.4),0_0_32px_rgba(252,60,68,0.15)] md:text-[52px]">
              {stat.value}
            </span>
            <span className="text-sm font-medium text-white/50">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
