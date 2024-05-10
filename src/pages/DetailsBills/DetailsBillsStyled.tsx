import styled from 'styled-components';

import {
  ContainerProgress,
  Header as CardHeader
} from '@/components/modules/Project/ProjectStyled';

export const GenericContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const DetailsBillsContainer = styled(GenericContainer)`
  gap: 21px;
  padding: 20px;
  flex-direction: column;

  .MuiBackdrop-root {
    background-color: rgb(0 0 0 / 20%) !important;
  }
`;
export const Header = styled(GenericContainer)`
  gap: 10px;
  flex-wrap: wrap;
  padding-bottom: 10px;
  justify-content: space-between;
  border-bottom: 2px solid #ebe9f1;
`;
export const Content = styled(GenericContainer)`
  gap: 20px;
  align-items: center;
  flex-direction: column;
  > div {
    gap: 0;
    padding: 0;
    > div:first-child {
      width: 98%;
      padding: 20px 0 18px;
    }
  }
  .footer {
    > div {
      border: none;
      padding-top: 0px;
    }
  }
`;
export const Title = styled.h2`
  letter-spacing: 1px;
  color: ${({ theme }) => theme.palette.color.dark};
  font-size: ${({ theme }) => theme.typography.fontSizeRegular}rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
`;
export const ContainerMessage = styled(GenericContainer)`
  align-items: center;
  flex-direction: column;
  justify-content: center;
  > img {
    margin-bottom: 20px;
  }
  > div {
    > button:first-child {
      background-color: #e73d3e;
      &:hover {
        background-color: #c33334;
      }
    }
  }
`;
export const Text = styled.p`
  margin-top: 5px;
  color: ${({ theme }) => theme.palette.color.dark};
  font-size: ${({ theme }) => theme.typography.fontSize - 0.2}rem;
`;
export const Icon = styled.img``;
export const ContainerButtons = styled(GenericContainer)`
  gap: 30px;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
`;
export const HeaderCard = styled(Header)`
  align-items: center;
  border-bottom: none;

  > h2 {
    color: ${({ theme }) => theme.palette.color.regular};
  }
`;
export const ContainerExpenses = styled(GenericContainer)`
  gap: 0px;
  flex-direction: column;
  > div:first-child {
    padding: 0;
  }
  > div:last-child {
    margin-top: -1px;
    padding: 20px 20px 18px;
  }
`;
export const Expense = styled(GenericContainer)`
  gap: 10px;
  justify-content: space-between;

  h2,
  p {
    color: ${({ theme }) => theme.palette.color.medium};
  }
  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize}rem;
    font-weight: ${({ theme }) => theme.typography.fontWeightLight};
  }

  p {
    font-weight: ${({ theme }) => theme.typography.fontWeightRegular + 100};
  }
`;
export const FooterExpense = styled(GenericContainer)`
  gap: 10px;
  padding-top: 15px;
  justify-content: space-between;
  border-top: 2px solid #ebe9f1;

  h2 {
    color: ${({ theme }) => theme.palette.color.medium};
  }

  p {
    color: #28c76f;
    font-weight: ${({ theme }) => theme.typography.fontWeightRegular + 100};
  }
`;
export const HeaderSkeleton = styled(CardHeader)``;
export const FooterSkeleton = styled(ContainerProgress)``;
export const ContainerSearch = styled(GenericContainer)`
  background-color: #f0f8ff;
`;
export const Message = styled(Title)`
  height: 100%;
  display: flex;
  align-items: center;
`;