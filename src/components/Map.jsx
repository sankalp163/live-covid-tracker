import React from "react";
import { Map as LeafletMap, TileLayer, Marker } from "react-leaflet";
import "../styles/Map.css";
//import { showDataOnMap } from "./util";

function Map({ center, zoom }) {

  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center} />
      </LeafletMap>
    </div>
  );
}

export default Map;
