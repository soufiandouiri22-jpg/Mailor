"use client";

import { useEffect, useRef, useState } from "react";

export function AgentsSection() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartVisible, setChartVisible] = useState(false);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setChartVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="agents" className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header: two-column */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-6">
          <div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium text-foreground tracking-[-0.03em] leading-[1.1] mb-8">
              Personalized emails outperform
              <br className="hidden sm:block" />
              generic outreach
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
              Messages written for one person feel different. They drive more
              replies, more conversations, and more meetings for your sales
              team.
            </p>
          </div>
        </div>

        {/* Two large cards */}
        <div className="grid md:grid-cols-2 gap-3 mt-14">
          {/* Left card: Chat demo with gradient background */}
          <div className="relative rounded-2xl overflow-hidden min-h-[480px] flex flex-col">
            {/* Background image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/drxbl5qgb/image/upload/v1775835524/image_b7yrxj.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />

            {/* Email thread */}
            <div className="relative flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="max-w-sm mx-auto w-full space-y-2.5">
                {/* Original email by Mailor */}
                <div className="rounded-2xl bg-white/90 shadow-sm p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-black/40">
                      <span className="text-black/30">To:</span>
                      <span className="text-black/70 font-medium">
                        daniel@adscale.co
                      </span>
                    </div>
                    <span className="text-[9px] text-black/20">via Mailor</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-black/40">
                    <span className="text-black/30">Subject:</span>
                    <span className="text-black/70 font-medium">AdScale</span>
                  </div>
                  <div className="h-px bg-black/[0.06]" />
                  <p className="text-[12px] text-black/70 leading-relaxed">
                    Saw you have been at AdScale for over 4 years, impressive.
                    Noticed you are leading paid campaigns. Curious how you are
                    managing creative as things scale?
                  </p>
                </div>

                {/* Reply from Daniel */}
                <div className="rounded-2xl bg-white/60 shadow-sm p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-black/70 font-medium">
                      Daniel replied
                    </span>
                    <span className="text-[9px] text-black/20">2h later</span>
                  </div>
                  <div className="h-px bg-black/[0.06]" />
                  <p className="text-[12px] text-black/60 leading-relaxed">
                    Hey! Yeah it&apos;s been a ride. We&apos;re actually
                    struggling with that right now. Would love to hear what
                    you have in mind.
                  </p>
                </div>

                {/* Auto follow-up by Mailor */}
                <div className="rounded-2xl bg-white/90 shadow-sm p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-black/70 font-medium">
                      Mailor auto-reply
                    </span>
                    <span className="text-[9px] text-black/20">instant</span>
                  </div>
                  <div className="h-px bg-black/[0.06]" />
                  <p className="text-[12px] text-black/70 leading-relaxed">
                    Great to hear, Daniel. Happy to walk you through how
                    teams like yours are handling this. Pick a time that
                    works for you:
                  </p>
                  <a
                    href="#"
                    className="inline-block mt-1 px-3 py-1.5 rounded-lg bg-black/[0.06] text-[11px] text-black/50 hover:text-black/70 transition-colors"
                  >
                    calendly.com/mailor/intro
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom label */}
            <div className="relative px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8">
              <h3 className="text-[15px] font-semibold text-white/90 mb-1.5">
                Personalized outreach
              </h3>
              <p className="text-[14px] text-white/60 leading-relaxed">
                Every email is written specifically for the recipient, using
                real context about them and their company.
              </p>
            </div>
          </div>

          {/* Right card: Conversion comparison chart */}
          <div
            ref={chartRef}
            className="relative rounded-2xl overflow-hidden min-h-[480px] flex flex-col bg-[#f2f0ec]"
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  @keyframes draw-personalized {
                    from { stroke-dashoffset: 500; }
                    to { stroke-dashoffset: 0; }
                  }
                  @keyframes draw-generic {
                    from { stroke-dashoffset: 500; }
                    to { stroke-dashoffset: 0; }
                  }
                  @keyframes fill-appear {
                    from { opacity: 0; }
                    to { opacity: 1; }
                  }
                  .chart-visible .line-personalized {
                    stroke-dasharray: 500;
                    stroke-dashoffset: 500;
                    animation: draw-personalized 2s ease-out forwards;
                  }
                  .chart-visible .line-generic {
                    stroke-dasharray: 500;
                    stroke-dashoffset: 500;
                    animation: draw-generic 2s ease-out 0.3s forwards;
                  }
                  .chart-visible .fill-personalized {
                    opacity: 0;
                    animation: fill-appear 1s ease-out 1.5s forwards;
                  }
                  .line-personalized {
                    stroke-dasharray: 500;
                    stroke-dashoffset: 500;
                  }
                  .line-generic {
                    stroke-dasharray: 500;
                    stroke-dashoffset: 500;
                  }
                  .fill-personalized {
                    opacity: 0;
                  }
                `,
              }}
            />
            <div className="flex-1 p-6 sm:p-8 lg:p-10">
              <div className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-black/[0.04]">
                <p className="text-[13px] text-black/40 mb-0.5">
                  Reply rate comparison
                </p>
                <p className="text-[28px] font-semibold text-foreground tracking-[-0.02em] mb-4">
                  4.2× higher
                </p>

                {/* Chart area */}
                <div className="relative h-[160px]">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-black/30 pr-2">
                    <span>30%</span>
                    <span>15%</span>
                    <span>0%</span>
                  </div>

                  {/* Chart grid + lines */}
                  <div className={`ml-8 h-full relative${chartVisible ? " chart-visible" : ""}`}>
                    <div className="absolute inset-0 flex flex-col justify-between">
                      <div className="h-px bg-black/[0.06]" />
                      <div className="h-px bg-black/[0.06]" />
                      <div className="h-px bg-black/[0.06]" />
                    </div>

                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 300 160"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="personalizedFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgb(16,185,129)" stopOpacity="0.1" />
                          <stop offset="100%" stopColor="rgb(16,185,129)" stopOpacity="0.01" />
                        </linearGradient>
                      </defs>
                      {/* Personalized fill area */}
                      <path
                        className="fill-personalized"
                        d="M0,110 Q30,100 60,88 T120,65 T180,42 T240,28 T300,18 L300,160 L0,160Z"
                        fill="url(#personalizedFill)"
                      />
                      {/* Personalized line (rising) */}
                      <path
                        className="line-personalized"
                        d="M0,110 Q30,100 60,88 T120,65 T180,42 T240,28 T300,18"
                        fill="none"
                        stroke="rgb(16,185,129)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      {/* Generic line (flat/low) */}
                      <path
                        className="line-generic"
                        d="M0,130 Q30,132 60,128 T120,131 T180,129 T240,132 T300,130"
                        fill="none"
                        stroke="rgb(160,160,160)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray="4 3"
                      />
                    </svg>

                    {/* Data point labels */}
                    <div className="absolute" style={{ right: "2%", top: "4%" }}>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] text-black/50 font-medium">
                          26.8% personalized
                        </span>
                      </div>
                    </div>
                    <div className="absolute" style={{ right: "2%", bottom: "14%" }}>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-black/20" />
                        <span className="text-[10px] text-black/30 font-medium">
                          6.4% generic
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* X-axis labels */}
                  <div className="ml-8 flex justify-between text-[10px] text-black/30 mt-1.5">
                    <span>Week 1</span>
                    <span>Week 4</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-black/[0.04]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-0.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-black/40">Mailor personalized</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-0.5 rounded-full bg-black/20 border-dashed" />
                    <span className="text-[10px] text-black/30">Generic outreach</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom label */}
            <div className="px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8">
              <h3 className="text-[15px] font-semibold text-foreground mb-1.5">
                Measurable impact
              </h3>
              <p className="text-[14px] text-black/40 leading-relaxed">
                Personalized emails consistently drive higher reply rates,
                more meetings, and better conversion across every campaign.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
