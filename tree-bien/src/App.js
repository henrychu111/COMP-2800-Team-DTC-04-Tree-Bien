import React from "react";
import './App.css';
import { GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps";

function Map() {
  return (
    <GoogleMap defaultZoom ={10} defaultCenter = {{lat: 49.263569, lng: -123.138573}}/>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function App() {
  return (
    <div style = {{width: '100vw', height: "100vh"}}>
      <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCZGmMsYQX8uffhtpk7WC68LCnO80EE6Vw`}
        loadingElement = {<div style={{ height: "100%"}} />}
        containerElement = {<div style={{ height: "100%"}} />}
        mapElement = {<div style={{ height: "100%"}} />}
      />
    </div>
  )

}

export default App;
