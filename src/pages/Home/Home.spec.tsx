import { act } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { renderCustom } from "@/utils/renderCustom";
import { Home } from "./Home";

describe("render Home", () => {
  test("renders without crashing", () => {
    act(() => {
      renderCustom(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      );
    });
  });
});
