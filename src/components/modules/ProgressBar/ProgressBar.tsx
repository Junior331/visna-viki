import { ProgressBarProps } from './@types';
import * as S from './ProgressBarStyled';

const ProgressBar = ({
  max,
  value,
  bgColorMax,
  bgColorValue
}: ProgressBarProps) => {
  const calculatePercentage = (val: number) => (val / max) * 100;

  return (
    <S.ProgressBarContainer>
      <S.Container>
        <S.Progress percentage={calculatePercentage(max)} color={bgColorMax} />
        <S.Progress
          color={bgColorValue}
          percentage={calculatePercentage(value)}
        />
      </S.Container>
    </S.ProgressBarContainer>
  );
};

export { ProgressBar };
