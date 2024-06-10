import { handleKeyDown } from '@/utils/utils';
import { InputProps } from './@types';
import { TextField } from '@mui/material';

const Input = ({
  typeElement: InputComponent = TextField,
  ...rest
}: InputProps) => {
  return (
    <InputComponent
      onKeyDown={handleKeyDown}
      className={rest.disabled ? 'inputDisabled' : ''}
      {...rest}
    />
  );
};

export { Input };
