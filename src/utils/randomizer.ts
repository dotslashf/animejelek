import { DataType } from './../typings/index';

const nItems = 50;
const nPageAnime = 10;
const nPageCharacter = 30;

export function randomType(): DataType {
  const n = Math.round(Math.random());

  return n === 1 ? 'character' : 'anime';
}

export function randomNumber(type: DataType): { n: number; nPage: number } {
  let _nPage = null;
  type === 'character' ? (_nPage = nPageCharacter) : (_nPage = nPageAnime);

  const nPage = Math.floor(Math.random() * _nPage + 1);
  const n = Math.floor(Math.random() * nItems);

  return {
    n,
    nPage,
  };
}
