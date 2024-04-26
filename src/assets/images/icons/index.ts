import arrow from './arrow.svg';
import close from './close.svg';
import fallback from '../image_not_found.png';

export const icons = {
  close,
  arrow,
  fallback
};

type IIcons = keyof typeof icons;

export const getImage = (id: IIcons) => {
  return icons[id] ?? icons.fallback;
};
