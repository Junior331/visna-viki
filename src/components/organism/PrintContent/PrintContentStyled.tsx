import styled from 'styled-components';

export const PrintContentContainer = styled.div`
  display: none;
  
  @media print {
    display: block;
  }
`;

export const PrintContentContent = styled.div``;
