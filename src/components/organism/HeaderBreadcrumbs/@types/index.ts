/* eslint-disable @typescript-eslint/no-explicit-any */
export type BreadcrumbItem = {
  path: string;
  label: string;
  ComponentType?: 'Typography' | 'Link' | string;
};

export type HeaderBreadcrumbsProps = {
  stateParams?: any;
  breadcrumbs: BreadcrumbItem[];
};
