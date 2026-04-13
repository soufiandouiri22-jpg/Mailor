/** Bust browser cache when hero assets are regenerated (`node scripts/upscale-hero.mjs`). */
const HERO_ASSET_V = "6";

const HERO_WIDTH = 2400;
const HERO_HEIGHT = 1343;

function isAbsoluteHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function getHeroRemoteUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_HERO_IMAGE_URL?.trim();
  if (!raw || !isAbsoluteHttpUrl(raw)) {
    return null;
  }
  return raw;
}

export function HeroDemo() {
  const heroRemoteUrl = getHeroRemoteUrl();
  const q = `?v=${HERO_ASSET_V}`;

  const frame = (
    <div className="rounded-[24px] overflow-hidden relative h-[380px] sm:h-[480px]">
      {heroRemoteUrl ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={heroRemoteUrl}
          alt=""
          width={HERO_WIDTH}
          height={HERO_HEIGHT}
          className="w-full h-full object-cover object-bottom"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          referrerPolicy="no-referrer"
        />
      ) : (
        <picture>
          <source
            srcSet={`/images/hero-bg-2x.avif${q}`}
            type="image/avif"
          />
          <source
            srcSet={`/images/hero-bg-2x.webp${q}`}
            type="image/webp"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/images/hero-bg-2x.jpg${q}`}
            alt=""
            width={HERO_WIDTH}
            height={HERO_HEIGHT}
            className="w-full h-full object-cover object-bottom"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />
        </picture>
      )}
    </div>
  );

  return (
    <section className="px-6 pt-[82px] pb-6">
      <div className="max-w-[1200px] mx-auto">{frame}</div>
    </section>
  );
}
