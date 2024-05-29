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

  > div:last-child {
    gap: 12px;
    display: flex;
    align-items: center;
  }
`;
export const Content = styled(GenericContainer)`
  gap: 20px;
  flex-direction: column;
  .MuiBackdrop-root {
    z-index: 2;
    color: ${({ theme }) => theme.palette.color.default};
  }
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
export const ContainerPagination = styled(GenericContainer)`
  justify-content: center;
  .MuiPagination-ul {
    li {
      width: 42px;
      height: 42px;
      display: flex;
      padding-right: 1px;
      align-items: center;
      justify-content: center;
      background-color: #f3f2f7;
      font-size: ${({ theme }) => theme.typography.fontSize + 0.1}rem;

      .Mui-selected {
        padding: 20px;
        border-radius: 60px;
      }
      .MuiButtonBase-root {
        width: 42px;
        height: 42px;
        font-size: ${({ theme }) => theme.typography.fontSize - 0.2}rem;
        font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
      }

      svg {
        color: ${({ theme }) => theme.palette.background.regular};
        font-size: ${({ theme }) => theme.typography.fontSizeRegular}rem;
      }
    }

    > li:first-child,
    li:last-child {
      border-radius: 30px;
    }

    > li:nth-child(2),
    li:nth-last-child(2) {
      margin: 0 10px;
      border-radius: 30px;
    }

    li:nth-child(3) {
      border-radius: 25px 0px 0px 25px;
    }

    li:nth-last-child(3) {
      border-radius: 0px 25px 25px 0px;
    }
    li:nth-child(n4):nth-last-child(4) {
      border-radius: 0;
    }
  }
`;
export const Form = styled.form`
  padding: 25px 25px 0;
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
  .containerBtn {
    margin: 0;
    justify-content: flex-end;
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
export const ContainerButton = styled(GenericContainer)`
  justify-content: flex-end;
`;
