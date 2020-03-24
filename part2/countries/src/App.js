import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Languages = ({languages}) => {
  const langs = languages.map(language => <li key={language.name}>{language.name}</li>);
  return (
    <ul>{langs}</ul>
  );
}

const DetailedCountry = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <Languages languages={country.languages} />
      <img src={country.flag} alt={`Flag of ${country.name}`} height="70" />
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
