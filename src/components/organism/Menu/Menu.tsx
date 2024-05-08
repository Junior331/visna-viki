import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  List,
  Paper,
  Collapse,
  IconButton,
  Typography,
  ListItemButton,
  ListItemText,
  ListSubheader
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  HighlightOffRounded
} from '@mui/icons-material';
import { icons } from '@/assets/images/icons';
import { MenuContext } from '@/contexts/Menu';
import * as S from './MenuStyled';

const Menu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { isOpen, setIsOpen } = useContext(MenuContext);

  const handleClick = () => {
    setOpen(false);
    setIsOpen(false);
    navigate('/home');
  };

  return (
    <S.MenuContainer>
      <S.Drawer open={isOpen} className="drawerContainer">
        <Paper sx={{ width: 320, maxWidth: '100%' }}>
          <S.Header>
            <Typography variant="body2" color="text.secondary">
              Menu
            </Typography>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              <HighlightOffRounded />
            </IconButton>
          </S.Header>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                PROJETOS
              </ListSubheader>
            }
          >
            <ListItemButton onClick={() => setOpen(!open)}>
              <S.Icon src={icons.dollar} alt="Icon dollar" />
              <ListItemText primary="Contas" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleClick()}>
                  <S.Icon src={icons.form} alt="Icon form" />
                  <ListItemText primary="Despesas" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Paper>
      </S.Drawer>
    </S.MenuContainer>
  );
};

export { Menu };
