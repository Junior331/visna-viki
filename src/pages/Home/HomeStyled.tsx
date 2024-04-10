import styled from 'styled-components';

export const GenericContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const HomeContainer = styled(GenericContainer)`
  gap: 21px;
  flex-direction: column;
`;

export const Title = styled.h2`
  letter-spacing: 1px;
  color: ${({ theme }) => theme.palette.color.default};
  font-size: ${({ theme }) => theme.typography.fontSizeRegular}rem;
`;
