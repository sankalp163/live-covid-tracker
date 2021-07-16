import React from "react";
import { Map as LeafletMap, TileLayer} from "react-leaflet";
import "../styles/Map.css";
import { showDataMap } from "../utility";
//import { showDataOnMap } from "./util";

function Map({ casesType, countries, center, zoom }) {

  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

      {showDataMap(countries, casesType )}
      </LeafletMap>
    </div>
  );
}

export default Map;
