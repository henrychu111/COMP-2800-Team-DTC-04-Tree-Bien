import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Treeimage from '../../images/tree-icon.png';
import TreeimageSelected from '../../images/tree-icon-selected.png';
import Searchimage from '../../images/search-icon.png';
import SearchimageSelected from '../../images/search-icon-selected.png';
import Mapimage from '../../images/map-icon.png';
import MapimageSelected from '../../images/map-icon-selected.png'
import Homeimage from '../../images/home-icon.png';
import HomeimageSelected from '../../images/home-icon-selected.png';
import Settingimage from '../../images/settings-icon.png';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import '../../css/Main.css';


import { BrowserRouter as Router, Redirect, Link, Switch, Route } from "react-router-dom";



const BottomNav = ({logout}) => {

    const [bottomNavOn, setBottomNavOn] = useState('');

    useEffect(() => {
        if (window.location.pathname === "/map") {
            setBottomNavOn('bottom-nav-map')
        }
        else if (window.location.pathname === "/mytree") {
            setBottomNavOn('bottom-nav-my-tree')
        }
        else if (window.location.pathname === "/directory") {
            setBottomNavOn('bottom-nav-directory')
        }
        else if (window.location.pathname === "/") {
            setBottomNavOn('bottom-nav-home')
        }
    })

    const settingPopover = (
        <Popover id="popover-basic">
            <Button variant="outline-dark" style={{fontWeight: "bold"}} onClick={logout}>Logout</Button> 
        </Popover>
    )

    return (
            <Navbar expand="lg" variant="light" className="bottom-nav-bar" fixed="bottom" >
                <Link to="/map" className="bottomNavIcons">
                    {bottomNavOn === "bottom-nav-map" ? 
                    <Image src={Mapimage} className="bottomNavImage" />
                : <Image src={MapimageSelected} className="bottomNavImage" />
                }
                </Link>
                <Link to="/mytree" className="bottomNavIcons">
                    {bottomNavOn === "bottom-nav-my-tree" ?
                    <Image src={Treeimage} className="bottomNavImage" />
                : <Image src={TreeimageSelected} className="bottomNavImage" />
                }
                </Link>
                <Link to="/" className="bottomNavIcons">
                    {bottomNavOn === "bottom-nav-home" ?
                    <Image src={Homeimage} className="bottomNavImage" />
                : <Image src={HomeimageSelected} className="bottomNavImage" />
                }
                </Link>
                <Link to="/directory" className="bottomNavIcons">
                    {bottomNavOn === "bottom-nav-directory" ?
                    <Image src={Searchimage} className="bottomNavImage" />
                : <Image src={SearchimageSelected} className="bottomNavImage" />
                }
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
