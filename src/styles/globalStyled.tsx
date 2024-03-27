import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Lilita One', sans-serif;
    font-weight: ${({ theme }) => theme.typography.fontWeightLight};
  }

  html, body{
    scroll-behavior: smooth;
    color: ${({ theme }) => theme.palette.color.black};
    font-size:${({ theme }) => theme.typography.htmlFontSize};
    background-color: ${({ theme }) => theme.palette.background.default};
  }
  
  body {
    width: 100%;
    height: auto;
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
