import { screen } from '@testing-library/react';
import { renderCustom } from '@/utils/renderCustom';
import { Checkbox } from './Checkbox';

describe('Checkbox component', () => {
  const mockProps = {
    label: 'Text',
    onClick: jest.fn()
  };
  test('should render without crashing', () => {
    renderCustom(<Checkbox label={mockProps.label} />);
    expect(screen.getByText(mockProps.label)).toBeTruthy();
  });
});
