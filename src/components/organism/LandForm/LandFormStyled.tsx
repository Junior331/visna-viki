import { Grid } from '@mui/material';
import styled from 'styled-components';

export const ContainerGeneric = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const LandFormContainer = styled(ContainerGeneric)`
  width: 100%;
  height: auto;
  border-radius: 6px;
  padding: 12px 10px;
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
`;
export const ContainerInputs = styled(Grid)`
  margin-top: 40px;
  border-radius: 8px;
  align-items: center;
  padding: 10px 20px 20px;
  border: 1px solid #b9b9c3;
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
  align-items: center;
  justify-content: flex-end;
`;
