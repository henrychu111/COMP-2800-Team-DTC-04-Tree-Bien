import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Link, Switch, Route } from "react-router-dom";
import DailyTips from './DailyTips';
import firebase from '../../firebase';
import '../../css/Main.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Main = () => {
    /**
     * @description Render the page buttons on main screen.
     */

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        /**
         * @description Check to see if the user is logged in, if not, they are sent to the login screen.
         */
        firebase.auth().onAuthStateChanged(loggedin => {
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
                            <Link to="/map"><pre style={{margin: "0px"}}><button>πΊοΈ   Map   πΊοΈ</button></pre></Link>
                        </Row>
                        <Row className="justify-content-center button-rows">
                            <Link to="/mytree"><button>π± My Tree π±</button></Link>
                        </Row>
                        <Row className="justify-content-center button-rows">
                            <Link to="/directory"><button>π Directory π</button></Link>
                        </Row>
                        <Row className="justify-content-center button-rows">
                            <Link to="/aboutus"><button>π« About Us π«</button></Link>
                        </Row>
                    </Container>
                </Container>
            ) : null}
        </div>
      );
};

export default Main;
