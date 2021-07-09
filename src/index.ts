import { Client } from './wrapper/anilist';
import { randomNumber, randomType } from './utils/randomizer';
import { Firebase } from './wrapper/firebase';

const apolloClient = new Client();
const firebase = new Firebase();

(async () => {
  const type = randomType();
  const { n, nPage } = randomNumber(type);

  if (type === 'anime') {
    const anime = await apolloClient.getRandomAnime(nPage, n);
    const isAnimeExist = await firebase.isAnimeExist(anime);
    if (!isAnimeExist) {
      await firebase.addAnime(anime);
    }
  } else if (type === 'character') {
    const character = await apolloClient.getRandomCharacter(nPage, n);
    const isCharacterExist = await firebase.isCharacterExist(character);
    if (!isCharacterExist) {
      await firebase.addCharacter(character);
    }
  }
})();
