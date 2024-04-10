import React from 'react';
import { OutlinedInputProps, TextFieldProps } from '@mui/material';

export type Props = {
  id?: string;
  label?: string;
  disabled?: boolean;
};

export type InputProps = TextFieldProps &
  OutlinedInputProps & {
    typeElement?: React.ElementType;
  };
