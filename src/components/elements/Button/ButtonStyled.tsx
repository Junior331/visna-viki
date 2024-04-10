import styled, { css } from 'styled-components';
import { StyledButtonProps } from './@types';

export const Button = styled.button<StyledButtonProps>`
  border: none;
  height: 40px;
  display: flex;
  cursor: pointer;
  padding: 0 12px;
  align-items: center;
  border-radius: 0.7rem;
  justify-content: center;
  transition: 0.2s color ease;
  color: ${({ theme }) => theme.palette.color.default};
  font-size: ${({ theme }) => theme.typography.fontSize - 0.2}rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
  background-color: ${({ theme }) => theme.palette.background.regular};

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.medium};
  }

  ${({ noActive }) =>
    noActive &&
    css`
      cursor: no-drop;
    `};

  width: ${({ size }) => {
    if (size === 'large') {
      return '100%';
    }
    if (size === 'medium') {
      return '60%';
    }
    if (size === 'small') {
      return '15%';
    }
    return size || 'max-content';
  }};
`;
