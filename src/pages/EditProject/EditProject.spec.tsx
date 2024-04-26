import { act } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { renderCustom } from '@/utils/renderCustom';
import { CreateProject } from './CreateProject';

describe('render CreateProject', () => {
  test('renders without crashing', () => {
    act(() => {
      renderCustom(
        <BrowserRouter>
          <Routes>
            <Route path="/create" element={<CreateProject />} />
          </Routes>
        </BrowserRouter>
      );
    });
  });
});
