import { Backdrop, Modal } from '@mui/material';
import { Props } from './@types';
import { icons } from '@/assets/images/icons';
import * as S from './GenericModalStyled';

export const GenericModal = ({ children, open, setOpen }: Props) => {
  return (
    <Modal
      open={open}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <S.ModalContainer>
        <S.Button onClick={() => setOpen(!open)}>
          <S.Icon src={icons.close} alt="Icon close" />
        </S.Button>
        <S.Content>{children}</S.Content>
      </S.ModalContainer>
    </Modal>
  );
};
