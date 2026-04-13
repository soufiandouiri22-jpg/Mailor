export function TwoPlatforms() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium text-foreground text-center mb-4 tracking-[-0.03em] leading-[1.1]">
          What makes Mailor different
        </h2>

        <div className="grid md:grid-cols-3 gap-3 mt-14">
          <div className="group relative p-8 lg:p-10 rounded-2xl border border-black/[0.06] bg-black/[0.015] hover:bg-black/[0.025] transition-all duration-300 overflow-hidden">
            <div className="relative">
              <h3 className="text-xl lg:text-2xl font-medium text-foreground mb-3 tracking-[-0.01em]">
                Real personalization
              </h3>
              <p className="text-[15px] text-black/40 leading-relaxed mb-8">
                Every email is written using actual context about the recipient,
                not just placeholders or surface-level data.
              </p>
              <a
                href="#creative"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-black/40 hover:text-black/70 transition-colors"
              >
                Learn more
                <span className="text-[11px] transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </div>

          <div className="group relative p-8 lg:p-10 rounded-2xl border border-black/[0.06] bg-black/[0.015] hover:bg-black/[0.025] transition-all duration-300 overflow-hidden">
            <div className="relative">
              <h3 className="text-xl lg:text-2xl font-medium text-foreground mb-3 tracking-[-0.01em]">
                Built on real prospect data
              </h3>
              <p className="text-[15px] text-black/40 leading-relaxed mb-8">
                Mailor analyzes each recipient and their company before writing.
                So every message is relevant from the first line.
              </p>
              <a
                href="#agents"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-black/40 hover:text-black/70 transition-colors"
              >
                Learn more
                <span className="text-[11px] transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </div>

          <div className="group relative p-8 lg:p-10 rounded-2xl border border-black/[0.06] bg-black/[0.015] hover:bg-black/[0.025] transition-all duration-300 overflow-hidden">
            <div className="relative">
              <h3 className="text-xl lg:text-2xl font-medium text-foreground mb-3 tracking-[-0.01em]">
                Follows up and responds
              </h3>
              <p className="text-[15px] text-black/40 leading-relaxed mb-8">
                Choose to let Mailor handle follow-ups, auto-responses, or
                both. Every email still sounds like you wrote it yourself.
              </p>
              <a
                href="#api"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-black/40 hover:text-black/70 transition-colors"
              >
                Learn more
                <span className="text-[11px] transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
