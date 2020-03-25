import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Languages = ({languages}) => {
  const langs = languages.map(language => <li key={language.name}>{language.name}</li>);
  return (
    <ul>{langs}</ul>
  );
}

const Weather = ({weather}) => {
  if (!weather || Object.keys(weather).length === 0)
    return null;
  else
    return (
      <>
      <h3>Weather</h3>
      <p>{weather.weather_state_name}</p>
      <p>{weather.the_temp.toFixed(1)} &deg;C</p>
      <p>Wind: {weather.wind_speed.toFixed(1)} mph {weather.wind_direction_compass}</p>
      </>
    );
}

const DetailedCountry = ({country}) => {
  const [ weather, setWeather ] = useState({});

  useEffect(() => {
    axios
      .get('https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query='.concat(country.capital))
      .then(response => {
        if (response.data.length === 0)
          return;
        axios
          .get('https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/'.concat(response.data[0].woeid))
          .then(response => {
            if (response.data.length === 0)
              return;
            setWeather(response.data.consolidated_weather[0]);
          });
      });
  }, [country]);

  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <Languages languages={country.languages} />
      <img src={country.flag} alt={`Flag of ${country.name}`} height="70" />
      <Weather weather={weather} />
    </div>
  );
}

const Country = ({country, showHandleClick, showDetailed}) => {
  if (showDetailed === country.name)
    return (
      <DetailedCountry country={country} />
    );
  return (
    <div>
      {country.name}
      <button id={country.name} onClick={showHandleClick}>
        show
      </button>
    </div>
  );
}

const Countries = ({countries, showHandleClick, showDetailed}) => {
  if (countries.length > 10)
    return (<div>Too many matches, specify another filter</div>);
  else if (countries.length > 1)
    return countries.map(country => <Country country={country} showHandleClick={showHandleClick} key={country.alpha3Code} showDetailed={showDetailed} />);
  else if (countries.length === 1)
    return <DetailedCountry country={countries[0]} />
  return null;
}

function App() {
  const [ countries, setCountries ] = useState([]);
  const [ searchString, setSearchString ] = useState('');
  const [ showDetailed, setShowDetailed ] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, []);

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchString.toLowerCase())
  );

  const showHandleClick = event => {
    setShowDetailed(event.target.id);
  }
  const searchHandleChange = event => {
    setSearchString(event.target.value);
    setShowDetailed('');
  }

  return (
    <div>
      <div>
        find countries
        <input value={searchString} onChange={searchHandleChange} />
      </div>
      <Countries
        countries={filteredCountries}
        showHandleClick={showHandleClick}
        showDetailed={showDetailed}
      />
    </div>
  );
}

export default App;
