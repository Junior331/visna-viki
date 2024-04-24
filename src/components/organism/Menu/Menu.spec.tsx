import { screen } from '@testing-library/react';
import { renderCustom } from '@/utils/renderCustom';
import { Menu } from './Menu';

describe('Menu component', () => {
  test('should render without crashing', () => {
    renderCustom(<Menu />);
    expect(screen.getByText('menu')).toBeTruthy();
  });
});
