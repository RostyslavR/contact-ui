import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'redux/store';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'components/theme';
// import 'modern-normalize';
// import './styles.css';
import App from 'components/App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter basename="contact-ui">
            {/* <BrowserRouter> */}
            <App />
          </BrowserRouter>
        </PersistGate>{' '}
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
