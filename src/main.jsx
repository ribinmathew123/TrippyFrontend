// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';
// import { Provider } from 'react-redux';
// import store from './Redux/app/store';


// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

import { createRoot } from 'react-dom/client'; // Import from "react-dom/client"
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './Redux/app/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

      <App />
      </GoogleOAuthProvider>

    </Provider>
);









