export const GET_RANDOM_ANIME = `
query($page: Int) {
  Page(page: $page) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    media(type: ANIME, sort: FAVOURITES_DESC) {
      id
      title {
        romaji
        english
        native
        userPreferred
      }
      coverImage {
        extraLarge
        large
        medium
        color
      }
      siteUrl
      hashtag
      genres
      averageScore
      favourites
    }
  }
}`;

export const GET_RANDOM_CHARACTER = `
query($page: Int) {
  Page(page: $page) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    characters(sort: FAVOURITES_DESC) {
      id
      name {
        first
        middle
        last
        full
        native
        userPreferred
      }
      image {
        large
        medium
      }
      siteUrl
      gender
      favourites
    }
  }
}`;
