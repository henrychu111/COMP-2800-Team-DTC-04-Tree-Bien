import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Link, Switch, Route } from "react-router-dom";
import DailyTips from './DailyTips';




const Main = () => {
    return (
        <div className="container">
            <div className="daily-tip-jumbotron">
                <DailyTips />
            </div>
            <div className="function-buttons">
                <div className="main-map-button">
                    <button><Link to="/map">Map</Link></button>
                </div>
                <div className="main-mytree-button">
                    <button><Link to="/mytree">My Tree</Link></button>
                </div>
                <div className="main-directory-button">
                    <button><Link to="/directory">Directory</Link></button>
                </div>
                <div className="main-aboutus-button">
                    <button><Link to="/aboutus">About Us</Link></button>
                </div>
            </div>
        </div>
      );
};

export default Main;
