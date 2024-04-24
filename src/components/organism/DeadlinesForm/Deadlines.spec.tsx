import { screen } from '@testing-library/react';
import { renderCustom } from '@/utils/renderCustom';
import { DeadlinesForm } from './DeadlinesForm';

describe('DeadlinesForm component', () => {
  test('should render without crashing', () => {
    renderCustom(<DeadlinesForm />);
    expect(screen.getByText('DeadlinesForm')).toBeTruthy();
  });
});
