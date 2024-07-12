import { handleSumValuesProps } from './@types';

export const handleSumValues = ({
  value1,
  value2,
  value3,
  value4 = 0,
  fieldName,
  setFieldValue
}: handleSumValuesProps) => {
  const sum = value1 + value2 + value3 + value4;

  setFieldValue?.(fieldName, sum);
};
