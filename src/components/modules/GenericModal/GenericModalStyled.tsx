import styled from 'styled-components';
import media from 'styled-media-query';
import { styledProps } from './@types';

const GenericContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ModalContainer = styled(GenericContainer)<styledProps>`
  gap: 20px;
  height: 100%;
  position: sticky;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: -2px 2px 25px 2px rgb(0 0 0 / 12%);
  max-width: ${({ maxWidth }) => maxWidth || '900px'};
  max-height: ${({ maxHeight }) => maxHeight || '450px'};

  > button:first-child {
    top: -10px;
    z-index: 2;
    right: -8px;
    padding: 5px;
    height: 40px;
    min-width: 40px;
    position: absolute;
  }
  ${media.lessThan('medium')`
    height: 90vh;
    padding: 10px 2px 20px 0px;
    > button:first-child {
      top: 0px;
      right: 0px;
    }
  `}
`;
export const Content = styled(GenericContainer)`
  align-items: center;
  justify-content: center;
`;
export const Button = styled.button`
  padding: 0;
  border: none;
  display: flex;
  cursor: pointer;
  align-items: center;
  border-radius: 8px;
  background: #ffffff;
  justify-content: center;
  box-shadow: 0px 4px 44px 2px rgb(0 0 0 / 25%);
`;
export const Icon = styled.img``;
