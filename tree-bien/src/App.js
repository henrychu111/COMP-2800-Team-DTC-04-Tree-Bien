// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import './App.css';
import React from "react";

import {BrowserRouter as Router, Route,Link,Switch,Redirect} from "react-router-dom";
import TreeHome from "./components/TreeDirectory/TreeDirectory";
import SearchView from "./components/TreeDirectory/SearchView";

function App() {
  return (
      <Router>
          <div className="App">
              <Route exact path="/" component={TreeHome}>
              </Route>
              <Route path="/search" component={SearchView}></Route>
          </div>
      </Router>
  );
}

export default App;

