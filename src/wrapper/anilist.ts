import createLogger from 'logging';
import {
  AnimesStructure,
  AnimeStructure,
  CharacterStructure,
  CharactersStructure,
} from './../typings/index';
import { GET_RANDOM_ANIME, GET_RANDOM_CHARACTER } from './../graphql/query';
import request from 'node-superfetch';
import dotenv from 'dotenv';

dotenv.config();

export class Client {
  public readonly url: string;
  private readonly logger: createLogger.Logger;

  public constructor() {
    this.url = process.env.ANILIST_URI!;
    this.logger = createLogger('Anilist');
  }

  public getRandomAnime(nPage: number, index: number): Promise<AnimeStructure> {
    return new Promise((resolve, reject) => {
      request
        .post(this.url)
        .send(
          Object.assign({
            variables: {
              page: nPage,
            },
            query: GET_RANDOM_ANIME,
          })
        )
        .then(data => {
          const animes = data.body as AnimesStructure;
          const anime = animes.data.Page.media[index];
          this.logger.info('Getting Anime Data', anime.title.userPreferred);
          return resolve(anime);
        })
        .catch(reject);
    });
  }

  public getRandomCharacter(
    nPage: number,
    index: number
  ): Promise<CharacterStructure> {
    return new Promise((resolve, reject) => {
      request
        .post(this.url)
        .send(
          Object.assign({
            variables: {
              page: nPage,
            },
            query: GET_RANDOM_CHARACTER,
          })
        )
        .then(data => {
          const characters = data.body as CharactersStructure;
          const character = characters.data.Page.characters[index];
          this.logger.info(
            'Getting Character Data',
            character.name.userPreferred
          );
          return resolve(character);
        })
        .catch(reject);
    });
  }
}
