import {
  Header as CardHeader,
  CardContainer,
  ContainerProgress
} from '@/components/modules/Card/CardStyled';
import styled from 'styled-components';

export const GenericContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const HomeContainer = styled(GenericContainer)`
  gap: 21px;
  flex-direction: column;
`;
export const Content = styled(GenericContainer)`
  gap: 20px;
  padding: 0 20px;
  flex-direction: column;
`;
export const Header = styled(GenericContainer)`
  gap: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ContainerFilter = styled(GenericContainer)`
  gap: 10px;
  max-width: 800px;
  align-items: center;
  justify-content: space-between;
  .MuiInputBase-input {
    padding: 10px;
  }
  .MuiOutlinedInput-notchedOutline {
    border-width: 1px !important;
    border-color: #7367f0 !important;
  }

  div {
    min-height: 40px !important;
    .MuiSelect-select {
      min-height: 1.4375em !important;
    }
  }
`;

export const ContainerCards = styled(GenericContainer)`
  gap: 9px;
  padding: 20px;
  flex-wrap: wrap;
  border-radius: 6px;
  background-color: #f0f8ff;
`;
export const StackSkeleton = styled(CardContainer)``;
export const HeaderSkeleton = styled(CardHeader)``;
export const FooterSkeleton = styled(ContainerProgress)``;
export const ContainerSearch = styled(GenericContainer)`
  background-color: #f0f8ff;
`;

export const Title = styled.h2`
  letter-spacing: 1px;
  color: ${({ theme }) => theme.palette.color.dark};
  font-size: ${({ theme }) => theme.typography.fontSizeRegular}rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
`;
