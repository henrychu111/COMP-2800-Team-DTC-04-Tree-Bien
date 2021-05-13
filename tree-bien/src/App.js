import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main from './components/Main/Main';
import Directory from './components/TestPages/Directory';
import Map from './components/TestPages/Map';
import MyTree from './components/TestPages/MyTree';
import BottomNav from './components/Main/BottomNav';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";

const defaultRoute = () => {
  return (
    <div>
        <Switch>
          <Route path="/" exact component={() => <Main />} />
          <Route path="/mytree" exact component={() => <MyTree />} />
          <Route path="/map" exact component={() => <Map />} />
          <Route path="/directory" exact component={() => <Directory />} />
        </Switch>
        <BottomNav />
    </div>
  )
}


function App() {
  
  return (
    <div className="App">

        <Switch>
          <Route component={defaultRoute} />
          {/* login route here */}
        </Switch>

    </div>
  );
};

export default App;
