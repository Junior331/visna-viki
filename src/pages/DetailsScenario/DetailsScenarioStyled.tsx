import styled from 'styled-components';

export const GenericContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const DetailsScenarioContainer = styled(GenericContainer)`
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

  > .containerTable {
    gap: 10px;
    padding: 0;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    > h2 {
      padding: 10px 0 0 10px;
    }
  }
`;
export const ContainerMessage = styled(GenericContainer)`
  max-height: 100%;
  overflow-y: auto;
  max-height: 100%;
  overflow-y: auto;
  padding: 20px 60px;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  > div {
    margin: 30px 0 0;
    justify-content: center;
    > button:first-child {
      background: #e73d3e;
      &:hover {
        background: #c33334;
      }
    }
  }
`;
export const Title = styled.h2`
  letter-spacing: 1px;
  color: ${({ theme }) => theme.palette.color.dark};
  font-size: ${({ theme }) => theme.typography.fontSizeRegular}rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
`;
export const Text = styled.p`
  margin-top: 5px;
  color: ${({ theme }) => theme.palette.color.dark};
  font-size: ${({ theme }) => theme.typography.fontSize - 0.2}rem;
`;
export const Icon = styled.img``;
export const ContainerButtons = styled(GenericContainer)`
  gap: 30px;
  margin-bottom: 15px;
  align-items: center;
  justify-content: flex-end;
`;
