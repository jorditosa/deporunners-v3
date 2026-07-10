// ponytail: one-off Play asset generator (icon 512x512 + feature 1024x500). Delete after use.
import { chromium } from '@playwright/test';
import { mkdirSync, readFileSync } from 'node:fs';

const ROOT = '/Users/js/Documents/apps/deporunners-v3';
const OUT = ROOT + '/store-screenshots/play';
mkdirSync(OUT, { recursive: true });

const dataUri = (p) => 'data:image/png;base64,' + readFileSync(p).toString('base64');
const markSrc = dataUri('/tmp/depo-icon-src.png');
const logoSrc = dataUri('/tmp/depo-logo-src.png');

const icon = `<body style="margin:0"><div style="width:512px;height:512px;background:#fff;display:flex;align-items:center;justify-content:center">
<img src="${markSrc}" style="width:372px;height:372px"></div></body>`;

// brand blues: app accent #29b6f6 -> mark royal #2f4f9e. White wordmark centered.
const feature = `<body style="margin:0"><div style="width:1024px;height:500px;background:linear-gradient(135deg,#2ec0ff 0%,#2f52a0 100%);display:flex;align-items:center;justify-content:center;overflow:hidden">
<img src="${logoSrc}" style="width:600px"></div></body>`;

const browser = await chromium.launch();

const p1 = await browser.newPage({ viewport: { width: 512, height: 512 }, deviceScaleFactor: 1 });
await p1.setContent(icon, { waitUntil: 'networkidle' });
await p1.waitForTimeout(300);
await p1.screenshot({ path: `${OUT}/app-icon-512.png`, clip: { x: 0, y: 0, width: 512, height: 512 } });

const p2 = await browser.newPage({ viewport: { width: 1024, height: 500 }, deviceScaleFactor: 1 });
await p2.setContent(feature, { waitUntil: 'networkidle' });
await p2.waitForTimeout(300);
await p2.screenshot({ path: `${OUT}/feature-graphic-1024x500.png`, clip: { x: 0, y: 0, width: 1024, height: 500 } });

await browser.close();
console.log('done');
