import DefaultAvatar from './Image.svg';
import ProjectTest from './project_test.svg';
import Illustration from './Illustration.svg';
import fallback from './image_not_found.png';

export const images = {
  fallback,
  ProjectTest,
  Illustration,
  DefaultAvatar
};

type IImage = keyof typeof images;

export const getImage = (id: IImage) => {
  return images[id] ?? images.fallback;
};
