import eye from './eye.svg';
import menu from './menu.svg';
import edit from './edit.svg';
import grid from './grid.png';
import form from './form.png';
import trash from './trash.svg';
import arrow from './arrow.svg';
import close from './close.svg';
import files from './files.svg';
import dollar from './dollar.png';
import invoice from './invoice.svg';
import fallback from '../image_not_found.png';
import AlertTriangle from './alert_triangle.svg';

export const icons = {
  eye,
  edit,
  menu,
  grid,
  form,
  arrow,
  trash,
  close,
  files,
  dollar,
  invoice,
  fallback,
  AlertTriangle
};

type IIcons = keyof typeof icons;

export const getImage = (id: IIcons) => {
  return icons[id] ?? icons.fallback;
};
