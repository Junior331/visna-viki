import "styled-components";
import { ColorShades, TypographyType } from "./interfaces";

declare module "styled-components" {
  export interface DefaultTheme {
    palette: {
      color: ColorShades;
      error: ColorShades;
      success?: ColorShades;
      warning?: ColorShades;
      background: ColorShades;
    };
    typography: TypographyType;
  }
}
