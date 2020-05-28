import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app.js';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    //<Page/>,
    //<Map/>,
    <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  	document.getElementById('root')
);

