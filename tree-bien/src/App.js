import './App.css';
import React from "react";

import {BrowserRouter as Router, Route,Link,Switch,Redirect} from "react-router-dom";
import SearchView from "./components/TreeDirectory/SearchView";
import TreeDirectory from './components/TreeDirectory/TreeDirectory';

function App() {
  return (
      <Router>
          <div className="App">
              <Route exact path="/" component={TreeDirectory}>
              </Route>
              <Route path="/search" component={SearchView}></Route>
          </div>
      </Router>
  );
}

export default App;

