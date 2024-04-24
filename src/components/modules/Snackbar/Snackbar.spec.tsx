import { screen } from '@testing-library/react';
import { renderCustom } from '@/utils/renderCustom';
import { Snackbar } from './Snackbar';

describe('Header component', () => {
  test('should render without crashing', () => {
    renderCustom(<Snackbar />);
    expect(screen.getByText('Snackbar')).toBeTruthy();
  });
});
