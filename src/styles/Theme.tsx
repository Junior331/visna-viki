import { DefaultTheme } from "styled-components";

const Theme: DefaultTheme = {
  palette: {
    color: {
      default: "",
      disable: "",
      dark: "",
      light: "",
      regular: "",
    },

    background: {
      light: "",
      medium: "",
      default: "",
      regular: "",
      disable: "",
    },
    error: {
      default: "#d32f2f",
    },
    success: {
      default: "#6EBA19",
    },
    warning: {
      default: "#121A3D",
    },
  },
  typography: {
    fontSize: 1.6,
    fontSizeBold: 3.5,
    fontSizeLight: 1.2,
    fontSizeMedium: 1.4,
    fontWeightBold: 700,
    fontSizeRegular: 2.2,
    htmlFontSize: "10px",
    fontWeightLight: 400,
    fontWeightBolder: 900,
    fontWeightRegular: 500,
  },
};

export default Theme;
