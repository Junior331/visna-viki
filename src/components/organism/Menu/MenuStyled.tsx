import { Drawer as MuiDrawer } from '@mui/material';
import styled from 'styled-components';

export const ContainerGeneric = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MenuContainer = styled(ContainerGeneric)`
  width: auto;
`;
export const Drawer = styled(MuiDrawer)``;
export const Header = styled(ContainerGeneric)`
  width: auto;
  padding-left: 10px;
  border-bottom: 2px solid #ebe9f1;
  > p {
    color: ${({ theme }) => theme.palette.background.regular};
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
    font-size: ${({ theme }) => theme.typography.fontSizeRegular + 0.4}rem;
  }

  .MuiSvgIcon-root {
    color: ${({ theme }) => theme.palette.color.medium};
    font-size: ${({ theme }) => theme.typography.fontSizeRegular + 0.6}rem;
  }
`;
export const Icon = styled.img`
  max-width: 20px;
  margin-right: 10px;
`;
