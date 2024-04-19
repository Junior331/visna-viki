import { useContext } from 'react';
import { IconButton } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';
import { Menu } from '@/components/organism';
import { MenuContext } from '@/contexts/Menu';
import { UserContext } from '@/contexts/UserDate';
import { images } from '@/assets/images';
import * as S from './HeaderStyled';

const Header = () => {
  const { user } = useContext(UserContext);
  const { isOpen, setIsOpen } = useContext(MenuContext);

  return (
    <S.Header>
      <div>
        <Menu />
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuOutlined />
        </IconButton>
      </div>
      <S.InfoUser>
        <S.ContainerText>
          <S.Title>{user.username}</S.Title>
          <S.Text>{user.role}</S.Text>
        </S.ContainerText>
        <S.Avatar src={images.DefaultAvatar} alt="User image" />
      </S.InfoUser>
    </S.Header>
  );
};

export { Header };
