import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  *{
    margin: 0;
    padding: 0;
    font-style: normal;
    box-sizing: border-box;
    font-optical-sizing: auto;
    font-family: "Montserrat", sans-serif !important;
    font-weight: ${({ theme }) => theme.typography.fontWeightLight};
  }

  html, body{
    scroll-behavior: smooth;
    color: ${({ theme }) => theme.palette.color.dark};
    font-size:${({ theme }) => theme.typography.htmlFontSize};
    background-color: ${({ theme }) => theme.palette.background.default};
  }
  
  body {
    width: 100%;
    height: auto;
    .MuiFormHelperText-root, .Mui-error {
      margin: 0;
      color: ${({ theme }) => theme.palette.error.default};
      font-size:${({ theme }) => theme.typography.fontSize - 0.2}rem;
    }
    .MuiInputBase-root {
      color: ${({ theme }) => theme.palette.color.light};
    }
  }

  
  .content{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  #chat-widget-container{
    display: none !important;
  }
`;
