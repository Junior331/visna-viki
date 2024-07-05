import { Card } from '@/components/modules';
import styled from 'styled-components';

export const GenericContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const ScenariosContainer = styled(GenericContainer)`
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

  > div:last-child {
    gap: 5px;
    width: auto;
    margin-bottom: 0px;
  }
`;
export const Content = styled(GenericContainer)`
  gap: 20px;
  align-items: center;
  flex-direction: column;
  > div {
    padding: 5px 15px;
    border-radius: 4px;
  }
`;
export const Message = styled(Card)`
  max-width: 650px;
  min-height: 240px;
  text-align: center;
  justify-content: center;
  button {
    margin-top: 20px;
  }
`;
export const Title = styled.h2`
  letter-spacing: 1px;
  color: ${({ theme }) => theme.palette.color.dark};
  font-size: ${({ theme }) => theme.typography.fontSizeRegular}rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
`;
export const ContainerMessage = styled(GenericContainer)`
  padding: 20px 60px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
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
export const Form = styled.form`
  gap: 15px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .MuiFormControl-root {
    gap: 3px;
    width: 100%;
    margin: 0px;
  }
  .MuiGrid-root {
    > button {
      height: 53px;
      margin-left: 10px;
    }
  }

  .MuiStack-root {
    padding-top: 0px;
  }
`;
export const Label = styled.label`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.palette.color.medium};
  font-size: ${({ theme }) => theme.typography.fontSize}rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightLight};
`;
export const HeaderCard = styled(Header)`
  align-items: center;

  > h2 {
    color: ${({ theme }) => theme.palette.color.regular};
  }
`;
export const ContainerScenarios = styled(GenericContainer)`
  gap: 10px;
  margin-top: 10px;
  flex-direction: column;
`;
export const Scenario = styled(GenericContainer)`
  gap: 10px;
  justify-content: space-between;

  h2,
  p {
    color: ${({ theme }) => theme.palette.color.medium};
  }
  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize}rem;
    font-weight: ${({ theme }) => theme.typography.fontWeightLight};
  }

  p {
    font-weight: ${({ theme }) => theme.typography.fontWeightRegular + 100};
  }
`;

export const FooterScenario = styled(GenericContainer)`
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
export const ListScenarios = styled(GenericContainer)`
  padding: 0 !important;
  > div {
    padding: 20px 24px 18px;
  }
`;
