import styled from 'styled-components';
import { styledProps } from './@types';

export const ContainerGeneric = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Header = styled(ContainerGeneric)`
  width: 100%;
  margin-bottom: 6px;
`;
export const Status = styled(ContainerGeneric)<styledProps>`
  color: #ffffff;
  padding: 4px 12px;
  border-radius: 5px;
  background-color: #339ce9;

  font-size: ${({ theme }) => theme.typography.fontSizeLight}rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular + 100};
`;
export const Img = styled.img``;
export const Title = styled.h2`
  overflow: hidden;
  max-width: 140px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.palette.color.default};
  font-size: ${({ theme }) => theme.typography.fontSize}rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
`;
export const Text = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  font-family: 'Inter', sans-serif !important;
  color: ${({ theme }) => theme.palette.color.default};
  font-size: ${({ theme }) => theme.typography.fontSize - 0.2}rem;
`;
export const ContainerProgress = styled(ContainerGeneric)`
  gap: 3px;
  width: 100%;
  flex: 1 0 auto;
  align-items: flex-end;
  flex-direction: column;
  justify-content: flex-end;
`;
