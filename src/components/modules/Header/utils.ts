import { handleClickProps, handleLogoutProps, handleProps } from './@types';

export const handleClick = ({ event, setAnchorEl }: handleClickProps) => {
  setAnchorEl(event.currentTarget);
};

export const handleClose = ({ setAnchorEl }: handleProps) => {
  setAnchorEl(null);
};

export const handleLogout = ({ setAnchorEl, navigate }: handleLogoutProps) => {
  setAnchorEl(null);
  navigate('/');
};
