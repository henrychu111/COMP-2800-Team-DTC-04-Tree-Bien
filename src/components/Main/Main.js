import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Link, Switch, Route } from "react-router-dom";
import DailyTips from './DailyTips';
import fire from '../../firebase';
import '../css/Main.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';






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
                <Container className="container">
                    <div className="daily-tip-jumbotron">
                        <DailyTips />
                    </div>
                    <Container className="button-container">
                        <Row className="justify-content-center button-rows">
                            <button><Link to="/map">Map</Link></button>
                        </Row>
                        <Row className="justify-content-center button-rows">
                            <button><Link to="/mytree">My Tree</Link></button>
                        </Row>
                        <Row className="justify-content-center button-rows">
                            <button><Link to="/directory">Directory</Link></button>
                        </Row>
                        <Row className="justify-content-center button-rows">
                            <button><Link to="/aboutus">About Us</Link></button>
                        </Row>
                    </Container>
                </Container>
            ) : null}
        </div>
      );
};

export default Main;
