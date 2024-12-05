import React from 'react';
import ReactDOM from 'react-dom/client';  // Sử dụng `react-dom/client` thay vì `react-dom`
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

// Tạo root mới và render ứng dụng vào root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
