import { act } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { renderCustom } from '@/utils/renderCustom';
import { SignUp } from './SignUp';

describe('render SignUp', () => {
  test('renders without crashing', () => {
    act(() => {
      renderCustom(
        <BrowserRouter>
          <Routes>
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      );
    });
  });
});
