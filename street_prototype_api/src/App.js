import React from 'react';
import Navbar from "./components/Navbar";
import Map from "./components/map";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';

function App(){
  return(
    <>
      <Router>
        <Navbar/>
        <Map></Map>
      </Router>
    </>
  );
}

export default App;
