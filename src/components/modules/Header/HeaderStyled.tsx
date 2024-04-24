import styled from 'styled-components';

export const ContainerGeneric = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Header = styled(ContainerGeneric)`
  width: 100%;
  min-height: 50px;
  padding: 12px 10px;
  align-items: center;
  background: #f3f5fb;

  .MuiSvgIcon-root {
    color: ${({ theme }) => theme.palette.color.medium};
    font-size: ${({ theme }) => theme.typography.fontSizeRegular}rem;
  }
`;
export const InfoUser = styled(ContainerGeneric)`
  gap: 10px;
`;
export const ContainerText = styled(ContainerGeneric)`
  width: auto;
  align-items: flex-end;
  flex-direction: column;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 40px;
`;

export const Title = styled.h2`
  min-width: 85px;
  text-align: right;
  color: #121212;
  font-size: ${({ theme }) => theme.typography.fontSize}rem;
`;
export const Text = styled.p`
  max-width: 380px;
  color: #121212;
  color: ${({ theme }) => theme.palette.color.medium};
  font-size: ${({ theme }) => theme.typography.fontSize - 0.2}rem;
`;
