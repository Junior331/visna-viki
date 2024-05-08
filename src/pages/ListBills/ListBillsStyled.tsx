import { Grid } from '@mui/material';
import styled from 'styled-components';

export const GenericContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const ListBillsContainer = styled(GenericContainer)`
  gap: 21px;
  padding: 20px;
  flex-direction: column;
`;
export const Header = styled(GenericContainer)`
  gap: 10px;
  flex-wrap: wrap;
  padding-bottom: 10px;
  border-bottom: 2px solid #ebe9f1;
  justify-content: space-between;
`;
export const Content = styled(GenericContainer)`
  gap: 20px;
  align-items: center;
  flex-direction: column;
  > div {
    width: 100%;
    > div:firt-child {
      margin: 20px 0 10px;
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
      margin-left: 10px;
    }
  }
`;
export const ContainerInputs = styled(Grid)`
  border-radius: 8px;
  align-items: center;

  > div:last-child {
    display: flex;
    min-height: 90px;
    align-items: flex-end;
    > button {
      height: 30px;
      margin-bottom: 13px;
      font-size: ${({ theme }) => theme.typography.fontSizeRegular - 0.2}rem;
    }
  }

  @media (min-width: 599px) {
    margin-top: 40px;
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
  justify-content: flex-end;

  > button:first-child {
    gap: 15px;
    align-items: center;
    justify-content: center;
    svg {
      margin-top: 2px;
      margin-left: -10px;
      font-size: ${({ theme }) => theme.typography.fontSize}rem;
    }
  }
`;
export const ContainerPagination = styled(GenericContainer)`
  justify-content: center;
  .MuiPagination-ul {
    li {
      width: 42px;
      height: 42px;
      display: flex;
      padding-right: 1px;
      align-items: center;
      justify-content: center;
      background-color: #f3f2f7;
      font-size: ${({ theme }) => theme.typography.fontSize + 0.1}rem;

      .Mui-selected {
        padding: 20px;
        border-radius: 60px;
      }
      .MuiButtonBase-root {
        width: 42px;
        height: 42px;
        font-size: ${({ theme }) => theme.typography.fontSize - 0.2}rem;
        font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
      }

      svg {
        color: ${({ theme }) => theme.palette.background.regular};
        font-size: ${({ theme }) => theme.typography.fontSizeRegular}rem;
      }
    }

    > li:first-child,
    li:last-child {
      border-radius: 30px;
    }

    > li:nth-child(2),
    li:nth-last-child(2) {
      margin: 0 10px;
      border-radius: 30px;
    }

    li:nth-child(3) {
      border-radius: 25px 0px 0px 25px;
    }

    li:nth-last-child(3) {
      border-radius: 0px 25px 25px 0px;
    }
    li:nth-child(n4):nth-last-child(4) {
      border-radius: 0;
    }
  }
`;
