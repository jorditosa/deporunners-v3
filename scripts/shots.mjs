// ponytail: one-off Play Store screenshot grabber. Delete after use.
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:5173';
const OUT = 'store-screenshots';
// 9:16 viewport (Play requires w/h between 9:16 and 16:9); dpr 2 -> 810x1440 px
const pages = [
  ['/onboarding', 'onboarding'],
  ['/login', 'login'],
  ['/register', 'register'],
];

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 405, height: 720 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

for (const [path, name] of pages) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800); // let animations settle
  const file = `${OUT}/${name}.png`;
  await page.screenshot({ path: file });
  console.log('saved', file, '->', page.url());
}

await browser.close();
