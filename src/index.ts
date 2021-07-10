import { TwitterClient } from './wrapper/twitter';
import { Client } from './wrapper/anilist';
import { randomNumber, randomType } from './utils/randomizer';
import { Firebase } from './wrapper/firebase';
import { downloadImage, joinImage } from './utils/imageManipulator';
import { sleep } from './utils/sleep';

const apolloClient = new Client();
const firebase = new Firebase();
const bot = new TwitterClient();

(async () => {
  while (true) {
    const type = randomType();
    const { n, nPage } = randomNumber(type);

    if (type === 'anime') {
      const anime = await apolloClient.getRandomAnime(nPage, n);
      const isAnimeExist = await firebase.isAnimeExist(anime);
      if (!isAnimeExist) {
        const buffer = await downloadImage(anime.coverImage.extraLarge);
        await joinImage(buffer);
        await bot.tweet(
          `${anime.title.userPreferred} (${anime.title.native}/${anime.title.romaji}) jelek`
        );
        await firebase.addAnime(anime);
      }
    } else if (type === 'character') {
      const character = await apolloClient.getRandomCharacter(nPage, n);
      const isCharacterExist = await firebase.isCharacterExist(character);
      if (!isCharacterExist) {
        const buffer = await downloadImage(character.image.large);
        await joinImage(buffer);
        await bot.tweet(
          `${character.name.userPreferred} (${character.name.native}) jelek`
        );
        await firebase.addCharacter(character);
      }
    }
    await sleep(30);
  }
})();
