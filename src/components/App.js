import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history'
import { esES } from '@material-ui/core/locale';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
// Components
// Utils
import AppContext from './AppContext';
import adminRoutes from '../routes/menuroutes';
import { store } from '../redux/store';
import AppRoutes from './appRoutes';

const history = createBrowserHistory();
const theme = createMuiTheme({
  palette: {
    primary: { main: '#1976d2' }
  },
}, esES)
function App() {
  return (
    <AppContext.Provider
      value={{
        routes: adminRoutes
      }}>
      <Provider store={store}>
        <div className="App">
          <Router history={history}>
            <ThemeProvider theme={theme}>
              <AppRoutes />
            </ThemeProvider>
          </Router>
        </div>
      </Provider>
    </AppContext.Provider>
  );
}

export default App;
