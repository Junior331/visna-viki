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
    color: rgb(190, 190, 190);
    width: 30px;
    height: 30px;
    font-size: 12px;
    background-color: rgb(255, 255, 255);
    border-radius: 50%;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(206, 206, 206);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    > span:last-child {
      top: 35px;
      z-index: 1;
      width: auto;
      font-weight: 700;
      position: absolute;
      color: rgba(67, 99, 116, 1);
      font-family: 'Montserrat', sans-serif !important;
    }
  }

  .indexedStep.accomplished {
    color: white;
    border-style: none;
    background-color: rgba(29, 110, 136, 1);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    > span {
      font-weight: 600;
    }
  }
  .indexedStep.null {
    color: #000;
    border-style: none;
    background-color: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    > span {
      font-weight: 600;
    }
  }

  .RSPBprogressBar {
    height: 2px;
    width: 30%;
    line-height: 1;
    border-radius: 10px;
    position: relative;
    background-color: #fff;
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
    background: rgba(29, 110, 136, 1);
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
