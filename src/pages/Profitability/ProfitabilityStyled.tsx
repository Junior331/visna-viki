import media from '@/styles/breakpoints';
import styled from 'styled-components';

export const GenericContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const ProfitabilityContainer = styled(GenericContainer)`
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
  align-items: center;
  flex-direction: column;
  > div {
    padding: 20px 24px 18px;
  }
  .titleAccordion {
    padding: 0;
    color: ${({ theme }) => theme.palette.color.dark};
    font-size: ${({ theme }) => theme.typography.fontSizeRegular}rem;
    font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
    svg {
      font-size: 3rem;
    }
  }
  .footer,
  .skeletonfooter {
    > div {
      border: none;
      padding-top: 0px;
    }
  }
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
export const Icon = styled.img``;
export const ContainerButtons = styled(GenericContainer)`
  gap: 30px;
  margin-top: 30px;
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
`;
export const Section = styled(GenericContainer)`
  width: 100%;
  height: auto;
  padding: 20px 20px 0;
  border-radius: 8px;
  background: #ffffff;
  flex-direction: column;
  align-items: flex-start;
`;
export const ContainerInfo = styled(GenericContainer)`
  width: 100%;
  height: auto;
  border-radius: 8px;
  background: #ffffff;
  flex-direction: column;
  padding: 20px 20px 10px;
  border: 1px solid #b9b9c3;
  ${media.lessThan('regular')`
    .MuiGrid-grid-sm-6 {
      min-width: 300px;
    }
  `}
`;
export const Label = styled.label`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.palette.color.medium};
  font-size: ${({ theme }) => theme.typography.fontSize}rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightLight};
`;
