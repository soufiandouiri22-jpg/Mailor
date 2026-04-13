const logos = [
  "NVIDIA",
  "Duolingo",
  "The Washington Post",
  "Storytel",
  "Deutsche Telekom",
  "Uber",
  "Vodafone",
  "Rappi",
];

export function TrustedBy() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="text-lg sm:text-xl font-medium text-black/70 mb-10">
          Trusted by fast-growing teams and agencies
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {logos.map((logo) => (
            <span
              key={logo}
              className="text-[13px] font-medium text-black/20 tracking-wide uppercase"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
