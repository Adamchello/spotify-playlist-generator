import { TrackType } from './types';

export const millisToMinutesAndSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = Number(((millis % 60000) / 1000).toFixed(0));

  return seconds == 60
    ? minutes + 1 + ':00'
    : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

export const getAlbumImage = (track: TrackType) => {
  const albumImage = track.album.images.find((image) => image.height === 64);

  return albumImage !== undefined ? albumImage.url : '';
};

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

function getNumberWithSpaces(givenNumber: number) {
  return givenNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export const getPlaysNumber = (trackPopularity: number) => {
  const randomNumber = getRandomNumber(1000, 100000);
  const playsNumber = randomNumber * (trackPopularity + 1);

  return getNumberWithSpaces(playsNumber);
};
