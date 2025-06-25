import puppeteer from 'puppeteer-core';
import { executablePath } from 'puppeteer';

let lastTweet: string | null = null;

export async function checkTwitter(): Promise<string | null> {
  const browser = await puppeteer.launch({
    executablePath: executablePath(),
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: "new"
  });

  const page = await browser.newPage();

  try {
    await page.goto('https://x.com/yuki_sakuna', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('article');

    const tweet = await page.$eval('article', el => el.textContent?.slice(0, 200));

    if (tweet && tweet !== lastTweet) {
      lastTweet = tweet;
      return `🐦 New tweet from Yuki Sakuna:\n${tweet}\nhttps://x.com/yuki_sakuna`;
    }
  } catch (err) {
    console.error('Twitter scrape failed:', err);
  } finally {
    await browser.close();
  }

  return null;
}
