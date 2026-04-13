export function HeroSection() {
  return (
    <section className="pt-4 pb-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div>
            <h1
              className="text-[clamp(2.05rem,4.15vw,3.35rem)] font-medium tracking-[-0.03em] leading-[1.1] text-foreground animate-[fadeInUp_0.7s_ease-out_both]"
            >
              Your agent for
              <br />
              personalized email
            </h1>

            <div
              className="flex items-center gap-3 mt-8 animate-[fadeInUp_0.7s_ease-out_0.1s_both]"
            >
              <a
                href="http://localhost:5173/signup"
                className="inline-flex items-center px-6 py-3 text-[15px] font-medium text-white bg-black hover:bg-black/85 rounded-full transition-all"
              >
                Sign up
              </a>
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 text-[15px] font-medium text-black border border-black/[0.15] hover:border-black/[0.25] rounded-full transition-all"
              >
                Contact sales
              </a>
            </div>
          </div>

          <div
            className="lg:pt-4 animate-[fadeInUp_0.7s_ease-out_0.2s_both]"
          >
            <p className="text-[16px] leading-[1.6] text-black/50">
              Powering personalized outreach at scale for the world&apos;s
              fastest-growing teams. From emails written specifically for each
              recipient to automated sending, follow-ups, and performance
              optimization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
