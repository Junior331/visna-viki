import { screen } from '@testing-library/react';
import { renderCustom } from '@/utils/renderCustom';
import { Card } from './Card';

describe('Card component', () => {
  const mockProps = {
    text: 'Card',
    width: '256px',
    height: 'auto',
    handleClick: () => {}
  };
  test('should render without crashing', () => {
    renderCustom(
      <Card {...mockProps}>
        <h2>{mockProps.text}</h2>
      </Card>
    );
    expect(screen.getByText('Card')).toBeTruthy();
  });
});
