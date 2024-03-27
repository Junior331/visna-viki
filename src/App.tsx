import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes";
import Theme from "@/styles/Theme";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
