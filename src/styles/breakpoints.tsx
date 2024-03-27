import { generateMedia } from "styled-media-query";

type BreakpointsType = {
  huge: string;
  large: string;
  small: string;
  medium: string;
  regular: string;
};

export const breakpoints = {
  huge: "1440px",
  large: "1200px",
  regular: "1040px",
  medium: "768px",
  small: "430px",
};

const media = generateMedia<BreakpointsType>(breakpoints);

export default media;
