import { useContext } from 'react';
import { Box, Divider } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { MenuContext } from '@/contexts/Menu';
import * as S from './MenuStyled';

const Menu = () => {
  const { isOpen, setIsOpen } = useContext(MenuContext);

  return (
    <S.MenuContainer>
      <Drawer open={isOpen} onClick={() => setIsOpen(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Divider />
        </Box>
      </Drawer>
    </S.MenuContainer>
  );
};

export { Menu };
