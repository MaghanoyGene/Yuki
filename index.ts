import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { checkYouTube } from './youtube';
import { checkTwitter } from './twitter';

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const TOKEN = process.env.DISCORD_TOKEN!;
const CHANNEL_ID = process.env.CHANNEL_ID!;

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user?.tag}`);

  setInterval(async () => {
    const channel = await client.channels.fetch(CHANNEL_ID);
    if (!channel?.isTextBased()) return;

    const ytUpdate = await checkYouTube();
    if (ytUpdate) channel.send(ytUpdate);

    const twitterUpdate = await checkTwitter();
    if (twitterUpdate) channel.send(twitterUpdate);
  }, 60000);
});

client.login(TOKEN);
