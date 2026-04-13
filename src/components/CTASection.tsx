export function CTASection() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/[0.04] to-transparent" />
      </div>

      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium text-foreground mb-8 tracking-[-0.03em] leading-[1.1]">
          Your outreach deserves
          <br />
          to feel personal
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#"
            className="group inline-flex items-center gap-2.5 px-6 py-3 text-[15px] font-medium text-white bg-black hover:bg-black/85 rounded-full transition-all"
          >
            Get started
            <svg
              className="size-4 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path d="M3.33 8h9.34M8.67 4l4 4-4 4" />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 text-[15px] font-medium text-black/60 hover:text-black bg-black/[0.04] hover:bg-black/[0.06] border border-black/[0.08] rounded-full transition-all"
          >
            Contact sales
          </a>
        </div>
      </div>
    </section>
  );
}
