import DefaultAvatar from './Image.svg';
import ProjectTest from './project_test.svg';
import Illustration from './Illustration.svg';

interface IImage<TValue> {
  [id: string]: TValue;
}

const images: IImage<string> = {
  ProjectTest,
  Illustration,
  DefaultAvatar
};

export const getImage = (id: string) => images[id];

export default images;
