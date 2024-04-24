import { screen } from '@testing-library/react';
import { renderCustom } from '@/utils/renderCustom';
import { HeaderBreadcrumbs } from '.';

describe('HeaderBreadcrumbs component', () => {
  test('should render without crashing', () => {
    renderCustom(<HeaderBreadcrumbs breadcrumbs={[]} />);
    expect(screen.getByText('HeaderBreadcrumbs')).toBeTruthy();
  });
});
