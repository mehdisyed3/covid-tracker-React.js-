import React from "react";
import { Map as MapLeafletContainer, TileLayer } from "react-leaflet";
import "./Map.css";
//  import { showDataOnMap } from "./util";



function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      I AM MAAP
      <MapLeafletContainer center={center} zoom={zoom} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* {showDataOnMap(countries, casesType)} */}
      </MapLeafletContainer>
      
    </div>
  );
}

export default Map ;