import { getImage } from '@/assets/images';
import media from '@/styles/breakpoints';
import styled from 'styled-components';
import { StyledProps } from './@types';

export const LayoutContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  margin: 0 auto;
  max-width: 100%;
  align-items: start;
  flex-direction: column;
  justify-content: space-between;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${getImage('background')});
`;
export const Header = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  background-size: cover;
  background-position: center;
  justify-content: flex-start;
  background-repeat: no-repeat;
  background-image: url(${getImage('background')});

  ${media.lessThan('regular')`
    display: none;
  `}
`;
export const Img = styled.img`
  width: auto;
  object-fit: cover;
`;
export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 70px;
  align-items: center;
  justify-content: space-between;
`;
export const ContainerAbstract = styled.div`
  width: auto;
  display: flex;

  ${media.lessThan('regular')`
    display: none;
  `}
`;
export const Text = styled.p<StyledProps>`
  width: 100%;
  margin: auto 0;
  max-width: 630px;
  font-weight: 100;
  text-align: left;
  word-wrap: break-word;
  font-size: ${({ size }) => size || '5'}rem;
  color: ${({ theme }) => theme.palette.color.default};
`;
export const Span = styled.span<StyledProps>`
  font-size: ${({ size }) => size}rem;
  color: ${({ theme, color }) => color || theme.palette.color.default};
`;
export const LayoutContent = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  max-width: 650px;
  min-width: 450px;
  align-items: flex-start;
  justify-content: flex-end;
  background: linear-gradient(
    90deg,
    rgba(29, 110, 136, 0.7) 1.64%,
    rgba(67, 99, 116, 0.7) 50.82%,
    rgba(36, 66, 82, 0.7) 100%
  );
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 28px;

  > div {
    width: 100%;
    height: 100%;
    padding: 40px 70px;
    .MuiInputBase-root {
      outline: none;
      background-color: #fff !important;
      &:hover .MuiOutlinedInput-notchedOutline {
        border: none !important;
      }
    }
  }
  ${media.lessThan('regular')`
    width: 100%;
  `}
`;
export const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  p,
  span {
    text-align: center;
    font-weight: 300;
    font-family: 'Inter', sans-serif !important;
  }
`;
export const ContainerOthers = styled.div`
  display: flex;
  margin: 40px 0;
  align-items: center;
  justify-content: space-between;
`;
export const Line = styled.div`
  height: 2px;
  flex: 1 0 30%;
  border-radius: 30px;
  background: rgba(230, 230, 230, 1);
`;
export const GoogleButton = styled.div`
  height: 40px;
  display: flex;
  cursor: no-drop;
  border-radius: 8px;
  position: relative;
  margin-bottom: 40px;
  align-items: center;
  justify-content: center;
  background: rgba(238, 238, 238, 1);
  font-size: ${({ theme }) => theme.typography.fontSize}rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold - 100};
`;
export const Icon = styled.img`
  left: 10px;
  position: absolute;
`;
