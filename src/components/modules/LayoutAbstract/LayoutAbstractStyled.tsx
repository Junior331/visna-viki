import styled from 'styled-components';

export const LayoutContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  margin: 0 auto;
  max-width: 100%;
  align-items: start;
  justify-content: space-between;
`;

export const LayoutContent = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  min-width: 450px;
  align-items: flex-start;
  justify-content: flex-end;
  background-color: #f3f5fb;
  > div {
    width: 100%;
    height: 100%;
    padding: 0px 80px;
  }
`;
export const ContainerAbstract = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
export const Img = styled.img`
  width: 60%;
  margin: 0 auto;
`;
