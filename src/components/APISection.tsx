"use client";

const apis = [
  {
    title: "Text to Speech API",
    description:
      "Independently rated the leading Text to Speech models. Choose a model to optimize for consistency, latency or emotional control. All support 29+ languages.",
    models: [
      { name: "Mailor Flash", detail: "75ms latency for conversational usecases" },
      { name: "Mailor Multilingual", detail: "Best lifelike consistent speech" },
      { name: "Mailor v3", detail: "Our most expressive model yet" },
    ],
    code: `import { MailorClient } from "@mailor/mailor-js";

const client = new MailorClient({
  apiKey: "YOUR_API_KEY",
});

await client.textToSpeech.convert(
  "JBFqnCBsd6RMkjVDRZzb",
  {
    outputFormat: "mp3_44100_128",
    text: "The first move is what sets everything in motion.",
    modelId: "mailor_multilingual_v2",
  }
);`,
  },
  {
    title: "Speech to Text API",
    description:
      "The most accurate ASR model. Low cost and supporting speaker diarization and character level timestamps.",
    models: [{ name: "Mailor Scribe", detail: "98% accuracy" }],
    code: null,
  },
  {
    title: "Music API",
    description:
      "Studio-grade music with natural language prompts in any genre, style or structure.",
    models: [
      {
        name: "Mailor Music",
        detail: "Trained on licensed data and suitable for commercial use",
      },
    ],
    code: `import { MailorClient } from "@mailor/mailor-js";

const { music } = new MailorClient();

const compositionPlan = await music.compositionPlan.create({
  prompt: "Fast-paced electronic track for a video...",
  musicLengthMs: 10000,
});`,
  },
];

export function APISection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[13px] text-black/40 mb-4">MailorAPI</p>

        <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium text-foreground mb-14 tracking-[-0.03em] leading-[1.1]">
          Or build anything with a
          <br className="hidden sm:block" />
          powerful host of APIs
        </h2>

        <div className="space-y-4">
          {apis.map((api) => (
            <div
              key={api.title}
              className="rounded-2xl border border-black/[0.06] bg-black/[0.015] overflow-hidden"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-6 sm:p-8">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {api.title}
                  </h3>
                  <p className="text-[13px] text-black/40 leading-relaxed mb-5">
                    {api.description}
                  </p>

                  <div className="space-y-2">
                    {api.models.map((model) => (
                      <div
                        key={model.name}
                        className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-black/[0.04]"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 mt-[7px] shrink-0" />
                        <div>
                          <p className="text-[13px] font-medium text-black/70">
                            {model.name}
                          </p>
                          <p className="text-[11px] text-black/35 mt-0.5">
                            {model.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {api.code && (
                  <div className="border-t lg:border-t-0 lg:border-l border-black/[0.04] bg-[#1a1a1a]">
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-1.5 mb-3.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      </div>
                      <pre className="text-[12px] font-mono text-white/50 overflow-x-auto scrollbar-hide leading-[1.7]">
                        <code>{api.code}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
