import { ShieldIcon, EyeIcon, CheckCircleIcon } from "./icons";

const cards = [
  {
    title: "Moderation",
    description: "We actively monitor content generated with our technology.",
    icon: ShieldIcon,
  },
  {
    title: "Accountability",
    description: "We believe misuse must have consequences.",
    icon: CheckCircleIcon,
  },
  {
    title: "Provenance",
    description:
      "We believe that you should know if audio is AI-generated.",
    icon: EyeIcon,
  },
];

export function SafetySection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium text-foreground text-center mb-14 tracking-[-0.03em] leading-[1.1]">
          Safety, built in
        </h2>

        <div className="grid sm:grid-cols-3 gap-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group p-6 sm:p-8 rounded-2xl border border-black/[0.06] bg-black/[0.015] hover:bg-black/[0.025] transition-all text-center"
              >
                <div className="w-11 h-11 rounded-xl bg-black/[0.04] flex items-center justify-center mx-auto mb-4">
                  <Icon className="size-5 text-black/30" />
                </div>
                <h3 className="text-[15px] font-semibold text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-[13px] text-black/35 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
