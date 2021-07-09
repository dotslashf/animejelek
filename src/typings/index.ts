export type AnimesStructure = {
  data: {
    Page: {
      pageInfo: {
        total: number;
        currentPage: number;
        lastPage: number;
        hasNextPage: boolean;
        perPage: number;
      };
      media: [
        {
          id: number;
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
        }
      ];
    };
  };
};

export type CharactersStructure = {
  data: {
    Page: {
      pageInfo: {
        total: number;
        currentPage: number;
        lastPage: number;
        hasNextPage: boolean;
        perPage: number;
      };
      characters: [
        {
          id: number;
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
        }
      ];
    };
  };
};

export type AnimeStructure = {
  id: number;
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
};

export type CharacterStructure = {
  id: number;
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
};

export type DataType = 'anime' | 'character';
