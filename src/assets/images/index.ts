import Illustration from './Illustration.svg';

interface IImage<TValue> {
  [id: string]: TValue;
}

const images: IImage<string> = {
  Illustration
};

export const getImage = (id: string) => images[id];

export default images;
