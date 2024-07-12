import { convertToParams } from "@/utils/utils";

export const breadCrumbsItems = (id: string, name: string) => [
  {
    path: `/edit?${convertToParams({ id, name })}`,
    label: `${name}`
  },
  {
    path: `/edit?${convertToParams({ id, name })}`,
    label: 'Fluxo'

  }
];
