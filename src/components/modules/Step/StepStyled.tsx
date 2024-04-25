import styled from 'styled-components';

export const ContainerGeneric = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StepContainer = styled(ContainerGeneric)`
  gap: 6px;
  width: 100%;
  height: auto;
  flex-direction: column;

  .indexedStep {
    width: 30px;
    height: 30px;
    display: flex;
    font-size: 12px;
    border-width: 1px;
    border-radius: 50%;
    border-style: solid;
    align-items: center;
    cursor: context-menu;
    justify-content: center;
    color: rgb(190, 190, 190);
    border-color: rgb(206, 206, 206);
    background-color: rgb(255, 255, 255);
    > span:last-child {
      top: 35px;
      z-index: 1;
      width: auto;
      color: black;
      position: absolute;
    }
  }

  .indexedStep.accomplished {
    background-color: #664de5;
    color: white;
    border-style: none;
  }

  .RSPBprogressBar {
    height: 2px;
    width: 30%;
    line-height: 1;
    border-radius: 10px;
    position: relative;
    background-color: rgb(207, 207, 207);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 0;
    margin: 20px auto;
  }

  .RSPBprogressBar .RSPBstep {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
    position: absolute;
    transform: translateX(-50%);
    transition-property: all;
    transition-timing-function: ease;
  }

  .RSPBprogressBar .RSPBprogressBarText {
    color: white;
    font-size: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .RSPBprogressBar .RSPBprogression {
    position: absolute;
    transition: width 0.3s ease;
    left: 0;
    top: 0;
    bottom: 0;
    border-radius: 10px;
    background: #664de5;
    z-index: -1;
  }

  @media screen and (max-width: 480px) {
    .indexedStep {
      width: 15px;
      height: 15px;
      font-size: 6px;
    }
  }
`;
export const ContainerStep = styled(ContainerGeneric)`
  flex-direction: column;
`;
