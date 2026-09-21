import sharp from 'sharp';
import fs from 'fs';

async function processCutoutAndTrim(inputPath, outputPath) {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const brightness = (r + g + b) / 3;
    const maxVal = Math.max(r, g, b);
    const minVal = Math.min(r, g, b);
    const diff = maxVal - minVal;

    // Detect white/light background
    if (brightness > 238 && diff < 16) {
      data[i + 3] = 0; // pure transparent
    } else if (brightness > 215 && diff < 26) {
      const alpha = Math.max(0, Math.min(255, (240 - brightness) * 10));
      data[i + 3] = Math.round(alpha);
    }
  }

  // Create transparent buffer and trim excess empty transparent space
  const processed = await sharp(data, {
    raw: { width, height, channels }
  })
  .png()
  .trim() // automatically trims transparent borders
  .toBuffer();

  fs.writeFileSync(outputPath, processed);
  const meta = await sharp(outputPath).metadata();
  console.log(`Saved trimmed cutout to ${outputPath} (${meta.width}x${meta.height})`);
}

async function main() {
  await processCutoutAndTrim('public/images/Peony_Flowers_Left.png', 'public/images/peony_left.png');
  await processCutoutAndTrim('public/images/Peony_Flowers_Right.png', 'public/images/peony_right.png');
}

main().catch(console.error);
