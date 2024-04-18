import styled from 'styled-components';
import { StyledProps } from './@types';

export const ProgressBarContainer = styled.div`
  gap: 10px;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
export const Container = styled.div`
  width: 100%;
  height: 10px;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
`;

export const Progress = styled.div<StyledProps>`
  top: 0;
  left: 0;
  height: 100%;
  position: absolute;
  transition: width 0.3s ease-in-out;
  width: ${({ percentage }) => percentage}%;
  background-color: ${(props) => props.color};
`;
