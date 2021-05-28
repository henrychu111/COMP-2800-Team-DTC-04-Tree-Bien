import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
import { Popover } from 'antd';
import "../../css/Map.css";
import 'antd/dist/antd.css';
import { ShopOutlined } from '@ant-design/icons';
import firebase from '../../firebase';

function Map({userId}) {

  const [userTrees, setUserTrees] = useState([]);
  const [plantingSites, setPlantingSites] = useState([]);
  const [plantShops, setPlantShops] = useState([]);
  const [location, setLocation] = useState({latitude: 49.263569, longitude: -123.138573})
  const [curLocation, setCurLocation] = useState(null)
  const db = firebase.firestore();

  useEffect(() => {
    /**
     * @description Fetch user trees information 
     */
    const fetchUserPlants = async () => {
      const response = db.collection("users").doc(userId).collection("add-new-tree");
      const data = await response.get();
       data.docs.forEach((tree) => {
          setUserTrees(oldTrees => [...oldTrees, {location: tree.data().location, name: tree.data().name}]);
        })
    }
    fetchUserPlants();
  }, [])

  useEffect(() => {
    /**
     * @description Fetch planting sites information 
     * information is compiled through personal research
     */
    const fetchPlantingSites = async () => {
      const response = db.collection("plantingsites");
      const data = await response.get();
      data.docs.forEach((site) => {
        setPlantingSites(oldSites => [...oldSites, { id: site.id, ...site.data() }])
      })
    }
    fetchPlantingSites();
  }, [])

  useEffect(() => {
    /**
     * @description Fetch plant shop information
     * information is compiled through personal research
     */
    const fetchPlantingShops = async () => {
      const response = db.collection("plantshops");
      const data = await response.get();
      data.docs.forEach((shop) => {
        setPlantShops(oldShops => [...oldShops, {id: shop.id, ...shop.data()}])
      })
    }
    fetchPlantingShops();
  }, [])

  useEffect(() => {
    /**
     * @description Centers user location if location allowed
     */
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
    setLocation({latitude: position.coords.latitude, longitude: position.coords.longitude});
    setCurLocation({latitude: position.coords.latitude, longitude: position.coords.longitude});    
  })
}  
  }, [])

  return (
    /**
     * @description Renders Google map and icons for planting sites, planting shops, and user location
     */
    <div style={{ width: '100vw', height: "93vh" }}>
      <GoogleMapReact bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
        defaultZoom={13} center={{ lat: location.latitude, lng: location.longitude}}
        defaultCenter={{ lat: location.latitude, lng: location.longitude}}
      >
        {curLocation && 
        <div id="outer-location" 
             lat={curLocation.latitude} 
             lng={curLocation.longitude} >
             <div id="inner-location"/></div>}
        {plantShops && plantShops.map((shop) => {
          /**
           * @description maps through plant shops and displays information
           */
          return (
            <Popover trigger = "click" 
                     lat={shop.latitude} 
                     lng={shop.longitude} 
                     key={shop.id}
                     content={
                      <div>{shop.address + ", " + shop.city} <br/>
                           {shop.province + ", " + shop.country + ", " + shop.postalcode}<br/>
                        <b> Specialty Trees: </b> {shop.specialties}
                     </div>}
                     title={<div><ShopOutlined style={{ color: 'green' }} />{" " + shop.name}</div>}
          >
              <img id="shopping-cart" src="/shopping-cart-marker.png" />
          </Popover>
          )
        })}
        {plantingSites && plantingSites.map((site) => {
          /**
           * @description maps through planting sites and displays information
           */
          return (
            <Popover trigger = "click" 
                     lat={site.latitude} 
                     lng={site.longitude} 
                     key={site.id}
                     content={
                     <div>{site.address + ", " + site.city}<br/>
                          {site.province + ", " + site.country + ", " + site.postalcode}<br/>
                          <b> Best Trees To Plant:</b> {site.suggestedplants} <br/>
                          <b>Planted Trees: </b> 
                          {userTrees.length > 0 ? userTrees.filter(tree => {
                            return tree.location === site.id}).map((tree) => tree.name).join(", ") : " No Trees Planted"}  
                    </div>}
                    title={<div><img  id="tree-icon" src="/tree_icon.png" />{" " + site.name}</div>}
          >
            <img id="tree-map-icon" src="/tree_map_icon.png" />
          </Popover>
          )
        })}
      </GoogleMapReact>
      <div id="legend" style={{}}>
        <img id="shopping-cart-legend" src="/shopping-cart-marker.png" />
        <span id="tree-vendor-span"> Tree Vendor</span>
        <img id= "tree-map-icon-legend"  src="/tree_map_icon.png" />
        <span id="planting-site-legend" > Planting Site</span>
        </div>
    </div>
  );
}

export default Map
