import { Zoom, tooltipClasses, Tooltip as MuiTooltip } from '@mui/material';
import { Props } from './@types';
import * as S from './TooltipStyled';
import Theme from '@/styles/Theme';

const Tooltip = ({ title,  children }: Props) => {
  return (
    <S.Container>
      <MuiTooltip
        arrow
        placement="top"
        title={title}
        TransitionComponent={Zoom}
        slotProps={{
          popper: {
            sx: {
              [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                {
                  marginBottom: '10px',
                  backgroundColor: Theme.palette.background.regular,
                  span: {
                    color: Theme.palette.background.regular
                  }
                }
            }
          }
        }}
      >
        {children}
      </MuiTooltip>
    </S.Container>
  );
};

export { Tooltip };
