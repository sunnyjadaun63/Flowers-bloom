import sharp from 'sharp';
import path from 'path';

const sourceImage = 'public/images/ribbon.png';

// HSL Conversion helpers
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h, s, l];
}

function hslToRgb(h, s, l) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

const colorConfigs = {
  green: {
    targetHue: 0.37, // ~133 deg (Rich Emerald Green)
    satScale: 1.15,
    lightScale: 1.0,
    lightOffset: 0.02
  },
  yellow: {
    targetHue: 0.125, // ~45 deg (Rich Golden Yellow)
    satScale: 1.35,
    lightScale: 1.25,
    lightOffset: 0.08
  },
  pink: {
    targetHue: 0.915, // ~330 deg (Vibrant Rose Pink)
    satScale: 1.1,
    lightScale: 1.2,
    lightOffset: 0.08
  },
  maroon: {
    targetHue: 0.97, // ~350 deg (Deep Burgundy / Wine)
    satScale: 1.05,
    lightScale: 0.72,
    lightOffset: -0.05
  },
  red: {
    targetHue: 0.0, // 0 deg (Classic Red)
    satScale: 1.2,
    lightScale: 1.0,
    lightOffset: 0.0
  }
};

async function generateVariants() {
  const image = sharp(sourceImage);
  const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const pixelCount = width * height;

  console.log(`Processing base ribbon shape: ${width}x${height} with ${pixelCount} pixels...`);

  for (const [colorName, conf] of Object.entries(colorConfigs)) {
    const outBuf = Buffer.alloc(pixelCount * 4);

    for (let p = 0; p < pixelCount; p++) {
      const idx = p * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      const outIdx = p * 4;

      if (a === 0) {
        outBuf[outIdx] = 0;
        outBuf[outIdx + 1] = 0;
        outBuf[outIdx + 2] = 0;
        outBuf[outIdx + 3] = 0;
        continue;
      }

      if (colorName === 'red') {
        // Red is the original base image
        outBuf[outIdx] = r;
        outBuf[outIdx + 1] = g;
        outBuf[outIdx + 2] = b;
        outBuf[outIdx + 3] = a;
        continue;
      }

      // Convert original pixel to HSL to preserve lighting / shadow / specular details
      const [, origS, origL] = rgbToHsl(r, g, b);

      const newS = Math.min(1.0, Math.max(0.15, origS * conf.satScale));
      const newL = Math.min(0.98, Math.max(0.04, origL * conf.lightScale + conf.lightOffset));

      const [newR, newG, newB] = hslToRgb(conf.targetHue, newS, newL);

      outBuf[outIdx] = newR;
      outBuf[outIdx + 1] = newG;
      outBuf[outIdx + 2] = newB;
      outBuf[outIdx + 3] = a;
    }

    const outputPath = path.join('public/images', `ribbon_${colorName}.png`);
    await sharp(outBuf, {
      raw: {
        width,
        height,
        channels: 4
      }
    })
    .png()
    .toFile(outputPath);

    console.log(`✓ Saved ${colorName} variant -> ${outputPath}`);
  }
}

generateVariants().catch(console.error);
