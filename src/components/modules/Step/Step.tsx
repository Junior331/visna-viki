import { ProgressBar, Step } from 'react-step-progress-bar';
import { Props, stepProps } from './@types';
import * as S from './StepStyled';

const StepProgress = ({ page, onPageNumberClick }: Props) => {
  let stepPercentage = 0;
  if (page === 1) {
    stepPercentage = 1;
  } else if (page === 2) {
    stepPercentage = 35;
  } else if (page === 3) {
    stepPercentage = 70;
  } else if (page === 4) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <S.StepContainer>
      <ProgressBar percent={stepPercentage}>
        <Step>
          {({ accomplished, index }: stepProps) => (
            <div
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
              onClick={() => onPageNumberClick(1)}
            >
              {index + 1}
            </div>
          )}
          <div>
            <S.Label>Jaja</S.Label>
          </div>
        </Step>
        {/* <S.ContainerStep> */}
        <Step>
          {({ accomplished, index }: stepProps) => (
            <div
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
              onClick={() => onPageNumberClick(2)}
            >
              {index + 1}
            </div>
          )}
        </Step>
        {/* <S.Label>Jaja</S.Label>
        </S.ContainerStep> */}
        <Step>
          {({ accomplished, index }: stepProps) => (
            <div
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
              onClick={() => onPageNumberClick(3)}
            >
              {index + 1}
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }: stepProps) => (
            <div
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
              onClick={() => onPageNumberClick(4)}
            >
              {index + 1}
            </div>
          )}
        </Step>
      </ProgressBar>
    </S.StepContainer>
  );
};

export { StepProgress };
