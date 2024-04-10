import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderCustom } from '@/utils/renderCustom';
import { Button } from './Button';

describe('Button component', () => {
  const mockProps = {
    text: 'Click me!',
    onClick: jest.fn()
  };
  test('should render without crashing', () => {
    renderCustom(<Button size="small">{mockProps.text}</Button>);
    expect(screen.getByText(mockProps.text)).toBeTruthy();
  });

  test('should can click in button', () => {
    renderCustom(
      <Button onClick={mockProps.onClick} size="small">
        {mockProps.text}
      </Button>
    );
    fireEvent.click(screen.getByText(mockProps.text));
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  test("should can't click in button", () => {
    renderCustom(
      <Button size="small" disabled noActive>
        {mockProps.text}
      </Button>
    );
    userEvent.click(screen.getByText(mockProps.text));
    expect(mockProps.onClick).not.toHaveBeenCalled();
  });

  test('style Button component with variation size large', () => {
    renderCustom(
      <Button onClick={mockProps.onClick} size="large">
        {mockProps.text}
      </Button>
    );
    const styles = getComputedStyle(screen.getByText(mockProps.text));
    expect(styles.width).toBe('100%');
  });

  test('style Button component with variation size medium', () => {
    renderCustom(
      <Button onClick={mockProps.onClick} size="medium">
        {mockProps.text}
      </Button>
    );
    const styles = getComputedStyle(screen.getByText(mockProps.text));
    expect(styles.width).toBe('60%');
  });

  test('style Button component with variation size small', () => {
    renderCustom(
      <Button onClick={mockProps.onClick} size="small">
        {mockProps.text}
      </Button>
    );

    const styles = getComputedStyle(screen.getByText(mockProps.text));
    expect(styles.width).toBe('15%');
  });
});
