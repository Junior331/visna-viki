import styled from 'styled-components';

export const GenericContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const ContainerBreadcrumbs = styled(GenericContainer)`
  width: auto;
  height: 100%;
  align-items: center;

  .MuiTypography-root {
    cursor: context-menu;
    color: ${({ theme }) => theme.palette.color.light} !important;
    font-size: ${({ theme }) => theme.typography.fontSize}rem !important;
  }
  > nav {
    > ol {
      > li:last-child {
        > span {
          color: ${({ theme }) => theme.palette.color.dark}!important;
          font-weight: ${({ theme }) =>
            theme.typography.fontWeightRegular}!important;
        }
      }
    }
  }
  .MuiLink-root {
    cursor: pointer;
    text-decoration: none;
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
export const Icon = styled.img``;
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
export const ContainerButtons = styled(GenericContainer)`
  gap: 30px;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
`;
