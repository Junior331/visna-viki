export type Props = {
  page: number;
  steps: number;
  onPageNumberClick: (text: number) => void;
};
export type stepProps = {
  index: number;
  accomplished: boolean;
};
export type styledProps = {
  color: string;
  bgColor: string;
};
