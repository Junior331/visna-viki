import { handleSumValuesProps } from './@types';

export const handleSumValues = ({
  value1,
  value2,
  value3,
  fieldName,
  setFieldValue
}: handleSumValuesProps) => {
  const sum = value1 + value2 + value3;

  setFieldValue?.(fieldName, sum);
};
