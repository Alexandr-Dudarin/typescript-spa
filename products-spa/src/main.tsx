import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import App from './App';

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.body.dataset.theme = savedTheme;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/typescript-spa">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);