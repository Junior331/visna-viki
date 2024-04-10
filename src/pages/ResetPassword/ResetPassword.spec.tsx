import { act } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { renderCustom } from '@/utils/renderCustom';
import { ResetPassword } from './ResetPassword';

describe('render ResetPassword', () => {
  test('renders without crashing', () => {
    act(() => {
      renderCustom(
        <BrowserRouter>
          <Routes>
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      );
    });
  });
});
