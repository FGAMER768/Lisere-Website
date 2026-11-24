import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { loadEnv } from 'vite';

const root = process.cwd();
const env = loadEnv('production', root, 'SITE_URL');
const publicHost = (process.env.SITE_URL || env.SITE_URL || 'https://lisere.pages.dev')
  .replace(/^https?:\/\//, '')
  .replace(/\/$/, '');
const iconPath = path.join(root, 'public/brand/lisere-icon.png');
const iconUiPath = path.join(root, 'public/brand/lisere-icon-ui.png');
const backgroundPath = path.join(root, 'src/assets/images/hero/after.jpg');
const ogPath = path.join(root, 'public/og/lisere-og.jpg');
const iconsDir = path.join(root, 'public/icons');

await fs.mkdir(iconsDir, { recursive: true });
await fs.mkdir(path.dirname(ogPath), { recursive: true });

const icon = sharp(iconPath);
const iconUi = sharp(iconUiPath);
const iconFlat = icon.clone().flatten({ background: '#fbf1e4' });

await Promise.all([
  iconFlat.clone().resize(192, 192).png().toFile(path.join(iconsDir, 'icon-192.png')),
  iconFlat.clone().resize(512, 512).png().toFile(path.join(iconsDir, 'icon-512.png')),
  iconFlat.clone().resize(180, 180).png().toFile(path.join(iconsDir, 'apple-touch-icon.png')),
]);

const panel = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="704" height="630" fill="#f4f3f1" />
    <line x1="704" y1="0" x2="704" y2="630" stroke="#d8d5d0" stroke-width="1" />
    <text x="112" y="83" fill="#101014" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="25" font-weight="650" letter-spacing="-0.4">Liseré</text>
    <text x="64" y="232" fill="#101014" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="64" font-weight="650" letter-spacing="-2">Améliorez vos</text>
    <text x="64" y="300" fill="#101014" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="64" font-weight="650" letter-spacing="-2">photos et vidéos,</text>
    <text x="64" y="368" fill="#101014" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="64" font-weight="650" letter-spacing="-2">sur votre PC</text>
    <text x="64" y="450" fill="#55545e" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="21">Moteurs ONNX locaux. Comparaison avant/après.</text>
    <text x="64" y="482" fill="#55545e" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="21">Export JPEG ou MP4, sans envoi de fichier.</text>
    <text x="64" y="564" fill="#0f6b6f" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="17" font-weight="600">Windows 10 et 11 · version 1.3.0</text>
    <text x="64" y="596" fill="#6f6e78" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="15">${publicHost}</text>
  </svg>
`;

const iconBuffer = await iconUi.clone().resize(42, 42).png().toBuffer();

await sharp(backgroundPath)
  .resize(1200, 630, { fit: 'cover', position: 'right' })
  .composite([
    { input: Buffer.from(panel), top: 0, left: 0 },
    { input: iconBuffer, top: 52, left: 64 },
  ])
  .jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
  .toFile(ogPath);

console.log(`OpenGraph image: ${ogPath}`);
console.log('Icons: 192, 512, apple-touch-icon');
