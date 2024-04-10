import { act } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { renderCustom } from '@/utils/renderCustom';
import { SignIn } from './SignIn';

describe('render SignIn', () => {
  test('renders without crashing', () => {
    act(() => {
      renderCustom(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      );
    });
  });
});
