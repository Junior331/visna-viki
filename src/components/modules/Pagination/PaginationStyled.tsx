import styled from 'styled-components';

export const GenericContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;
export const ContainerPagination = styled(GenericContainer)`
  display: flex;
  margin: 0 auto;
  min-height: auto !important;
  > nav {
    margin: 0 !important;
    width: auto !important;
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
  }

  .SelectComponent {
    height: 40px;
    margin-left: 10px;
  }
`;
