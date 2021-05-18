import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Treeimage from '../../images/tree-icon.png';
import Searchimage from '../../images/search-icon.png';
import Mapimage from '../../images/map-icon.png';
import Homeimage from '../../images/home-icon.png';
import Settingimage from '../../images/settings-icon.png';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import '../../css/Main.css';


import { BrowserRouter as Router, Redirect, Link, Switch, Route } from "react-router-dom";



const BottomNav = ({logout}) => {

    // Add onclick logout to button after merge
    const settingPopover = (
        <Popover id="popover-basic">
            <Button variant="outline-dark" style={{fontWeight: "bold"}} onClick={logout}>Logout</Button> 
        </Popover>
    )

    return (
            <Navbar expand="lg" variant="light" className="bottom-nav-bar" fixed="bottom" >
                <Link to="/map" className="bottomNavIcons">
                    <Image src={Mapimage} className="bottomNavImage" />
                </Link>
                <Link to="/mytree" className="bottomNavIcons">
                    <Image src={Treeimage} className="bottomNavImage" />
                </Link>
                <Link to="/" className="bottomNavIcons">
                    <Image src={Homeimage} className="bottomNavImage" />
                </Link>
                <Link to="/directory" className="bottomNavIcons">
                    <Image src={Searchimage} className="bottomNavImage" />
                </Link>
                <div className="bottomNavIcons">
                    <OverlayTrigger trigger="click" placement="top" overlay={settingPopover}>
                        <Image src={Settingimage} className="bottomNavImage" id="settingImage" />
                    </OverlayTrigger>
                </div>
            </Navbar>
    )
}

export default BottomNav
