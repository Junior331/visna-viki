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
  min-height: 100vh;
  flex-direction: column;
  background-color: rgba(142, 163, 172, 1);
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
export const Title = styled.h2`
  letter-spacing: 1px;
  color: ${({ theme }) => theme.palette.color.dark};
  font-size: ${({ theme }) => theme.typography.fontSizeRegular}rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
`;

export const ContainerMessage = styled(GenericContainer)`
  align-items: center;
  flex-direction: column;
  justify-content: center;
  > img {
    margin-bottom: 20px;
  }
  > div {
    > button:first-child {
      background: #e73d3e;
      &:hover {
        background: #c33334;
      }
    }
  }
`;
export const Text = styled.p`
  margin-top: 5px;
  color: ${({ theme }) => theme.palette.color.dark};
  font-size: ${({ theme }) => theme.typography.fontSize - 0.2}rem;
`;
export const Icon = styled.img`
  margin-bottom: 20px;
`;
export const ContainerButtons = styled(GenericContainer)`
  gap: 30px;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
`;
