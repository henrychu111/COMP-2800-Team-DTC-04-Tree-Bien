import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
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
import SettingimageSelected from '../../images/settings-icon-selected.png';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import '../../css/Main.css';
import { Divider } from 'antd';
import { BrowserRouter as Router, Redirect, Link, Switch, Route } from "react-router-dom";


const BottomNav = ({logout}) => {
    /**
     * @description Render the nav bar with links to each page
     * @param {function} logout
     */
    
    const [bottomNavOn, setBottomNavOn] = useState('');
    const [bottomNavSettings, setbottomNavSettings] = useState(true);

    useEffect(() => {
        /**
         * @description Change color of bottom nav icons depending on the page they are on.
         */
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
        else if (window.location.pathname === "/mytree/imageLogs") {
            setBottomNavOn('bottom-nav-my-tree')
        }
    })

    const handleonClick = () => {
        /**
         * @description Changes the color of settings icon when it is pressed.
         */
        setbottomNavSettings(!bottomNavSettings);
    }
    
    const settingPopover = (
        /**
         * @description Show pop over of options.
         */
        <Popover id="popover-basic">
            <Link to="/user"><Button className="popover-options" variant="outline-dark" style={{fontWeight: "bold"}} >Profile</Button></Link>
            <Link to="/contact"><Button className="popover-options" variant="outline-dark" style={{fontWeight: "bold"}}>Contact</Button></Link>
            <Button className="popover-options" variant="outline-dark" style={{fontWeight: "bold"}} onClick={logout}>Logout</Button>
        </Popover>
    )

    return (
        <Navbar expand="lg" variant="light" className="bottom-nav-bar" fixed="bottom" id="bottom-nav-bar">
            <Link to="/map" className="bottomNavIcons">
                {bottomNavOn === "bottom-nav-map" ? 
                <Image src={Mapimage} className="bottomNavImage" />
            : <Image src={MapimageSelected} className="bottomNavImage" />
            }
            </Link>
            <Divider type="vertical" />
            <Link to="/mytree" className="bottomNavIcons">
                {bottomNavOn === "bottom-nav-my-tree" ?
                <Image src={Treeimage} className="bottomNavImage" />
            : <Image src={TreeimageSelected} className="bottomNavImage" />
            }
            </Link>
            <Divider type="vertical" />
            <Link to="/" className="bottomNavIcons">
                {bottomNavOn === "bottom-nav-home" ?
                <Image src={Homeimage} className="bottomNavImage" />
            : <Image src={HomeimageSelected} className="bottomNavImage" />
            }
            </Link>
            <Divider type="vertical" />
            <Link to="/directory" className="bottomNavIcons">
                {bottomNavOn === "bottom-nav-directory" ?
                <Image src={Searchimage} className="bottomNavImage" id="search-item"/>
            : <Image src={SearchimageSelected} className="bottomNavImage" id="search-item"/>
            }
            </Link>
            <Divider type="vertical" />
            <div className="bottomNavIcons">
                <OverlayTrigger trigger="click" placement="top" overlay={settingPopover}>
                    {bottomNavSettings ? 
                    <Image src={SettingimageSelected} className="bottomNavImage" id="settingImage" onClick={handleonClick}/> : 
                    <Image src={Settingimage} className="bottomNavImage" id="settingImage" onClick={handleonClick}/>
                    }
                </OverlayTrigger>
            </div>
        </Navbar>
    )
}

export default BottomNav
