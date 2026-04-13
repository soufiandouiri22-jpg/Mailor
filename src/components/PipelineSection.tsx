"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    label: "Prospect data",
    detail: "Company info, role, recent activity",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: "Mailor writes",
    detail: "Personalized email, unique to each recipient",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    label: "Email sent",
    detail: "Delivered at the optimal time",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <path d="M22 2 11 13" />
        <path d="M22 2 15 22l-4-9-9-4 20-7z" />
      </svg>
    ),
  },
  {
    label: "Reply received",
    detail: "Prospect responds to your outreach",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: "Meeting booked",
    detail: "Calendar invite sent automatically",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="m9 16 2 2 4-4" />
      </svg>
    ),
  },
];

export function PipelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 px-6" ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-16">
          <div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium text-foreground tracking-[-0.03em] leading-[1.1]">
              From prospect to meeting
              <br className="hidden sm:block" />
              in one flow
            </h2>
          </div>
          <div className="lg:pt-2">
            <p className="text-[16px] leading-[1.6] text-black/50">
              Mailor handles the entire outreach pipeline. You upload your
              audience, everything else happens automatically.
            </p>
          </div>
        </div>

        {/* Pipeline visualization */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-[28px] left-0 right-0 h-px bg-black/[0.06] hidden md:block" />

          {/* Animated progress line */}
          <div
            className="absolute top-[28px] left-0 h-px bg-black/20 hidden md:block transition-all duration-[4s] ease-out"
            style={{ width: visible ? "100%" : "0%" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-0">
            {steps.map((step, i) => (
              <div
                key={step.label}
                className="relative flex md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-0 transition-all duration-1000 ease-out"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  transitionDelay: `${i * 400}ms`,
                }}
              >
                {/* Node */}
                <div className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl border border-black/[0.08] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] text-black/50">
                  {step.icon}
                </div>

                {/* Label */}
                <div className="md:mt-5">
                  <p className="text-[14px] font-medium text-foreground">
                    {step.label}
                  </p>
                  <p className="text-[13px] text-black/35 mt-1 max-w-[180px] leading-relaxed">
                    {step.detail}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
