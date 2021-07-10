interface PageInterface {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}

export interface AnimesStructure {
  data: {
    Page: {
      pageInfo: PageInterface;
      media: [AnimeStructure];
    };
  };
}

export interface CharactersStructure {
  data: {
    Page: {
      pageInfo: PageInterface;
      characters: [CharacterStructure];
    };
  };
}

interface baseStructure {
  id: number;
  siteUrl: string;
  favourites: number;
}

export interface AnimeStructure extends baseStructure {
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string;
  };
  hashtag: string | null;
  genres: string[];
  averageScore: number;
}

export interface CharacterStructure extends baseStructure {
  name: {
    first: string;
    middle: string;
    last: string;
    full: string;
    native: string;
    userPreferred: string;
  };
  image: {
    large: string;
    medium: string;
  };
  gender: 'Male' | 'Female' | null;
}

export interface TwitterMediaResponse {
  media_id: number;
  media_id_string: string;
  size: number;
  expires_after_secs: number;
  image: { image_type: string; w: number; h: number };
}

export interface TwitterTweetResponse {
  id: number;
  id_str: string;
}

export type DataType = 'anime' | 'character';
