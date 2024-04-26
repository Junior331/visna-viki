import { unitSummaryType } from '@/utils/types';
import { handleChangeUnitProps, handleSumValuesProps } from './@types';

export const handleChangeUnit = ({
  index,
  field,
  value,
  setListUnit
}: handleChangeUnitProps) => {
  setListUnit((prevList) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newList: any = [...prevList];
    newList[index][field] = value;
    return newList;
  });
};

export const handleSumValues = ({
  id,
  type,
  value1,
  value2,
  fieldName,
  value3 = '',
  setListUnit,
  setFieldValue
}: handleSumValuesProps) => {
  const parsedValue1 = value1.replace(',', '.');
  const parsedValue2 = value2.replace(',', '.');
  const parsedValue3 = value3?.replace(',', '.');

  if (type === 'sum') {
    if (parsedValue1 && parsedValue2) {
      const sum = parseFloat(parsedValue1) * parseFloat(parsedValue2);
      sum.toFixed(2);

      setListUnit((prevList) =>
        prevList.map((unit) => {
          if (unit.id === id) {
            return {
              ...unit,
              [fieldName]: sum.toString()
            };
          }
          return unit;
        })
      );
    } else {
      console.error(
        'Um ou ambos os valores fornecidos não são números válidos.'
      );
    }
  }
  if (type === 'mult') {
    const sum1 = parseFloat(parsedValue1.replace(/\./g, '').replace(',', '.'));
    const sum2 = parseFloat(parsedValue2.replace(/\./g, '').replace(',', '.'));
    const sum3 = parseFloat(parsedValue3.replace(/\./g, '').replace(',', '.'));
    const sum = sum1 * (sum2 - sum3);

    setListUnit((prevList) =>
      prevList.map((unit) => {
        if (unit.id === id) {
          return {
            ...unit,
            [fieldName]: sum.toString()
          };
        }
        return unit;
      })
    );
  }
  if (type === 'TUID') {
    const sum =
      parseFloat(parsedValue1) *
      (parseFloat(parsedValue2) - parseFloat(parsedValue3));

    sum.toFixed(2);
    setFieldValue?.(fieldName, sum);
  }
  if (type === 'sumLand') {
    const sum1 = parseFloat(parsedValue1.replace(/\./g, '').replace(',', '.'));
    const sum2 = parseFloat(parsedValue2.replace(/\./g, '').replace(',', '.'));

    const sum = sum1 * sum2;

    setFieldValue?.(fieldName, sum);
  }
};

export const calculateTUID = (
  listUnit: unitSummaryType[],
  field: string = ''
): number => {
  let totalTUID = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listUnit.forEach((unit: any) => {
    totalTUID += parseFloat(unit[field]);
  });

  return totalTUID;
};