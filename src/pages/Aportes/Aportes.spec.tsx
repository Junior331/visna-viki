import { act } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { renderCustom } from '@/utils/renderCustom';
import { Aportes } from './Aportes';

describe('render Aportes', () => {
  test('renders without crashing', () => {
    act(() => {
      renderCustom(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Aportes />} />
          </Routes>
        </BrowserRouter>
      );
    });
  });
});
