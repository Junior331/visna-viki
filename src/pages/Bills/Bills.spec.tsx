import { act } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { renderCustom } from '@/utils/renderCustom';
import { Bills } from './Bills';

describe('render Bills', () => {
  test('renders without crashing', () => {
    act(() => {
      renderCustom(
        <BrowserRouter>
          <Routes>
            <Route path="/bills" element={<Bills />} />
          </Routes>
        </BrowserRouter>
      );
    });
  });
});
