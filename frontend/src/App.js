import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useSyncExternalStore, useContext } from 'react';

import {AuthProvider} from './Context/AuthContext'
import Routes from './routes'; 

import initFontAwesome from "./lib/initFontAwesome";
initFontAwesome();

function App() {

  return (

    <AuthProvider>
      <Routes/>
    </AuthProvider>
    
  );
}

export default App;
