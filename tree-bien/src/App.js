import React from "react";
import './App.css';
import Map from "./components/Map/Map";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";




function App() {
  return (
    <Switch>
        <Route path="/map" component={() => <Map/>} />
    </Switch>
  )

}

export default App;
