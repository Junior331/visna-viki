import { Grid } from '@mui/material';
import styled from 'styled-components';

export const GenericContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const EditProjectContainer = styled(GenericContainer)`
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
  .MuiBox-root {
  }
  > div {
    > div {
      > .MuiBox-root {
        padding: 35px 0px 0 15px !important;
      }
    }
  }
  .MuiTypography-root {
    color: ${({ theme }) => theme.palette.color.dark};
    font-size: ${({ theme }) => theme.typography.fontSize - 0.2}rem;
    font-weight: ${({ theme }) => theme.typography.fontWeightLight};
  }
  .tabDisabled {
    cursor: no-drop !important;
    pointer-events: initial !important;
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
    > .btnRemove {
      margin-right: 10px;
      background-color: ${({ theme }) => theme.palette.error.default};
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
    background-color: transparent;
    color: ${({ theme }) => theme.palette.error.default};
    border: 1px solid ${({ theme }) => theme.palette.error.default};
    &:hover {
      color: ${({ theme }) => theme.palette.color.default};
      background-color: ${({ theme }) => theme.palette.error.default};
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
    margin-top: 30px;
    align-items: center;
    justify-content: center;
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
export const Icon = styled.img`
  margin-bottom: 20px;
`;
