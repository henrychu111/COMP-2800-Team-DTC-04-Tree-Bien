import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp';
import Main from './components/Main/Main';
import fire from './firebase';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";


function App() {

  const [user, setUser] = useState('');
  const history = useHistory();

  const handleLogout = () => {
    fire
    .auth().signOut();
    setUser('');
  };

  useEffect(() => {
    fire.auth().onAuthStateChanged(loggedin => {
      console.log(loggedin, user);
      if (loggedin === null) {
        console.log("hi");
        history.push("/login");
      }
      else if (loggedin.email === user) {
        history.push("/");
      }
      else {
        history.push("/login");
      }
    })
  }, [user]);

  return (
    <div className="App">
        <Switch>
          <Route path="/" exact component={() => <Main handleLogout={handleLogout}/>} />
          <Route path="/login" exact component={() => <Login 
          setUser={setUser} />} />
          <Route path="/signup" exact component={() => <SignUp 
          setUser={setUser} />} />
        </Switch>
    </div>
  );
};

export default App;
