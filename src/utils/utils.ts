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
