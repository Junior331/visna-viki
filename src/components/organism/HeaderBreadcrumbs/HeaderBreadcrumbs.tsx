import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { HeaderBreadcrumbsProps } from './@types';
import * as S from './HeaderBreadcrumbsStyled';

const HeaderBreadcrumbs = ({ breadcrumbs }: HeaderBreadcrumbsProps) => {
  const navigate = useNavigate();

  const handleBreadcrumbClick = (path: string) => {
    if (path) {
      navigate(path);
    }
  };

  const emptyComponent = (index: number, path: string) => {
    if (index === breadcrumbs.length - 1 || !path) {
      return 'span';
    } else {
      return Link;
    }
  };

  return (
    <S.ContainerBreadcrumbs>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        {breadcrumbs.map(({ path, label }, index) => (
          <Typography
            key={label}
            component={emptyComponent(index, path)}
            dangerouslySetInnerHTML={{ __html: label }}
            onClick={() => handleBreadcrumbClick(path)}
          />
        ))}
      </Breadcrumbs>
    </S.ContainerBreadcrumbs>
  );
};

export default HeaderBreadcrumbs;
