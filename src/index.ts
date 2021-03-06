import { TwitterClient } from './wrapper/twitter';
import { Client } from './wrapper/anilist';
import { randomNumber, randomType } from './utils/randomizer';
import { Firebase } from './wrapper/firebase';
import { downloadImage, joinImage } from './utils/imageManipulator';
import { sleep } from './utils/sleep';
import { tweetFormatter } from './utils/tweetFormatter';
import createLogger from 'logging';

const apolloClient = new Client();
const firebase = new Firebase();
const bot = new TwitterClient();
const logger = createLogger('๐');

(async () => {
  while (true) {
    const type = randomType();
    const { n, nPage } = randomNumber(type);
    logger.info(
      `${type === 'character' ? '๐จโ๐ฉโ๐งโ๐ฆ' : '๐ฌ'} ${type.toUpperCase()} Index: ${
        nPage * 50 + n
      }`
    );

    if (type === 'anime') {
      const anime = await apolloClient.getRandomAnime(nPage, n);
      const isAnimeExist = await firebase.isAnimeExist(anime);
      if (!isAnimeExist) {
        const buffer = await downloadImage(anime.coverImage.extraLarge);
        await joinImage(buffer);
        const tweets = tweetFormatter(anime, type);
        await bot.tweet(tweets);
        await firebase.addAnime(anime);
      } else {
        logger.warn('Anime duplicated');
      }
    } else if (type === 'character') {
      const character = await apolloClient.getRandomCharacter(nPage, n);
      const isCharacterExist = await firebase.isCharacterExist(character);
      if (!isCharacterExist) {
        const buffer = await downloadImage(character.image.large);
        await joinImage(buffer);
        const tweets = tweetFormatter(character, type);
        await bot.tweet(tweets);
        await firebase.addCharacter(character);
      } else {
        logger.warn('Character duplicated');
      }
    }
    logger.info('--------#--------');
    await sleep(90);
  }
})();
