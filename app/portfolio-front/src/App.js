
import * as React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element ={< Home />}/>
    </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;