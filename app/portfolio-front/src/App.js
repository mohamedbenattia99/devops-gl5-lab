
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ProductPage from './components/ProductPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element ={< Home />}/>
      <Route path="/:id" element={< ProductPage />}/>
    </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;