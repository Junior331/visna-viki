import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';
import Provider from '@/state/provider';
import Theme from '@/styles/Theme';

function App() {
  return (
    <Provider>
      <ThemeProvider theme={Theme}>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
