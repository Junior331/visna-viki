import styled from 'styled-components';

export const GenericContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const ContainerText = styled(GenericContainer)`
  gap: 5px;
  margin-bottom: 10px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
export const Title = styled.h2`
  color: ${({ theme }) => theme.palette.color.dark};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  font-size: ${({ theme }) => theme.typography.fontSizeRegular + 0.2}rem;
`;
export const Text = styled.p`
  gap: 5px;
  display: flex;
  flex-wrap: wrap;
  max-width: 380px;
  color: ${({ theme }) => theme.palette.color.dark};
  font-size: ${({ theme }) => theme.typography.fontSize}rem;
`;

export const Form = styled.form`
  gap: 30px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .MuiFormControl-root {
    gap: 3px;
    width: 100%;
    margin: 0px;
  }
`;

export const Label = styled.label`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.palette.color.dark};
  font-size: ${({ theme }) => theme.typography.fontSize}rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightLight};
`;

export const ContainerButtons = styled(GenericContainer)`
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  > button {
    background-color: #000;
    &:hover {
      background-color: #000;
    }
  }
  span {
    font-size: 1.6rem;
  }
`;
export const Footer = styled(GenericContainer)`
  gap: 5px;
  align-items: center;
  justify-content: center;
`;
export const Link = styled(Text)`
  cursor: pointer;
  color: ${({ theme }) => theme.palette.background.regular};
`;
