import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto('https://wear-made-style.base44.app/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 5000));
  
  const data = await page.evaluate(() => {
    const texts = Array.from(document.querySelectorAll('div, span, p, h1, h2, h3, h4, h5'))
      .map(e => {
        if (e.children.length === 0) return e.innerText;
        return null;
      })
      .filter(t => t && t.trim().length > 0);
    const imgs = Array.from(document.querySelectorAll('img')).map(img => img.src);
    return JSON.stringify({ texts: Array.from(new Set(texts)), imgs: Array.from(new Set(imgs)) }, null, 2);
  });
  
  fs.writeFileSync('output.json', data, 'utf-8');
  await browser.close();
})();
