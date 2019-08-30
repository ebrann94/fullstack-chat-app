import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { AppContextProvider } from './store/configure-store';

const jsx = (
    <AppContextProvider>
        <App />
    </AppContextProvider>
)

ReactDOM.render(jsx, document.getElementById('root'));