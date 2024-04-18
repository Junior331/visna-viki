import { screen } from '@testing-library/react';
import { renderCustom } from '@/utils/renderCustom';
import { Header } from './Header';

describe('Header component', () => {
  test('should render without crashing', () => {
    renderCustom(<Header />);
    expect(screen.getByText('header')).toBeTruthy();
  });
});
