import { screen } from '@testing-library/react';
import { renderCustom } from '@/utils/renderCustom';
import { UnitsForm } from './UnitsForm';

describe('UnitsForm component', () => {
  test('should render without crashing', () => {
    renderCustom(<UnitsForm />);
    expect(screen.getByText('UnitsForm')).toBeTruthy();
  });
});
