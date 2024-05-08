import styled from 'styled-components';

export const ContainerGeneric = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const TableContainer = styled(ContainerGeneric)`
  width: 100%;
  height: auto;
  border-radius: 6px;
  padding: 12px 10px;
  background: #ffffff;

  .MuiTableHead-root {
    .MuiTableCell-root {
      text-transform: uppercase;
      font-size: ${({ theme }) => theme.typography.fontSize - 0.2}rem;
    }
    background-color: #f3f5fb;
  }
  .MuiTableBody-root {
    .MuiTableRow-root {
      .MuiTableCell-root {
        font-size: ${({ theme }) => theme.typography.fontSize - 0.2}rem;
      }
    }
  }
  .MuiPaper-root {
    box-shadow: none;
  }
`;
