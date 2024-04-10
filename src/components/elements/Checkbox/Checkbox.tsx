import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';
import { Props } from './@types';
import * as S from './CheckboxStyled';

const Checkbox = ({ onClick, label, ...rest }: Props) => {
  return (
    <S.Container>
      <FormControlLabel
        {...rest}
        label={label}
        onClick={onClick}
        control={<MuiCheckbox />}
      />
    </S.Container>
  );
};

export { Checkbox };
