import { handleRouterProps } from './@types';

export const handleRouter = ({
  path,
  setOpen,
  navigate,
  setIsOpen
}: handleRouterProps) => {
  setOpen(false);
  setIsOpen(false);
  navigate(path);
};
