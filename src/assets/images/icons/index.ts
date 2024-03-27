// import ice from "./ice.png";

interface IIcons<TValue> {
  [id: string]: TValue;
}

const icons: IIcons<string> = {
  // ice,
};

export const getIcon = (id: string) => icons[id];

export default icons;
