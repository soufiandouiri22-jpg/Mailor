export function PlatformPreview() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Heading + description side by side */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-14">
          <div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium text-foreground tracking-[-0.03em] leading-[1.1] mb-8">
              Stop guessing
              <br className="hidden sm:block" />
              what works
            </h2>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 text-[15px] font-medium text-white bg-black hover:bg-black/85 rounded-full transition-all"
            >
              Learn more
            </a>
          </div>
          <div className="lg:pt-2">
            <p className="text-[16px] leading-[1.6] text-black/50">
              Most teams write outreach from scratch and hope for the best.
              Mailor gives you access to templates ranked by real reply data, so
              every email starts with a structure that&apos;s already proven to
              convert.
            </p>
          </div>
        </div>

        {/* Two cards side by side */}
        <div className="grid md:grid-cols-2 gap-3">
          {/* Left: Head-to-head template comparison */}
          <div className="relative rounded-2xl overflow-hidden min-h-[480px] flex flex-col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/drxbl5qgb/image/upload/v1775909012/image_a48mrg.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />

            <div className="relative z-[1] flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="max-w-sm mx-auto w-full space-y-3">
                {/* Winner: Personalized email */}
                <div className="rounded-2xl bg-white/90 shadow-sm p-4 space-y-2.5 ring-2 ring-emerald-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Template A · 18.4% reply rate
                    </span>
                    <span className="text-[9px] text-emerald-500 font-medium">Winner</span>
                  </div>
                  <div className="h-px bg-black/[0.06]" />
                  <p className="text-[12px] text-black/70 leading-relaxed">
                    Saw you&apos;ve been at AdScale for over 4 years, impressive
                    run. Noticed your post last week about scaling creative
                    production for paid social. Curious if you&apos;ve found a
                    way to keep quality consistent while ramping volume?
                  </p>
                </div>

                {/* Loser: Generic email */}
                <div className="rounded-2xl bg-white/50 shadow-sm p-4 space-y-2.5 opacity-70">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-black/30 bg-black/[0.04] px-2 py-0.5 rounded-full">
                      Template B · 4.1% reply rate
                    </span>
                  </div>
                  <div className="h-px bg-black/[0.06]" />
                  <p className="text-[12px] text-black/40 leading-relaxed">
                    Hi Daniel, I&apos;d love to introduce Mailor. We help
                    companies like yours improve their outreach. Would you be
                    open to a quick call?
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom label */}
            <div className="relative z-[1] px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8">
              <h3 className="text-[15px] font-semibold text-white/90 mb-1.5">
                Tested and ranked
              </h3>
              <p className="text-[14px] text-white/60 leading-relaxed">
                Continuously tested across thousands of real conversations.
                You always start with what works.
              </p>
            </div>
          </div>

          {/* Right: The end result */}
          <div className="relative rounded-2xl overflow-hidden min-h-[480px] flex flex-col bg-[#f2f0ec]">
            <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="max-w-sm mx-auto w-full">
                {/* Template tag */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-medium text-black/30 bg-white px-2.5 py-1 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                    Pain point opener · #1 ranked
                  </span>
                </div>

                {/* The final personalized email */}
                <div className="rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-5 space-y-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-black/40">
                    <span className="text-black/30">To:</span>
                    <span className="text-black/70 font-medium">
                      daniel@adscale.co
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-black/40">
                    <span className="text-black/30">Subject:</span>
                    <span className="text-black/70 font-medium">
                      Creative production at AdScale
                    </span>
                  </div>
                  <div className="h-px bg-black/[0.06]" />
                  <p className="text-[12px] text-black/70 leading-[1.7]">
                    Saw you&apos;ve been at AdScale for over 4 years, impressive
                    run. Noticed your post last week about scaling creative
                    production for paid social. Curious if you&apos;ve found a
                    way to keep quality consistent while ramping volume?
                  </p>
                  <p className="text-[12px] text-black/70 leading-[1.7]">
                    We work with a few teams in paid media facing the same
                    challenge. Happy to walk you through what&apos;s been
                    working for them. Want to grab 15 min?
                  </p>
                  <a
                    href="#"
                    className="inline-block mt-1 px-3 py-1.5 rounded-lg bg-black/[0.06] text-[11px] text-black/50 hover:text-black/70 transition-colors"
                  >
                    calendly.com/alex/intro
                  </a>
                  <p className="text-[12px] text-black/50 leading-[1.7]">
                    Best,
                    <br />
                    Alex
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom label */}
            <div className="px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8">
              <h3 className="text-[15px] font-semibold text-foreground mb-1.5">
                Feels personal. Backed by data.
              </h3>
              <p className="text-[14px] text-black/40 leading-relaxed">
                The recipient sees a personal email. You know it&apos;s built on
                a structure that&apos;s proven to drive meetings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
