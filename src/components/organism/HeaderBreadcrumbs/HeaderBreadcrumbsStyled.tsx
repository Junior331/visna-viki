import styled from 'styled-components';

export const ContainerBreadcrumbs = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

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
