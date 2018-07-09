import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'

ReactDOM.render(
    <div>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                    <App />
            </ConnectedRouter>
        </Provider>
    </div>
    , document.getElementById('root'));
registerServiceWorker();
