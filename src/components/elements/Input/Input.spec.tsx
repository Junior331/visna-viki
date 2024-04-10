import { screen } from '@testing-library/react';
import { renderCustom } from '@/utils/renderCustom';
import { Input } from './Input';

describe('Input component', () => {
  const mockProps = {
    placeholder: 'Text'
  };
  test('should render without crashing', () => {
    renderCustom(<Input />);
    expect(screen.getByText(mockProps.placeholder)).toBeTruthy();
  });
});
