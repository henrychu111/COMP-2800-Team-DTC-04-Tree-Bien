import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Link, Switch, Route } from "react-router-dom";
import DailyTips from './DailyTips';
import fire from '../../firebase';
import '../css/Main.css';





const Main = () => {
    const [authenticated, setAuthenticated] = useState(false);


    useEffect(() => {
        fire.auth().onAuthStateChanged(loggedin => {
            if (loggedin !== null) {
                setAuthenticated(true);
            }
        })
      });


    return (
        <div>
            {authenticated ? (
                <div className="container">
                    <div className="daily-tip-jumbotron">
                        <DailyTips />
                    </div>
                    <div className="function-buttons">
                        <div className="main-map-button">
                            <Link to="/map"><button>Map</button></Link>
                        </div>
                        <div className="main-mytree-button">
                            <Link to="/mytree"><button>My Tree</button></Link>
                        </div>
                        <div className="main-directory-button">
                            <Link to="/directory"><button>Directory</button></Link>
                        </div>
                        <div className="main-aboutus-button">
                            <Link to="/aboutus"><button>About Us</button></Link>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
      );
};

export default Main;
