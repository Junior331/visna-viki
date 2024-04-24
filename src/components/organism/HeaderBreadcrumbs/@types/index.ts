export type BreadcrumbItem = {
  path: string;
  label: string;
  ComponentType?: 'Typography' | 'Link' | string;
};

export type HeaderBreadcrumbsProps = {
  breadcrumbs: BreadcrumbItem[];
};
