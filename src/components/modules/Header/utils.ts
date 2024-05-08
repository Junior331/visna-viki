import { handleLogoutProps } from './@types';

export const handleLogout = ({ setAnchorEl, navigate }: handleLogoutProps) => {
  setAnchorEl(null);
  navigate('/');
};
