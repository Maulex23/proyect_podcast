// import { useState } from 'react'
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Registro from "./components/Registro/Registro";
// import About from './components/review/Review'
import Login from "./components/login/Login";
// import { Router, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Review from "./components/review/Review";
import Playlist from "./components/Playlist/Playlist";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <Home />
          <div className="review" id="reseñas">
            <Review />
          </div>
        </Route>
        <Route exact path="/Registro">
          <Header />
          <Registro />
        </Route>
        <Route exact path="/Login">
          <Header />
          <Login />
        </Route>
        <Route exact path="/test">
          <Playlist />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
