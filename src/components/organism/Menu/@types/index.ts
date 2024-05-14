// export type Props = {};

import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';

export type handleRouterProps = {
  path: string;
  navigate: NavigateFunction;
  setIsOpen: (status: boolean) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
