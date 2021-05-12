import React from 'react'
import GoogleMapReact from 'google-map-react';
import * as parksData from "./data/parks.json";
import {Popover} from 'antd';
import 'antd/dist/antd.css';
import {ShopOutlined} from '@ant-design/icons';

function Map() {
    return (
        <div style = {{width: '100vw', height: "100vh", margin:"0"}}>
       
      <GoogleMapReact bootstrapURLKeys = {{key :  process.env.REACT_APP_GOOGLE_MAP_KEY}} 
      defaultZoom ={10} defaultCenter = {{lat: 49.263569, lng: -123.138573}}
      >
       {parksData.plantshop.map((shop) =>{
          return <Popover lat={shop.latitude} lng= {shop.longitude} key={shop.shop_id}
                    content = {<div>{shop.address + ", " + shop.city} <br/>
                                    {shop.province + ", " + shop.country + ", " + shop.postal_code}
                                </div>}
                    title = {<div><ShopOutlined style={{color:'green'}} />{" " + shop.name}</div>}
                 >
                    <img style={{width: '40px'}} src="/shopping-cart-marker.png"  />
                </Popover>
                
            
  })}
        {parksData.plantingsite.map((site) =>{
          return <Popover lat={site.latitude} lng= {site.longitude} key={site.site_id}
                    content = {<div>{site.address + ", " + site.city}<br/>
                                     {site.province + ", " + site.country + ", " + site.postal_code}
                              </div>}
                        title = {<div><img style={{width: "20px"}} src="/tree_icon.png"/>{" " + site.name}</div>}
                >
                     <img style={{width: '40px'}} src="/tree_map_icon.png" />
                </Popover>
  
  })}
      </GoogleMapReact> 
      </div>
    );
}

export default Map
