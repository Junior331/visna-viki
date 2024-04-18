import { screen } from '@testing-library/react';
import { renderCustom } from '@/utils/renderCustom';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar component', () => {
  const mockProps = {
    max: 80,
    value: 80,
    bgColorMax: '#46E58D1e',
    bgColorValue: '#28c76f'
  };
  test('should render without crashing', () => {
    renderCustom(<ProgressBar {...mockProps} />);
    expect(screen.getByText('ProgressBar')).toBeTruthy();
  });
});
