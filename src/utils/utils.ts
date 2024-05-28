import { MaskType, handleClickProps, handleProps } from './types';

export const typeMask = (type: MaskType, value: string): string => {
  if (!value) return '';

  switch (type) {
    case MaskType.CEP:
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
    case MaskType.NUMBER:
      // eslint-disable-next-line no-case-declarations
      const numericValue = parseFloat(value.replace(/\D/g, ''));
      if (!isNaN(numericValue)) {
        return numericValue.toLocaleString('pt-BR');
      }
      break;
    case MaskType.DATE:
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{4})\d+?$/, '$1');
    default:
      return value;
  }

  return value;
};

export const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

export const formatterV2 = new Intl.NumberFormat('pt-BR', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export const parseFormattedNumber = (formattedNumber: string) => {
  // Remove os pontos de separação de milhares
  let number = formattedNumber.replace(/\./g, '');
  // Substitui a vírgula por um ponto para converter em número decimal
  number = number.replace(',', '.');
  // Converte a string para número
  return parseFloat(number);
};

export const formatCurrency = (value: string): string => {
  // Remove todos os caracteres não numéricos
  const numericValue = value.replace(/\D/g, '');

  // Verifica se o valor é vazio ou não numérico
  if (!numericValue || isNaN(parseFloat(numericValue))) {
    return '';
  }

  // Converte o valor para um número e formata como moeda brasileira (BRL)
  const numberValue = parseFloat(numericValue) / 100;
  const formattedValue = numberValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return formattedValue;
};

export const formatDate = (dateInput: string | Date): string => {
  if (typeof dateInput === 'string' && dateInput.trim() === '') {
    return '-';
  }

  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const convertDateToISO = (dateString: string) => {
  if (typeof dateString === 'string' && dateString.trim() === '') {
    return '-';
  }
  const [day, month, year] = dateString.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toISOString();
};

export const handleClickMenu = ({ event, setAnchorEl }: handleClickProps) => {
  setAnchorEl(event.currentTarget);
};

export const handleCloseMenu = ({ setAnchorEl }: handleProps) => {
  setAnchorEl(null);
};

export const convertToParams = (
  data:
    | string
    | string[][]
    | Record<string, string>
    | URLSearchParams
    | undefined
) => data && new URLSearchParams(data).toString();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cleanObject = (obj: { [s: string]: any }) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) =>
        value !== 0 &&
        value !== null &&
        value !== '' &&
        value !== undefined &&
        value?.length !== 0
    )
  );

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cleanObjectWithZero = (obj: { [s: string]: any }) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) =>
        value !== null &&
        value !== '' &&
        value !== undefined &&
        value?.length !== 0
    )
  );

export const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
};
