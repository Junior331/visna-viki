// import logo from "./Logo.png";

interface IImage<TValue> {
  [id: string]: TValue;
}

const images: IImage<string> = {
  // logo,
};

export const getImage = (id: string) => images[id];

export default images;
