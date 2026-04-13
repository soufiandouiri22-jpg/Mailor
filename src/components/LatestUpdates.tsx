const updates = [
  {
    title: "How a 3 person agency booked 47 meetings in 30 days with Mailor",
    category: "Agency",
    date: "Mar 2026",
    hue: 160,
  },
  {
    title: "From 2% to 19% reply rate: how ScaleUp switched from generic to personalized",
    category: "SaaS",
    date: "Feb 2026",
    hue: 210,
  },
  {
    title: "How a recruiting firm cut sourcing time by 70% using Mailor Templates",
    category: "Recruiting",
    date: "Jan 2026",
    hue: 270,
  },
];

export function LatestUpdates() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium text-foreground mb-12 tracking-[-0.03em] leading-[1.1] text-center">
          Real results from teams
          <br className="hidden sm:block" />
          using Mailor
        </h2>

        <div className="grid sm:grid-cols-3 gap-3">
          {updates.map((update) => (
            <a
              key={update.title}
              href="#"
              className="group p-4 rounded-xl border border-black/[0.06] bg-black/[0.015] hover:bg-black/[0.025] transition-all"
            >
              <div
                className="aspect-[16/10] rounded-lg border border-black/[0.04] mb-4"
                style={{
                  background: `linear-gradient(135deg, hsl(${update.hue} 50% 92%), hsl(${update.hue} 40% 96%))`,
                }}
              />
              <h3 className="text-[14px] font-semibold text-foreground mb-3 leading-snug group-hover:text-black/70 transition-colors">
                {update.title}
              </h3>
              <div className="flex items-center gap-3 text-[11px] text-black/30">
                <span className="px-2 py-0.5 rounded-full bg-black/[0.03] border border-black/[0.05]">
                  {update.category}
                </span>
                <span>{update.date}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
