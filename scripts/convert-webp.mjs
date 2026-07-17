import sharp from "sharp";
import { join } from "path";
import { fileURLToPath } from "url";

const publicDir = join(fileURLToPath(import.meta.url), "../../public");

const targets = ["technician.jpg", "23782.jpg", "EPM-Hero.png", "EMP-preview.png"];

for (const file of targets) {
  const input = join(publicDir, file);
  const output = join(publicDir, file.replace(/\.(jpg|png)$/i, ".webp"));
  const { width, height } = await sharp(input).metadata();
  await sharp(input).webp({ quality: 82 }).toFile(output);
  console.log(`${file} → ${file.replace(/\.(jpg|png)$/i, ".webp")} (${width}x${height})`);
}
