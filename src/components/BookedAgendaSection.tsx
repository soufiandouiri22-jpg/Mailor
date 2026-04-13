"use client";

import { useEffect, useRef, useState } from "react";

const meetings = [
  {
    name: "Daniel van Dijk",
    company: "AdScale",
    time: "Tomorrow, 2:30 PM",
  },
  {
    name: "Sarah Chen",
    company: "Funnel.io",
    time: "Thursday, 10:00 AM",
  },
  {
    name: "Tom de Vries",
    company: "ScaleUp",
    time: "Friday, 14:00 PM",
  },
  {
    name: "Lisa Müller",
    company: "Packhelp",
    time: "Friday, 16:30 PM",
  },
];

export function BookedAgendaSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium text-foreground tracking-[-0.03em] leading-[1.1] mb-8">
              Get a full booked agenda
              <br className="hidden sm:block" />
              every day of the week
            </h2>
            <p className="text-[16px] leading-[1.6] text-black/50 mb-8 max-w-md">
              While you focus on closing, Mailor fills your calendar with
              qualified meetings. Automatically.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 text-[15px] font-medium text-white bg-black hover:bg-black/85 rounded-full transition-all"
            >
              Get started
            </a>
          </div>

          <div ref={listRef} className="space-y-2.5">
            {meetings.map((meeting, i) => (
              <div
                key={meeting.name}
                className="flex items-center gap-4 rounded-xl border border-black/[0.06] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-[1.1s] ease-out"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: `${i * 350}ms`,
                }}
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                  <svg
                    className="size-4 text-emerald-600"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3.5 8.5l3 3 6-7" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-medium text-foreground leading-snug">
                    Meeting booked ·{" "}
                    <span className="text-black/50">{meeting.name}</span>
                    <span className="text-black/25">,</span>{" "}
                    <span className="text-black/40">{meeting.company}</span>
                  </p>
                  <p className="text-[12px] text-black/30 mt-0.5">
                    {meeting.time}
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
