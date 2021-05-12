import React from 'react'
import GoogleMapReact from 'google-map-react';
import * as parksData from "./data/parks.json";

function Map() {
    return (
        <div style = {{width: '100vw', height: "100vh"}}>
       
      <GoogleMapReact bootstrapURLKeys = {{key : "AIzaSyCZGmMsYQX8uffhtpk7WC68LCnO80EE6Vw"}} 
      defaultZoom ={10} defaultCenter = {{lat: 49.263569, lng: -123.138573}}
      >
       {parksData.plantshop.map((shop) =>{
          return <img style={{width: '50px'}} src="/shopping-cart-marker.png" lat={shop.latitude} lng= {shop.longitude} />
  })}
        {parksData.plantingsite.map((site) =>{
          return <img style={{width: '50px'}} src="/tree_map_icon.png" lat={site.latitude} lng= {site.longitude} />
  })}
      </GoogleMapReact> 
      </div>
    );
}

export default Map
