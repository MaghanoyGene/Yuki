import Parser from 'rss-parser';

const parser = new Parser();
const YOUTUBE_CHANNEL_ID = 'UCrV1Hf5r8P148idjoSfrGEQ';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

let lastVideoId: string | null = null;

export async function checkYouTube(): Promise<string | null> {
  const feed = await parser.parseURL(FEED_URL);
  const latest = feed.items[0];

  if (!latest) return null;

  const videoId = latest.link?.split('=')[1];
  if (videoId !== lastVideoId) {
    lastVideoId = videoId;
    return `📺 New YouTube video: **${latest.title}**\n${latest.link}`;
  }

  return null;
}
