import 'styled-components';
import { ColorShades, feedbackShades, TypographyType } from './interfaces';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      color: ColorShades;
      error: feedbackShades;
      success?: feedbackShades;
      warning?: feedbackShades;
      background: ColorShades;
    };
    typography: TypographyType;
  }
}
