import {
  AnimeStructure,
  CharacterStructure,
  DataType,
} from './../typings/index';
export function tweetFormatter(
  data: AnimeStructure | CharacterStructure,
  type: DataType
): string[] {
  if (type === 'anime') {
    let _data = data as AnimeStructure;
    return `${_data.title.userPreferred} jelek|Title: ${_data.title.userPreferred} (${_data.title.native})\nEnglish Title: ${_data.title.english}\n\nMore Info: ${_data.siteUrl}`.split(
      '|'
    );
  } else {
    let _data = data as CharacterStructure;
    return `${_data.name.userPreferred} jelek|Name: ${_data.name.userPreferred} (${_data.name.full})\n\nMore Info: ${_data.siteUrl}`.split(
      '|'
    );
  }
}
