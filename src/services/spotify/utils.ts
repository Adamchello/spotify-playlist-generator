import { Track } from './types';

export const millisToMinutesAndSeconds = (millis: number) => {
  return new Intl.DateTimeFormat('en', {
    minute: 'numeric',
    second: 'numeric',
  }).format(millis);
};

export const getAlbumImage = (track: Track) => {
  const albumImage = track.album.images.find((image) => image.height === 64);

  return albumImage !== undefined ? albumImage.url : '';
};

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// getNumberWithSpaces functionality:
// 1000000 => "1 000 000"
// 10000 => "10 000"
function getNumberWithSpaces(givenNumber: number) {
  return givenNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export const getPlaysNumber = (trackPopularity: number) => {
  const randomNumber = getRandomNumber(1000, 100000);
  const playsNumber = randomNumber * (trackPopularity + 1);

  return getNumberWithSpaces(playsNumber);
};
