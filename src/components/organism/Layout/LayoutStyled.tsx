import styled from 'styled-components';

export const LayoutContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  max-width: 100%;
  align-items: start;
  justify-content: space-between;
  background-color: rgba(84, 112, 111, 1);
`;

export const LayoutContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  max-width: 100%;
  align-items: flex-start;
  justify-content: flex-end;
`;

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  min-height: 100vh;
  align-items: start;
  flex-direction: column;
  justify-content: flex-start;
`;
