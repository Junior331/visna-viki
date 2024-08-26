import media from '@/styles/breakpoints';
import styled from 'styled-components';
import { styledProps } from './@types';

export const GenericContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const ProfitabilityContainer = styled(GenericContainer)`
  gap: 21px;
  flex-direction: column;
`;
export const Header = styled(GenericContainer)`
  justify-content: flex-end;
`;
export const Content = styled(GenericContainer)`
  gap: 20px;
  align-items: center;
  flex-direction: column;
  > div {
    padding: 5px 15px;
    border-radius: 4px;
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
  .containerBtn {
    justify-content: flex-start;
  }
`;
export const Title = styled.h2`
  letter-spacing: 1px;
  color: ${({ theme }) => theme.palette.color.dark};
  font-size: ${({ theme }) => theme.typography.fontSizeRegular}rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
`;
export const ContainerMessage = styled(GenericContainer)`
  max-height: 100%;
  overflow-y: auto;
  padding: 20px 35px;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  > img {
    margin-bottom: 20px;
  }
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
export const Text = styled.p<styledProps>`
  margin-top: 5px;
  margin: ${({ margin }) => margin};
  color: ${({ theme }) => theme.palette.color.dark};
  font-size: ${({ theme }) => theme.typography.fontSize - 0.2}rem;
`;
export const Icon = styled.img``;
export const ContainerButtons = styled(GenericContainer)`
  gap: 30px;
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
  width: 98.8%;
  height: auto;
  flex-direction: column;
  align-items: flex-start;
  margin: auto 0 auto auto;
  > h2 {
    margin-top: 15px;
  }
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
