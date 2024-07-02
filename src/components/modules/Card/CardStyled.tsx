import styled from 'styled-components';
import { styledProps } from './@types';

export const ContainerGeneric = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const CardContainer = styled(ContainerGeneric)<styledProps>`
  gap: 6px;
  border-radius: 6px;
  padding: 12px 10px;
  flex-direction: column;
  justify-content: flex-start;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: rgba(223, 223, 223, 0.49);
  border: 2px solid rgba(192, 192, 192, 1);
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.06);
`;
