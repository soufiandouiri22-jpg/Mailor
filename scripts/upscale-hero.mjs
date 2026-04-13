import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const jpgPath = resolve(root, "public/images/hero-bg.jpg");
const pngPath = resolve(root, "public/images/hero-bg.png");
const targetWidth = 2400;

async function resolveInput() {
  if (existsSync(pngPath)) {
    const meta = await sharp(pngPath).metadata();
    if (meta.format === "png") {
      return pngPath;
    }
  }
  if (existsSync(jpgPath)) {
    return jpgPath;
  }
  return null;
}

async function run() {
  const input = await resolveInput();
  if (!input) {
    console.error("Missing source: add public/images/hero-bg.jpg or a real public/images/hero-bg.png");
    process.exit(1);
  }

  const meta = await sharp(input).metadata();
  console.log(`Source: ${input.split("/").pop()} → ${meta.width}x${meta.height}, format: ${meta.format}`);

  const ratio = meta.height / meta.width;
  const targetHeight = Math.round(targetWidth * ratio);

  const pipeline = sharp(input).resize(targetWidth, targetHeight, {
    kernel: sharp.kernel.lanczos3,
    fastShrinkOnLoad: false,
  });

  await pipeline
    .clone()
    .avif({ quality: 92, effort: 9, chromaSubsampling: "4:4:4" })
    .toFile(resolve(root, "public/images/hero-bg-2x.avif"));

  await pipeline
    .clone()
    .webp({ nearLossless: true, effort: 6, smartSubsample: false })
    .toFile(resolve(root, "public/images/hero-bg-2x.webp"));

  await pipeline
    .clone()
    .jpeg({ quality: 98, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(resolve(root, "public/images/hero-bg-2x.jpg"));

  for (const f of ["hero-bg-2x.avif", "hero-bg-2x.webp", "hero-bg-2x.jpg"]) {
    const path = resolve(root, `public/images/${f}`);
    const s = await sharp(path).metadata();
    const stats = await import("fs").then((fs) => fs.statSync(path));
    console.log(`${f}: ${s.width}x${s.height}, ${(stats.size / 1024).toFixed(0)}KB`);
  }
}

run().catch(console.error);
