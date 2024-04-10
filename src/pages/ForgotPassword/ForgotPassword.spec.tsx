import { act } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { renderCustom } from '@/utils/renderCustom';
import { ForgotPassword } from './ForgotPassword';

describe('render ForgotPassword', () => {
  test('renders without crashing', () => {
    act(() => {
      renderCustom(
        <BrowserRouter>
          <Routes>
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
          </Routes>
        </BrowserRouter>
      );
    });
  });
});
