import { ProgressBar, Step } from 'react-step-progress-bar';
import * as S from './StepStyled';

export const StepProgress = ({ page, onPageNumberClick }) => {
  let stepPercentage = 0;
  if (page === 1) {
    stepPercentage = 1;
  } else if (page === 2) {
    stepPercentage = 35;
  } else if (page === 3) {
    stepPercentage = 68;
  } else if (page === 4) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <S.StepContainer>
      <ProgressBar percent={stepPercentage}>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
              onClick={() => onPageNumberClick(1)}
            >
              <span>{index + 1}</span>
              <span>Terreno</span>
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
              onClick={() => onPageNumberClick(2)}
            >
              <span>{index + 1}</span>
              <span>Unidades</span>
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
              onClick={() => onPageNumberClick(3)}
            >
              <span>{index + 1}</span>
              <span>Prazos</span>
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
              onClick={() => onPageNumberClick(4)}
            >
              <span>{index + 1}</span>
              <span>Final</span>
            </div>
          )}
        </Step>
      </ProgressBar>
    </S.StepContainer>
  );
};
