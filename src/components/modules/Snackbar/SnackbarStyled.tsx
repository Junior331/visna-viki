import styled from 'styled-components';

export const ContainerGeneric = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ContainerSnackbar = styled(ContainerGeneric)`
  width: auto;
  height: auto;
  position: absolute;
`;
