import { serviceKey } from './../config/serviceAccountKey';
import admin, { ServiceAccount } from 'firebase-admin';
import { AnimeStructure, CharacterStructure } from 'src/typings';
import createLogger from 'logging';

export class Firebase {
  private readonly client: admin.app.App;
  private readonly db: FirebaseFirestore.Firestore;
  private readonly animeRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  private readonly characterRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  private readonly logger: createLogger.Logger;

  public constructor() {
    this.client = admin.initializeApp({
      credential: admin.credential.cert(serviceKey as ServiceAccount),
    });
    this.db = this.client.firestore();
    this.animeRef = this.db.collection('animes');
    this.characterRef = this.db.collection('characters');
    this.logger = createLogger('Firebase');
  }

  public async isAnimeExist(anime: AnimeStructure): Promise<boolean> {
    const doc = await this.animeRef.doc(String(anime.id)).get();

    return doc.exists ? true : false;
  }

  public async addAnime(anime: AnimeStructure): Promise<void> {
    await this.animeRef.doc(String(anime.id)).set(anime);
    this.logger.info('Adding anime', anime.title.userPreferred);
  }

  public async isCharacterExist(
    character: CharacterStructure
  ): Promise<boolean> {
    const doc = await this.characterRef.doc(String(character.id)).get();

    return doc.exists ? true : false;
  }

  public async addCharacter(character: CharacterStructure): Promise<void> {
    await this.characterRef.doc(String(character.id)).set(character);
    this.logger.info('Adding characters', character.name.userPreferred);
  }
}
