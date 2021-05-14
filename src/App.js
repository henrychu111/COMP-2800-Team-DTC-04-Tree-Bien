import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import Main from "./components/Main/Main";
import fire from "./firebase";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "./components/Map/Map";
import MyTree from "./components/AddTree/myTreePage"; //Go to componenets/AddTree/myTreePage
import BottomNav from "./components/Main/BottomNav";
import SearchView from "./components/TreeDirectory/SearchView";
import TreeDirectory from './components/TreeDirectory/TreeDirectory';
import AboutUs from '../src/AboutUs';

function App() {
  const [user, setUser] = useState("");
  const history = useHistory();

  const handleLogout = () => {
    fire.auth().signOut();
    setUser("");
  };

  useEffect(() => {
    fire.auth().onAuthStateChanged((loggedin) => {
      console.log(loggedin, user);
      if (loggedin === null) {
        console.log("hi");
        history.push("/login");
      } else if (loggedin.email === user) {
        history.push("/");
      } else {
        history.push("/login");
      }
    });
  }, [user]);

  const defaultRoute = () => {
    return (
      <div className="add-padding-bottom">
        <Switch>
          <Route path="/" exact component={() => <Main />} />
          <Route path="/mytree" exact component={() => <MyTree />} />
          <Route path="/map" exact component={() => <Map />} />
          <Route path="/directory" exact component={TreeDirectory} />
          <Route path="/directory/search" component={SearchView}></Route>
          <Route path="/aboutus" exact component={() => <AboutUs />} />
        </Switch>
        <BottomNav />
      </div>
    );
  };

  return (
    <div className="App">
      {user ? (
        <Route component={defaultRoute} />
      ) : (
        <Switch>
          {/* <Route
            path="/"
            exact
            component={() => <Main handleLogout={handleLogout} />}
          /> */}
          {/* <Route component={defaultRoute} /> */}
          <Route
            path="/login"
            exact
            component={() => <Login setUser={setUser} />}
          />
          <Route
            path="/signup"
            exact
            component={() => <SignUp setUser={setUser} />}
          />
        </Switch>
      )}
    </div>
  );
}

export default App;

// <Switch>
// <Route path="/" exact component={() => <Main handleLogout={handleLogout}/>} />
// {/* <Route component={defaultRoute} /> */}
// <Route path="/login" exact component={() => <Login
// setUser={setUser} />} />
// <Route path="/signup" exact component={() => <SignUp
// setUser={setUser} />} />
// </Switch>
