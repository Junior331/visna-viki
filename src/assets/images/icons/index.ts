import arrow from './arrow.svg';

interface IIcons<TValue> {
  [id: string]: TValue;
}

const icons: IIcons<string> = {
  arrow
};

export const getIcon = (id: string) => icons[id];

export default icons;
