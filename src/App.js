import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
import { sortData, prettyStats } from "./utility";
import "./App.css";
import "leaflet/dist/leaflet.css";

function App() {
  //useState hooks
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  //API for worldwide data - https://https://disease.sh/v3/covid-19/all
  //This hook is to ensure that our page loads with the worldwide stats.
  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/all`)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    /*The code here will run when the component loads or when
    the variable we pass gets changes or updated*/

    //now we create an async function make an API request

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => {
            return {
              name: country.country,
              value: country.countryInfo.iso2,
            };
          });

          setCountries(countries);
          //We are getting the entire data since we want the countries to get sorted according to cases.
          const sortedData = sortData(data); //sorted array received using sortData function (from utility file created by us)
          setTableData(sortedData);
          setMapCountries(data);
        });
    };

    getCountriesData();
  }, []);

  //To update the country name in dropdown menu once its clicked
  const onCountryChange = (event) => {
    const countryCode = event.target.value;

    //API for worldwide data - https://https://disease.sh/v3/covid-19/all
    //API for specific country data - https://https://disease.sh/v3/covid-19/countries/COUNTRY_CODE

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true`;

    console.log(url);
    console.log(countryCode);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        
        countryCode === "worldwide"
          ? setMapCenter([34.80746, -40.4796])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        countryCode === "worldwide" ? setMapZoom(3) : setMapZoom(4);
      });
  };


  //API for getting all countries -https://disease.sh/v3/covid-19/countries

  //useEffect - runs a piece of code based on a given condition

  return (
    /*Structure */

    /*Header*/
    /*Title and dropdown of country names*/

    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Live Covid-19 Tracker </h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">worldwide</MenuItem>

              {countries.map((country) => {
                return (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        {/*Info box */}

        <div className="app__stats">
          <InfoBox
            onClick={e => setCasesType("cases")}
            title="CoronaVirus Cases"
            cases={prettyStats(countryInfo.todayCases)}
            totalCases={prettyStats(countryInfo.cases)}
          />
          <InfoBox
            onClick={e => setCasesType("recovered")}
            title="Recovered"
            cases={prettyStats(countryInfo.todayRecovered)}
            totalCases={prettyStats(countryInfo.recovered)}
          />
          <InfoBox
            onClick={e => setCasesType("deaths")}
            title="Deaths"
            cases={prettyStats(countryInfo.todayDeaths)}
            totalCases={prettyStats(countryInfo.deaths)}
          />
        </div>

        {/* Map */}

        <Map casesType={casesType} countries ={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className="app__right">
        <CardContent>
          {/*Table*/}
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          {/*Graph*/}
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
