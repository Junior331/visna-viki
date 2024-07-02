import media from '@/styles/breakpoints';
import { Typography } from '@mui/material';
import styled from 'styled-components';

export const ContainerGeneric = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const SummaryFormContainer = styled(ContainerGeneric)`
  gap: 20px;
  width: 100%;
  height: auto;
  margin-top: 40px;
  border-radius: 8px;
  flex-direction: column;
`;
export const ContainerSections = styled(ContainerGeneric)`
  gap: 20px;
  width: 100%;
  height: auto;
  padding: 25px;
  border-radius: 8px;
  background: #ffffff;
  flex-direction: column;
`;
export const Section = styled(ContainerGeneric)`
  width: 100%;
  height: auto;
  border-radius: 8px;
  background: #ffffff;
  flex-direction: column;
  align-items: flex-start;
`;
export const ContainerInfo = styled(ContainerGeneric)`
  width: 100%;
  height: auto;
  border-radius: 8px;
  background: #ffffff;
  flex-direction: column;
  padding: 20px 20px 10px;
  border: 1px solid #b9b9c3;
  ${media.lessThan('regular')`
    .MuiGrid-grid-sm-6 {
      min-width: 300px;
    }
  `}
`;
export const ContainerText = styled(ContainerGeneric)`
  gap: 10px;
  justify-content: flex-start;
`;
export const Title = styled(Typography)`
  font-size: ${({ theme }) => theme.typography.fontSizeRegular}rem !important;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular}!important;
`;
export const Text = styled(Typography)`
  font-size: ${({ theme }) => theme.typography.fontSize}rem !important;
`;
export const ContainerButtons = styled(ContainerGeneric)`
  gap: 20px;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: flex-end;
`;
