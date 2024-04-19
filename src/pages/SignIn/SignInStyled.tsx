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
  flex-direction: column;
`;
export const Title = styled.h2`
  color: ${({ theme }) => theme.palette.color.regular};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  font-size: ${({ theme }) => theme.typography.fontSizeRegular + 0.2}rem;
`;
export const Text = styled.p`
  gap: 5px;
  display: flex;
  flex-wrap: wrap;
  max-width: 380px;
  color: ${({ theme }) => theme.palette.color.medium};
  font-size: ${({ theme }) => theme.typography.fontSize - 0.2}rem;
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
`;

export const Label = styled.label`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.palette.color.medium};
  font-size: ${({ theme }) => theme.typography.fontSize}rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightLight};
`;

export const ContainerButtons = styled(GenericContainer)`
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
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
