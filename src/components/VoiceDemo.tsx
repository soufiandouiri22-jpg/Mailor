"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PlayIcon } from "./icons";

const tabs = ["Text to Speech", "Music", "Speech to Text", "Voice Cloning"];

const voices = [
  { name: "Spuds Oxley", desc: "Old Storyteller", initials: "SO", hue: 30 },
  { name: "James", desc: "Husky Storyteller", initials: "J", hue: 160 },
  { name: "Cassidy", desc: "Crisp Podcaster", initials: "C", hue: 200 },
  { name: "Hope", desc: "Social Media", initials: "H", hue: 340 },
  { name: "Michael C. Vincent", desc: "Suspenseful Storyteller", initials: "MV", hue: 270 },
  { name: "Christopher", desc: "British Storyteller", initials: "CB", hue: 230 },
  { name: "Adam", desc: "Dark Storyteller", initials: "A", hue: 210 },
  { name: "Mark", desc: "Friendly Companion", initials: "M", hue: 170 },
  { name: "Peter", desc: "Confident Storyteller", initials: "P", hue: 20 },
  { name: "Arabella", desc: "Romance Storyteller", initials: "A", hue: 350 },
  { name: "Jessica Anne Bogart", desc: "Romance Storyteller", initials: "JB", hue: 300 },
  { name: "Ian Cartwell", desc: "Mystery Storyteller", initials: "IC", hue: 190 },
];

const sampleText =
  'In the ancient land of Eldoria, where skies shimmered and forests whispered secrets to the wind, lived a dragon named Zephyros. [sarcastically] Not the "burn it all down" kind... [giggles] but he was gentle, wise, with eyes like old stars. [whispers] Even the birds fell silent when he passed.';

export function VoiceDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedVoice, setSelectedVoice] = useState(0);

  return (
    <section className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2 mb-10 overflow-x-auto scrollbar-hide pb-1">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={cn(
                "px-4 py-2 text-[13px] font-medium rounded-full border transition-all whitespace-nowrap",
                activeTab === i
                  ? "bg-black text-white border-black"
                  : "text-black/40 hover:text-black/60 border-black/[0.08] hover:border-black/[0.12] bg-transparent"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <p className="text-lg sm:text-xl text-black/40 mb-10 max-w-xl leading-relaxed">
          Transform text into lifelike speech across 70+ languages
        </p>

        <div className="grid lg:grid-cols-[1fr,380px] gap-6 items-start">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {voices.map((voice, i) => (
              <button
                key={voice.name}
                onClick={() => setSelectedVoice(i)}
                className={cn(
                  "group relative flex flex-col items-center gap-2.5 p-3.5 rounded-xl border transition-all text-center",
                  selectedVoice === i
                    ? "border-black/[0.12] bg-black/[0.03]"
                    : "border-transparent hover:border-black/[0.06] bg-black/[0.01] hover:bg-black/[0.02]"
                )}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: `linear-gradient(135deg, hsl(${voice.hue} 50% 85%), hsl(${voice.hue} 40% 75%))`,
                  }}
                >
                  <span className="text-sm font-medium text-black/50">
                    {voice.initials}
                  </span>
                </div>
                <div className="min-w-0 w-full">
                  <p className="text-[13px] font-medium text-black/80 truncate">
                    {voice.name}
                  </p>
                  <p className="text-[11px] text-black/30 mt-0.5 truncate">
                    {voice.desc}
                  </p>
                </div>
                <div
                  className={cn(
                    "absolute top-2.5 right-2.5 transition-opacity",
                    selectedVoice === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  )}
                >
                  <PlayIcon className="size-3.5 text-black/30" />
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-3 lg:sticky lg:top-24">
            <div className="p-5 rounded-xl border border-black/[0.06] bg-black/[0.015]">
              <p className="text-[13px] text-black/40 leading-[1.8]">
                {sampleText}
              </p>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-black/[0.06] bg-black/[0.015]">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: `linear-gradient(135deg, hsl(${voices[selectedVoice].hue} 50% 85%), hsl(${voices[selectedVoice].hue} 40% 75%))`,
                }}
              >
                <span className="text-xs font-medium text-black/50">
                  {voices[selectedVoice].initials}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-black/80 truncate">
                  {voices[selectedVoice].name}
                </p>
                <p className="text-[11px] text-black/30">English</p>
              </div>
              <button className="w-9 h-9 rounded-full bg-black flex items-center justify-center hover:bg-black/85 transition-colors shrink-0">
                <PlayIcon className="size-3.5 text-white ml-0.5" />
              </button>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-[13px] text-black/30 hover:text-black/50 transition-colors pt-1"
            >
              Explore 10,000+ voices
              <span className="text-[11px]">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
