import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


import './i18n';

const theme = createMuiTheme({
    palette: {
        primary: {

            main: '#b71c1c',

          },
          secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#ffffff  ',
          },
    },
  });

ReactDOM.render(
    <div>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <MuiThemeProvider theme={theme}>
                    <App />
                </MuiThemeProvider>
            </ConnectedRouter>
        </Provider>
    </div>
    , document.getElementById('root'));
registerServiceWorker();
