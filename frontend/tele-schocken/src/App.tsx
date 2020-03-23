import React from 'react';
import './App.css';
import { MainPage } from './pages/MainPage';
import 'typeface-roboto';
import { Provider } from 'mobx-react';
import { HttpClient } from './lib/http-client/HttpClient';

function App() {

  const httpClient = new HttpClient();
  return (
    <div className='App'>
      <Provider httpClient={httpClient}>
        <MainPage />

      </Provider>
    </div>
  );
}

export default App;
