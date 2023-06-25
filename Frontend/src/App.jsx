import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/Header'
import Home from './components/home/Home'
import Registro from './components/Registro/Registro'
import About from './components/about/About'
import Login from './components/login/Login'
// import { Router, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';




function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header/>
          <Home/>
        </Route>  
        <Route exact path="/Registro">
          <Registro/>
        </Route>
        <Route exact path="/Login">
          <Login/>
        </Route>
      </Switch>  
    </Router>
  );
}

export default App

