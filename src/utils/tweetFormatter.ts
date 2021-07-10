import {
  AnimeStructure,
  CharacterStructure,
  DataType,
} from './../typings/index';
export function tweetFormatter(
  data: AnimeStructure | CharacterStructure,
  type: DataType
): string[] {
  const emojiType = type === 'character' ? '👨‍👩‍👧‍👦' : '🎬';

  if (type === 'anime') {
    let _data = data as AnimeStructure;
    return `${emojiType} ${_data.title.userPreferred} jelek|Title: ${
      _data.title.romaji
    }/${_data.title.english} (${
      _data.title.native
    })\nGenres: ${_data.genres.join(', ')}\nAvg Score/Favourites: ${
      _data.averageScore
    }/${_data.favourites}\nHashtag: ${_data.hashtag}\n\nMore Info: ${
      _data.siteUrl
    }`.split('|');
  } else {
    let _data = data as CharacterStructure;
    let genderEmoji = null;
    if (_data.gender === 'Male') {
      genderEmoji = '♂️';
    } else if (_data.gender === 'Female') {
      genderEmoji = '♀️';
    } else {
      genderEmoji = '❓';
    }
    return `${emojiType} ${_data.name.userPreferred} jelek|${genderEmoji} Name: ${_data.name.full} (${_data.name.native})\nFavourites: ${_data.favourites}\n\nMore Info: ${_data.siteUrl}`.split(
      '|'
    );
  }
}
