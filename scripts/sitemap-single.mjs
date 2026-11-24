import { copyFile } from 'node:fs/promises';

try {
  await copyFile('dist/sitemap-0.xml', 'dist/sitemap.xml');
  console.log('Created dist/sitemap.xml');
} catch (error) {
  console.error(`Could not create dist/sitemap.xml: ${error.message}`);
  process.exitCode = 1;
}
