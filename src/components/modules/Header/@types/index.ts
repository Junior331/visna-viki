import { Dispatch, MouseEvent } from 'react';
import { NavigateFunction } from 'react-router-dom';

export type handleProps = {
  setAnchorEl: Dispatch<React.SetStateAction<HTMLElement | null>>;
};
export type handleClickProps = handleProps & {
  event: MouseEvent<HTMLElement>;
};
export type handleLogoutProps = handleProps & {
  navigate: NavigateFunction;
};
