import { Grid } from '@mui/material';
import styled from 'styled-components';

export const ContainerGeneric = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Header = styled(ContainerGeneric)`
  width: 100%;
  height: auto;
  padding: 12px 10px;
  align-items: center;
  background-color: rgba(142, 163, 172, 1);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  .MuiButtonBase-root {
    margin-left: -5px;
  }

  .MuiSvgIcon-root {
    color: ${({ theme }) => theme.palette.color.medium};
    font-size: ${({ theme }) => theme.typography.fontSizeRegular + 0.6}rem;
  }
`;
export const InfoUser = styled(ContainerGeneric)`
  gap: 10px;

  .MuiAvatar-root {
    border: 2px solid #ffff;
    background-color: #b9b3f7;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 19%);
    font-size: ${({ theme }) => theme.typography.fontSizeRegular}rem;
  }
`;
export const ContainerText = styled(ContainerGeneric)`
  width: auto;
  align-items: flex-end;
  flex-direction: column;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 40px;
`;

export const Title = styled.h2`
  min-width: 85px;
  text-align: right;
  color: #121212;
  font-size: ${({ theme }) => theme.typography.fontSize}rem;
`;
export const Text = styled.p`
  max-width: 380px;
  color: #121212;
  color: ${({ theme }) => theme.palette.color.medium};
  font-size: ${({ theme }) => theme.typography.fontSize - 0.2}rem;
`;

export const ContainerMessage = styled(ContainerGeneric)`
  max-height: 100%;
  overflow-y: auto;
  padding: 10px 45px;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  > div {
    > button:first-child {
      background-color: #e73d3e;
      &:hover {
        background-color: #c33334;
      }
    }
  }
  > h2 {
    color: #5e5873;
    font-size: ${({ theme }) => theme.typography.fontSizeBold}rem;
    font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
  }
  > p {
    margin-top: 8px;
    max-width: 670px;
    text-align: center;
  }
`;
export const Icon = styled.img`
  margin-bottom: 20px;
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
  row-gap: 10px;
  margin-top: 25px;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
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
`;
export const Label = styled.label`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.palette.color.medium};
  font-size: ${({ theme }) => theme.typography.fontSize}rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightLight};
`;
export const ContainerButtons = styled(ContainerGeneric)`
  gap: 20px;
  width: 100%;
  height: auto;
  margin-top: 40px;
  align-items: center;
  justify-content: flex-end;
`;
