// ponytail: one-off. Opens a real window, YOU log in, it screenshots private pages. Delete after use.
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:5173';
const OUT = 'store-screenshots';
const privatePages = [
  ['/app/dashboard', 'dashboard'],
  ['/app/lists', 'calendari'],
  ['/app/shop', 'botiga'],
  ['/app/profile', 'perfil'],
];

mkdirSync(OUT, { recursive: true });
// headed + persistent so YOUR manual login sticks; viewport 9:16 for Play
const ctx = await chromium.launchPersistentContext('/tmp/depo-pw-profile', {
  headless: false,
  viewport: { width: 405, height: 720 },
  deviceScaleFactor: 2,
});
const page = ctx.pages()[0] ?? await ctx.newPage();

await page.goto(BASE + '/login');
console.log('\n>>> Inicia sessió en la finestra que s\'ha obert. Esperant fins a /app/** ...\n');
await page.waitForURL('**/app/**', { timeout: 180000 }); // 3 min to log in
console.log('Login detectat. Capturant...\n');

for (const [path, name] of privatePages) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200); // let data + animations settle
  const file = `${OUT}/${name}.png`;
  await page.screenshot({ path: file });
  console.log('saved', file, '->', page.url());
}

await ctx.close();
console.log('\nFet.');
