import styled from 'styled-components';

export const Container = styled.div`
  .MuiFormControlLabel-root {
    gap: 5px;
    margin: 0px;
    .MuiSvgIcon-root {
      width: 20px;
      height: 20px;
      color: #d8d6de;
    }
    .MuiSvgIcon-root {
      width: 20px;
      height: 20px;
      color: #d8d6de;
    }
    .Mui-checked {
      .MuiSvgIcon-root {
        color: #1976d2 !important;
      }
    }
    .MuiCheckbox-root {
      padding: 0%;
    }
    .MuiTypography-root {
      color: ${({ theme }) => theme.palette.color.medium};
      font-size: ${({ theme }) => theme.typography.fontSize - 0.2}rem;
    }
  }
`;
