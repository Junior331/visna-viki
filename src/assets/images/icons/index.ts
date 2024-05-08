import menu from './menu.svg';
import eye from './eye.svg';
import edit from './edit.svg';
import trash from './trash.svg';
import arrow from './arrow.svg';
import close from './close.svg';
import fallback from '../image_not_found.png';
import AlertTriangle from './alert_triangle.svg';

export const icons = {
  eye,
  edit,
  menu,
  trash,
  close,
  arrow,
  fallback,
  AlertTriangle
};

type IIcons = keyof typeof icons;

export const getImage = (id: IIcons) => {
  return icons[id] ?? icons.fallback;
};
