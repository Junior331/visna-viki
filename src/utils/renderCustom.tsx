import Theme from "@/styles/Theme";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import { ThemeProvider } from "styled-components";

export const renderCustom = (Element: ReactElement) => {
  const renderedComponent = render(<ThemeProvider theme={Theme}>{Element}</ThemeProvider>);
  const user = userEvent.setup();

  return { user, ...renderedComponent };
};
