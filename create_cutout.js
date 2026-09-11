import sharp from 'sharp';
import fs from 'fs';

async function makeCutout(inputPath, outputPath) {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Check if pixel is near white / background
    // If r, g, b are all high and saturation is very low
    const brightness = (r + g + b) / 3;
    const maxVal = Math.max(r, g, b);
    const minVal = Math.min(r, g, b);
    const diff = maxVal - minVal;

    if (brightness > 235 && diff < 20) {
      data[i + 3] = 0; // Pure transparent
    } else if (brightness > 215 && diff < 30) {
      // Smooth feathering
      const alpha = Math.max(0, Math.min(255, (240 - brightness) * 10));
      data[i + 3] = Math.round(alpha);
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels
    }
  })
  .png()
  .toFile(outputPath);

  console.log(`Saved transparent cutout to ${outputPath}`);
}

async function main() {
  const leftInput = 'C:\\Users\\sunny\\.gemini\\antigravity-ide\\brain\\c95984ec-5dd9-4239-94e6-cd80d23d4685\\vibrant_ribbon_left_1788961770626.jpg';
  const leftOutput = 'f:\\RitzTek\\flowers-Bloom\\public\\images\\green_ribbon_left.png';
  await makeCutout(leftInput, leftOutput);

  const rightInput = 'C:\\Users\\sunny\\.gemini\\antigravity-ide\\brain\\c95984ec-5dd9-4239-94e6-cd80d23d4685\\green_silk_ribbon_flow_1788967447226.jpg';
  const rightOutput = 'f:\\RitzTek\\flowers-Bloom\\public\\images\\green_ribbon_right.png';
  await makeCutout(rightInput, rightOutput);
}

main().catch(console.error);
