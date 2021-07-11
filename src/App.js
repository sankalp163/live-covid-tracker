import React, {useState, useEffect} from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import './App.css';

function App() {
  //useState hook
  const [countries, setCountries] = useState ([]);
  const [country, setCountry] = useState('Worldwide');

  //To update the country name in dropdown menu once its clicked
  function onCountryChange(event) {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }
  //API for getting all countries -https://disease.sh/v3/covid-19/countries

  //useEffect - runs a piece of code based on a given condition

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
            value: country.countryInfo.iso2
          };
        });

        setCountries(countries);
      });
    };

    getCountriesData();
  }, [])

  return (
    <div className="App">
      <div className="app_header">
        <h1>Live Covid-19 Tracker </h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="Worldwide">Worldwide</MenuItem>

            {countries.map((country) => {
             return <MenuItem value={country.value}>{country.name}</MenuItem>
            })}
          
          </Select>
        </FormControl>

      </div>
    {/*Structure */}

    {/*Header*/}
    {/*Title and dropdown of country names*/}
    
    {/*Info box */}
    {/*Info Box */}
    {/*Info box */}

    {/*sidebar(Table) */}
    {/* sidebar(Graph*/}

    {/*Map */}

    </div>
  );
}

export default App;
