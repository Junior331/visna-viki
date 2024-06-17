import styled from 'styled-components';

import {
  ContainerProgress,
  Header as CardHeader
} from '@/components/modules/Project/ProjectStyled';
import { Grid } from '@mui/material';

export const GenericContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const ExpenseContainer = styled(GenericContainer)`
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

export const Form = styled.form`
  gap: 15px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .MuiFormControl-root {
    gap: 3px;
    width: 100%;
    margin: 0px;
  }
  .MuiGrid-root {
    > button {
      height: 53px;
    }
  }
  .containerUnits {
    > div {
      background-color: #f0f8ff61;
    }
  }
`;

export const ContainerInputs = styled(Grid)`
  margin-top: 40px;
  border-radius: 8px;
  align-items: center;
  padding: 10px 20px 20px;
  border: 1px solid #b9b9c3;
  justify-content: space-between;

  > .containerButton:last-child {
    padding: 0;
    display: flex;
    max-width: 47px;
    min-height: 90px;
    align-items: flex-end;
    justify-content: flex-end;
    > button {
      height: 30px;
      margin-bottom: 13px;
      font-size: ${({ theme }) => theme.typography.fontSizeRegular - 0.2}rem;
    }
  }
`;
export const Label = styled.label`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.palette.color.medium};
  font-size: ${({ theme }) => theme.typography.fontSize}rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightLight};
`;
export const ContainerButtons = styled(GenericContainer)`
  gap: 20px;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: space-between;

  > .btnDelete {
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.palette.error.default};
    border: 1px solid ${({ theme }) => theme.palette.error.default};
    &:hover {
      color: ${({ theme }) => theme.palette.color.default};
      background: ${({ theme }) => theme.palette.error.default};
    }
  }

  > div {
    gap: 20px;
    width: auto;
    display: flex;
    align-items: center;
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
    gap: 30px;
    width: auto;
    margin-top: 30px;
    > button:first-child {
      background: #e73d3e;
      &:hover {
        background: #c33334;
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
