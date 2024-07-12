import styled from 'styled-components';

export const GenericContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const FlowContainer = styled(GenericContainer)`
  gap: 21px;
  flex-direction: column;
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
export const Box = styled(GenericContainer)`
  flex-direction: column;
  align-items: center;
  .bgWhite {
    position: relative;
    justify-content: center;
    border: none;
    padding: 80px;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      border-radius: 0 0 4px 4px;
      bottom: 0;
      width: 100%;
      height: 8px;
      background-color: ${(props) => props.color || '#7367F0'};
    }
  }
`;
export const HeaderBox = styled(GenericContainer)`
  justify-content: space-between;
`;
export const Label = styled(GenericContainer)`
  font-weight: 700;
  font-size: 100px;
  justify-content: center;
  color: ${(props) => props.color || '#7367F0'};
`;
export const Header = styled(GenericContainer)`
  gap: 10px;
  flex-wrap: wrap;
  padding-bottom: 10px;
  justify-content: space-between;
  border-bottom: 2px solid #ebe9f1;
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
