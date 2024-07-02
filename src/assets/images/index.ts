import DefaultAvatar from './Image.svg';
import logoVisna from './logo_visna.svg';
import background from './background.png';
import fallback from './image_not_found.png';
import ProjectTest from './project_test.svg';
import Illustration from './Illustration.svg';

export const images = {
  fallback,
  logoVisna,
  background,
  ProjectTest,
  Illustration,
  DefaultAvatar
};

type IImage = keyof typeof images;

export const getImage = (id: IImage) => {
  return images[id] ?? images.fallback;
};
