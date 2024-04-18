import { ReactNode, createContext, useMemo, useState } from "react";

type IMenuProps = {
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
};

const defaultMenu: IMenuProps = {
  isOpen: false,
  setIsOpen: () => {},
};
export const MenuContext = createContext<IMenuProps>(defaultMenu as IMenuProps);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
