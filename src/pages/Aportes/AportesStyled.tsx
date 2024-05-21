import styled from 'styled-components';

export const GenericContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const AportesContainer = styled(GenericContainer)`
  gap: 21px;
  padding: 20px;
  flex-direction: column;
`;
export const Header = styled(GenericContainer)`
  gap: 10px;
  flex-wrap: wrap;
  padding-bottom: 10px;
  justify-content: space-between;
  border-bottom: 2px solid #ebe9f1;
`;
export const Content = styled(GenericContainer)`
  gap: 20px;
  padding: 0 20px;
  flex-direction: column;
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
      background-color: #e73d3e;
      &:hover {
        background-color: #c33334;
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
  margin-top: 30px;
  align-items: center;
  justify-content: center;
`;

export const ContainerExpenses = styled(GenericContainer)`
  gap: 0px;
  flex-direction: column;
  > div:first-child {
    padding: 0;
  }
  > div:last-child {
    margin-top: -1px;
    padding: 20px 20px 18px;
  }
`;
export const FooterExpense = styled(GenericContainer)`
  gap: 10px;
  padding-top: 15px;
  justify-content: space-between;
  border-top: 2px solid #ebe9f1;

  h2 {
    color: ${({ theme }) => theme.palette.color.medium};
  }

  p {
    color: #28c76f;
    font-weight: ${({ theme }) => theme.typography.fontWeightRegular + 100};
  }
`;
