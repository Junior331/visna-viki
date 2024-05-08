import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  > .MuiPaper-root {
    width: 100%;
  }
  .MuiAccordionSummary-content{
    font-size: ${({ theme }) => theme.typography.fontSize - 0.2}rem;
  }
`;
