import { convertToParams } from '@/utils/utils';
import { handleProps } from './@types';

export const handleEdit = ({ navigate, expenseActive }: handleProps) => {
  navigate(
    `/expense?isEdit=true&${convertToParams({
      name: expenseActive.typesCost as string
    })}`,
    {
      state: {
        expense: expenseActive
      }
    }
  );
};
