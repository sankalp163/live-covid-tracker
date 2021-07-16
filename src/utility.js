import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    rgb: "rgb(0, 0, 255)",
    multiplier: 160,
  },
  recovered: {
    rgb: "rgb(125, 200, 29)",
    multiplier: 200,
  },
  deaths: {
    rgb: "rgb(255, 0, 0)",
    multiplier: 800,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

//To make the numbers pretty
export const prettyStats = (stat) =>     
    stat? `+${numeral(stat).format("0.0a")}`:"+0";


//For drawing circles on the map with interactive tooltips
export const showDataMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].rgb}
      fillColor={casesTypeColors[casesType].rgb}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
