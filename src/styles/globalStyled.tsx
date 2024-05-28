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
      color: ${({ theme }) => theme.palette.color.dark};
      ::placeholder {
        color:#000000ab;
        opacity: 1; 
      }
      
      ::-ms-input-placeholder { 
        color:#000000ab;
      }
    }
    .Mui-disabled {
      -webkit-text-fill-color: rgb(0 0 0 / 70%) !important; 
      color: ${({ theme }) => theme.palette.color.dark} !important;
    }

    .SelectComponent {
      height: 53px;

    }

    .MuiModal-root {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .MuiBackdrop-root{
      background-color: rgb(0 0 0 / 60%);
    }
    .MuiBackdrop-root{
      background-color: rgb(0 0 0 / 60%);
    }

    .menuEdit {
      .MuiPaper-root {
        width: 180px;
      }
      li.MuiMenuItem-root {
        gap: 10px;
        justify-content: flex-end;
        color: ${({ theme }) => theme.palette.color.dark};
        font-size: ${({ theme }) => theme.typography.fontSizeLight + 0.2}rem;
        > .MuiListItemIcon-root {
          min-width: auto;
        }
      }
    }
    
    .billsMenu {
      .MuiBackdrop-root{
        background-color: rgb(0 0 0 / 37%);
      }
    }
    .detailsBillsMenu {
      .MuiBackdrop-root{
        background-color: rgb(0 0 0 / 16.9%);
      }
    }
    .detailsExpenseMenu {
      .MuiBackdrop-root{
        background-color: rgb(0 0 0 / 2.3%);
      }
      .MuiPaper-root {
        width: 180px;
        left: 1650px!important;
      }
    }
    .MuiSelect-select,.MuiInputBase-input {
      font-size: ${({ theme }) => theme.typography.fontSize - 0.3}rem;
    }
  

    .MuiTooltip-tooltip {
      font-size: 1.2rem;
    }

    .drawerContainer {

      .MuiPaper-root {
        box-shadow: none;
      }
      .MuiList-root {
        .MuiButtonBase-root {
          border-bottom: 1px solid #ebe9f1;
        }
      }
      .MuiListSubheader-root {
        color: ${({ theme }) => theme.palette.color.light};
        font-size: ${({ theme }) => theme.typography.fontSize}rem;
        font-weight: ${({ theme }) => theme.typography.fontWeightRegular + 100};
      }
    
      .MuiListItemText-root {
        .MuiTypography-root {
          color: ${({ theme }) => theme.palette.color.regular}!important;
          font-weight: ${({ theme }) =>
            theme.typography.fontWeightBold - 100}!important;
          font-size: ${({ theme }) =>
            theme.typography.fontSize - 0.2}rem !important;
        }
      }
    }

    /* .base-Popper-root  {
      inset: auto auto 0px -130px !important;
    } */
  }

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #484d57;
  }

  .MuiTypography-body1 {
    color: ${({ theme }) => theme.palette.color.dark} !important;
    font-size: ${({ theme }) => theme.typography.fontSize - 0.2}rem !important;
    font-weight: ${({ theme }) => theme.typography.fontWeightLight} !important;
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
