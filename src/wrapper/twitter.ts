import { TwitterMediaResponse, TwitterTweetResponse } from './../typings/index';
import Twit from 'twit';
import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import createLogger from 'logging';

dotenv.config();

export class TwitterClient {
  private readonly client: Twit;
  public readonly imgSrc: string;
  private readonly logger: createLogger.Logger;

  constructor() {
    this.client = new Twit({
      consumer_key: process.env.TWITTER_API_KEY!,
      consumer_secret: process.env.TWITTER_API_SECRET!,
      access_token: process.env.TWITTER_API_ACCCESS_TOKEN_KEY!,
      access_token_secret: process.env.TWITTER_API_ACCCESS_TOKEN_SECRET!,
    });
    this.imgSrc = path.join(__dirname, '../img');
    this.logger = createLogger('Twitter');
  }

  private async uploadImage(): Promise<TwitterMediaResponse> {
    const image = await fs.readFile(`${this.imgSrc}/final.png`, {
      encoding: 'base64',
    });

    return new Promise((resolve, reject) => {
      this.client.post(
        'media/upload',
        {
          media_data: image,
        },
        (error, data, _) => {
          if (error) {
            this.logger.error('Image Upload Error', error);
            reject(error);
          } else {
            this.logger.info('Image Upload Success');
            resolve(data as TwitterMediaResponse);
          }
        }
      );
    });
  }

  public async tweet(text: string[]): Promise<void> {
    const media = await this.uploadImage();

    try {
      this.client
        .post('statuses/update', {
          status: text[0],
          media_ids: [media.media_id_string],
        })
        .then(async res => {
          const tweetPointer = res.data as TwitterTweetResponse;
          await this.tweetThread(tweetPointer.id_str, text[1]);
        });

      this.logger.info('Success Tweeting', text[0]);
    } catch (error) {
      this.logger.error('Tweeting Error', error);
    }
  }

  private async tweetThread(id: string, text: string): Promise<void> {
    try {
      await this.client.post('statuses/update', {
        status: text,
        in_reply_to_status_id: id,
        auto_populate_reply_metadata: true,
      });
      this.logger.info('Success Adding Tweet Thread');
    } catch (error) {
      this.logger.warn('Warning Text Too Longer', error);
      const tweetPartOne = text.slice(0, Math.round(text.length / 2));
      const tweetPartTwo = text.slice(Math.round(text.length / 2), text.length);

      this.logger.debug('Trying Splitting Tweet Thread');
      this.client
        .post('statuses/update', {
          status: tweetPartOne,
          in_reply_to_status_id: id,
          auto_populate_reply_metadata: true,
        })
        .then(async res => {
          const tweetPointer = res.data as TwitterTweetResponse;
          await this.tweetThread(tweetPointer.id_str, tweetPartTwo);
        });
    }
  }
}
