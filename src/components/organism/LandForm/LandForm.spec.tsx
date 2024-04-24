import { screen } from '@testing-library/react';
import { renderCustom } from '@/utils/renderCustom';
import { LandForm } from './LandForm';

describe('LandForm component', () => {
  test('should render without crashing', () => {
    renderCustom(<LandForm />);
    expect(screen.getByText('LandForm')).toBeTruthy();
  });
});
