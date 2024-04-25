import styled from 'styled-components';

export const GenericContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const CreateProjectContainer = styled(GenericContainer)`
  gap: 21px;
  padding: 20px;
  flex-direction: column;
`;
export const Header = styled(GenericContainer)`
  gap: 10px;
  flex-wrap: wrap;
  padding-bottom: 10px;
  border-bottom: 2px solid #ebe9f1;
  justify-content: space-between;
`;
export const Content = styled(GenericContainer)`
  gap: 20px;
  align-items: center;
  flex-direction: column;
  > div {
    width: 100%;
    > div:firt-child {
      margin: 20px 0 10px;
    }
  }
`;
export const ContainerSteps = styled(GenericContainer)`
  gap: 20px;
  padding: 0px 25px;
  align-items: center;
`;
