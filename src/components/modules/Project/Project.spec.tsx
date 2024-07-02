import { screen } from '@testing-library/react';
import { renderCustom } from '@/utils/renderCustom';
import { Project } from './Project';

describe('Project component', () => {
  const mockProps = {
    progress: 80,
    status: 'Done',
    name: 'Project 01',
    text: `Lorem Ipsum'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.`
  };
  test('should render without crashing', () => {
    renderCustom(<Project id={''} handleClick={() => {}} {...mockProps} />);
    expect(screen.getByText('Project')).toBeTruthy();
  });
});
