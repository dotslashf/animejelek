import Twit from 'twit';
import dotenv from 'dotenv';

dotenv.config()

export const twitter = new Twit({
  consumer_key: process.env.TWITTER_API_KEY!,
  consumer_secret: process.env.TWITTER_API_SECRET!,
  access_token: process.env.TWITTER_API_ACCCESS_TOKEN_KEY!,
  access_token_secret: process.env.TWITTER_API_ACCCESS_TOKEN_SECRET
})

