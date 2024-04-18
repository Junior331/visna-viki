import styled from 'styled-components';
import { styledProps } from './@types';

export const ContainerGeneric = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const CardContainer = styled(ContainerGeneric)`
  gap: 6px;
  width: 255px;
  height: auto;
  min-height: 367px;
  border-radius: 6px;
  padding: 12px 10px;
  background: #ffffff;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.06);
`;
export const Header = styled(ContainerGeneric)`
  width: 100%;
  margin-bottom: 6px;
`;
export const Status = styled(ContainerGeneric)<styledProps>`
  padding: 4px 12px;
  border-radius: 50px;
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};

  font-size: ${({ theme }) => theme.typography.fontSizeLight}rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular + 100};
`;
export const Img = styled.img``;
export const Title = styled.h2`
  color: ${({ theme }) => theme.palette.color.regular};
  font-size: ${({ theme }) => theme.typography.fontSize}rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
`;
export const Text = styled.p`
  max-width: 380px;
  font-family: 'Inter', sans-serif !important;
  color: ${({ theme }) => theme.palette.color.medium};
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
