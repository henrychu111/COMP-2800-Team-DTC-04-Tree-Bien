import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
import { Popover } from 'antd';
import 'antd/dist/antd.css';
import { ShopOutlined } from '@ant-design/icons';
import fire from '../../firebase';

function Map() {
  const [plantingSites, setPlantingSites] = useState([]);
  const [plantShops, setPlantShops] = useState([]);
  const [location, setLocation] = useState({latitude: 49.263569, longitude: -123.138573})
  const db = fire.firestore();

  useEffect(() => {
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
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
    setLocation({latitude: position.coords.latitude, longitude: position.coords.longitude});
  })
}  
  }, [])
  return (
    <div style={{ width: '90vw', height: "70vh", margin: "70px auto" }}>
        <div style={{marginBottom: '10px'}}>
        <img style={{ width: '25px' }} src="/shopping-cart-marker.png" />
        <span style={{marginRight: '20px'}}>= Tree Vendor</span>
        <img style={{ width: '25px' }} src="/tree_map_icon.png" />
        <span>= Planting Site</span>
        </div>
      <GoogleMapReact bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
        defaultZoom={13} center={{ lat: location.latitude, lng: location.longitude}}
        defaultCenter={{ lat: location.latitude, lng: location.longitude}}
      >
        {plantShops && plantShops.map((shop) => {
          return <Popover lat={shop.latitude} lng={shop.longitude} key={shop.id}
            content={<div>{shop.address + ", " + shop.city} <br/>
              {shop.province + ", " + shop.country + ", " + shop.postalcode}<br/>
              <b> Specialty Trees: </b> {shop.specialties}
            </div>}
            title={<div><ShopOutlined style={{ color: 'green' }} />{" " + shop.name}</div>}
          >
            <img style={{ width: '40px' }} src="/shopping-cart-marker.png" />
          </Popover>
        })}
        {plantingSites && plantingSites.map((site) => {
          return <Popover lat={site.latitude} lng={site.longitude} key={site.id}
            content={<div>{site.address + ", " + site.city}<br/>
              {site.province + ", " + site.country + ", " + site.postalcode}<br/>
              <b> Best Trees To Plant:</b> {site.suggestedplants}
            </div>}
            title={<div><img style={{ width: "20px" }} src="/tree_icon.png" />{" " + site.name}</div>}
          >
            <img style={{ width: '40px' }} src="/tree_map_icon.png" />
          </Popover>

        })}
      </GoogleMapReact>
    </div>
  );
}

export default Map
