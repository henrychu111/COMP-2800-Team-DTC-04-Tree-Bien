import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import Main from "./components/Main/Main";
import firebase from "./firebase";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "./components/Map/Map";
import MyTree from "./components/AddTree/myTreePage"; //Go to componenets/AddTree/myTreePage
import BottomNav from "./components/Main/BottomNav";
import SearchView from "./components/TreeDirectory/SearchView";
import TreeDirectory from "./components/TreeDirectory/TreeDirectory";
import AboutUs from "../src/AboutUs";
import ImageLogs from "../src/components/ImageLog/ImageLog";
import SSO from "./components/Login/SSO";
import ShowTreeData from "./components/AddTree/ShowTreeData";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import ContactForm from "./components/ContactForm/ContactForm";
import Profile from "./components/UserProfile/ProfilePage"
import SearchEmpty from "./components/TreeDirectory/SearchEmpty";

function App() {
  const [user, setUser] = useState("");
  const history = useHistory();
  const location = useLocation();
  const [profilePhoto, setProfilePhoto] = useState("");

  const handleLogout = () => {
    /**
     * @description Log users out and redirect them to the login screen.
     */
    firebase.auth().signOut();
    setUser("");
    history.push("/signinmethod");
  };

  useEffect(() => {
    /**
     * @description Direct users to different pages depending on the login status.
     */
    firebase.auth().onAuthStateChanged((loggedin) => {
      if (location.pathname === "/aboutus") {
        history.push("/aboutus");
      }
      else if (loggedin === null) {
        history.push("/signinmethod");
      } else {
        if (loggedin.uid === user) {
          if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/signinmethod" || location.pathname === "/aboutus")
            history.push("/");
        } else {
          setUser(loggedin.uid);
          setProfilePhoto(loggedin.photoURL)
        }
      }
    });
  }, [user]);

  const uploadPhoto = (photoURL) => {
    firebase.auth().currentUser.updateProfile({ photoURL })
    setProfilePhoto(photoURL)
  }

  const defaultRoute = () => {
    return (
      /**
       * @description Route all the pages and their props if the user is logged in.
       */
      <div className="add-padding-bottom">
        <Switch>
          <Route path="/" exact component={() => <Main />} />
          <Route
            path="/mytree"
            exact
            component={() => <MyTree loggedinUserMyTree={user} />}
          />
          <Route path="/map" exact component={() => <Map userId={user}/>} />
          <Route path="/directory" exact component={TreeDirectory} />
          <Route path="/directory/empty" component={SearchEmpty} />
          <Route path="/directory/search" component={SearchView}></Route>
          <Route path="/aboutus" exact component={() => <AboutUs loggedinUserData={user}/>} />
          <Route
            path="/mytree/imageLogs"
            exact
            // component={() => <ImageLogs loggedinUserData={user} />}
            component={() => {
              return (
                <ImageLogs loggedinUserData={user} tree={location.state} />
              );
            }}
          />
          <Route
            path="/mytree/showtreedata"
            exact
            component={() => {
              return <ShowTreeData tree={location.state} />;
            }}
          />
          <Route path="/contact" exact component={() => <ContactForm /> } />
          <Route path="/user" exact component={() => <Profile profilePhoto = {profilePhoto} currentUser={user} uploadPhotoURL={uploadPhoto}/>} />
          <Route path="*" exact component={() => <ErrorPage />} />
          
        </Switch>
        <BottomNav logout={handleLogout} login />
      </div>
    );
  };

  return (
    /**
     * @description Route to different pages depending on the login status.
     */
    <div className="App">
      {user ? (
        <Route component={defaultRoute} />
      ) : (
        <Switch>
          <Route
            path="/login"
            exact
            component={() => <Login setUser={setUser} />}
          />
          <Route
            path="/signup"
            exact
            component={() => <SignUp />}
          />
          <Route
            path="/signinmethod"
            exact
            component={() => <SSO setUser={setUser} />}
          />
          <Route path="/aboutus" exact component={() => <AboutUs />} />
        </Switch>
      )}
    </div>
  );
}

export default App;