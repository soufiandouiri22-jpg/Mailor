/**
 * Builds square favicons from public/images/mailor-logo.png using letterboxing
 * (fit: 'contain') so the mark keeps its aspect ratio — never stretched.
 *
 * Run after changing the logo: node scripts/generate-favicon-assets.mjs
 */
import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const logoPath = resolve(root, "public/images/mailor-logo.png");
const iconOut = resolve(root, "src/app/icon.png");
const appleOut = resolve(root, "src/app/apple-icon.png");

const containSquare = (size) =>
  sharp(logoPath)
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png();

async function run() {
  await containSquare(128).toFile(iconOut);
  await containSquare(180).toFile(appleOut);
  console.log("Wrote:", iconOut, appleOut);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
