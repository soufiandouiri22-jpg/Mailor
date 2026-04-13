"use client";

import { MicIcon, WaveformIcon, PlayIcon } from "./icons";

const features = [
  {
    title: "Ultra-realistic speech",
    description:
      "Create controllable, expressive speech layered across 70+ languages.",
    icon: MicIcon,
  },
  {
    title: "Music",
    description:
      "Generate studio-quality tracks instantly, any genre, any style, vocals or instrumental.",
    icon: WaveformIcon,
  },
  {
    title: "SFX",
    description:
      "Create custom sound effects, soundscapes and ambient audio or search the SFX library.",
    icon: WaveformIcon,
  },
  {
    title: "Voices",
    description:
      "Clone a replica of your own voice, design one from a prompt, or explore 1000s of voices from the library.",
    icon: MicIcon,
  },
  {
    title: "Image & Video",
    description:
      "Create or edit images and turn ideas into videos with leading models like Veo, Sora, Wan, Kling and Seedance.",
    icon: PlayIcon,
  },
];

export function CreativeSection() {
  return (
    <section id="creative" className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[13px] text-black/40 mb-4">MailorCreative</p>

        <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium text-foreground mb-4 tracking-[-0.03em] leading-[1.1]">
          Create, edit and localize
          <br className="hidden sm:block" />
          in one AI platform
        </h2>

        <p className="text-[15px] sm:text-base text-black/40 max-w-2xl mb-14 leading-relaxed">
          Create ultra-realistic speech, turn ideas into videos, compose music
          in any genre, or design immersive sound effects. Craft your next film,
          ad, audiobook, or podcast with our all-in-one platform.
        </p>

        <div className="mb-10">
          <div className="rounded-2xl border border-black/[0.06] bg-black/[0.015] overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              <h3 className="text-lg font-semibold text-foreground mb-1.5">
                All-in-one AI editor
              </h3>
              <p className="text-[14px] text-black/40 mb-8 max-w-lg">
                Create podcasts, audiobooks and voiceovers in an editor built on
                all of Mailor&apos;s email research combined.
              </p>

              <div className="rounded-xl border border-black/[0.05] bg-white p-5">
                <div className="flex gap-3">
                  <div className="w-0.5 rounded-full bg-emerald-400/30 shrink-0" />
                  <p className="text-[13px] text-black/40 leading-[1.9]">
                    In the ancient land of Eldoria, where skies shimmered and
                    forests, whispered secrets to the wind, lived a dragon named
                    Zephyros.{" "}
                    <span className="text-emerald-600/50">[sarcastically]</span>{" "}
                    Not the &ldquo;burn it all down&rdquo; kind...{" "}
                    <span className="text-emerald-600/50">[giggles]</span> but
                    he was gentle, wise, with eyes like old stars.{" "}
                    <span className="text-emerald-600/50">[whispers]</span> Even
                    the birds fell silent when he passed.
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-black/[0.05]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center">
                    <span className="text-[10px] font-medium text-black/40">
                      SO
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-black/70">
                      Spuds Oxley
                    </p>
                    <p className="text-[10px] text-black/30">English</p>
                  </div>
                  <button className="w-7 h-7 rounded-full bg-black flex items-center justify-center hover:bg-black/85 transition-colors">
                    <PlayIcon className="size-3 text-white ml-px" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-5 rounded-xl border border-black/[0.06] bg-black/[0.015] hover:bg-black/[0.025] transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-lg bg-black/[0.04] flex items-center justify-center mb-3.5">
                  <Icon className="size-4 text-black/40" />
                </div>
                <h3 className="text-[14px] font-semibold text-foreground mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-[13px] text-black/35 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          <div className="p-5 rounded-xl border border-black/[0.06] bg-black/[0.015] hover:bg-black/[0.025] transition-all">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-7 h-7 rounded-md bg-[#76B900]/10 border border-[#76B900]/15 flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#76B900]">N</span>
              </div>
              <span className="text-[13px] font-medium text-black/70">
                NVIDIA
              </span>
            </div>
            <p className="text-[13px] text-black/35 leading-relaxed">
              Using synthetic voice technology to power multilingual marketing
              content
            </p>
          </div>
          <div className="p-5 rounded-xl border border-black/[0.06] bg-black/[0.015] hover:bg-black/[0.025] transition-all">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-7 h-7 rounded-md bg-[#58CC02]/10 border border-[#58CC02]/15 flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#58CC02]">D</span>
              </div>
              <span className="text-[13px] font-medium text-black/70">
                Duolingo
              </span>
            </div>
            <p className="text-[13px] text-black/35 leading-relaxed">
              Character voices for learning and marketing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
