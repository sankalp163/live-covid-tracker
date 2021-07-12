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
import "./App.css";

function App() {
  //useState hook
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});

  

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
      countryCode === "Worldwide"
        ? "https://https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true`;

      console.log(url);
      console.log(countryCode);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  console.log(countryInfo);
 
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
              <MenuItem value="Worldwide">Worldwide</MenuItem>

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
            title="CoronaVirus Cases"
            cases={countryInfo.todayCases}
            totalCases={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            totalCases={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            totalCases={countryInfo.deaths}
          />
        </div>

        {/* Map */}

        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          {/*Tavle*/}
          <h3>Live cases by country</h3>
          {/*Graph*/}
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
