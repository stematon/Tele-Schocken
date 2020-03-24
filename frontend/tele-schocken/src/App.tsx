import React from 'react';
import './App.css';
import { MainPage } from './pages/MainPage';
import 'typeface-roboto';
import { Provider } from 'mobx-react';

function App() {

  return (
    <div className='App'>
      <Provider>
        <MainPage />
      </Provider>
    </div>
  );
}

export default App;
