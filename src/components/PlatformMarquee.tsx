const tags = [
  { label: "MailorCreative", sub: "Creative", color: "text-emerald-600/60" },
  { label: "MailorAgents", sub: "Agents", color: "text-blue-600/60" },
  { label: "MailorAPI", sub: "API", color: "text-purple-600/60" },
];

export function PlatformMarquee() {
  const items = [...tags, ...tags, ...tags, ...tags, ...tags, ...tags];

  return (
    <section className="py-6 overflow-hidden border-y border-black/[0.04]">
      <div className="flex animate-marquee">
        {items.map((tag, i) => (
          <div key={i} className="flex items-center gap-2.5 mx-6 shrink-0">
            <span className={`text-[13px] font-medium ${tag.color}`}>
              {tag.label}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-medium text-black/30 bg-black/[0.03] rounded-full border border-black/[0.05]">
              {tag.sub}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
