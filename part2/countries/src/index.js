import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

const Language = props => {
  return (
    <li>{props.language.name}</li>
  )
}

const Languages = (props) => {
  const language_components = props.languages.map((language) => <Language language={language} key={language.name}/>)
  return (
    <ul>
      {language_components}
    </ul>
  )
}

const CountryDetails = (props) => {
  return (
    <>
      <h1>{props.country.name}</h1>
      <p>capital {props.country.capital}</p>
      <p>population {props.country.population}</p>
      <b><h2>languages</h2></b>
      <Languages languages={props.country.languages}/>
      <img src={props.country.flag} height="110" width="180"/>
    </>
  )
}

const Country = (props) => {
  return (
    <>
      <p>{props.country.name}<button onClick={() => props.handleShow(props.country.name)}>show</button></p>
    </>
  )
}

const Countries = (props) => {
  if (props.countries.length > 20) { 
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (props.countries.length === 1) {
    return (
      <CountryDetails country={props.countries[0]}/>
    )
  } else {
    return (
      props.countries.map((country) => <Country key={country.name} country={country} handleShow={props.handleShow}/>)
    )
  }
  
}

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ search, setSearch ] = useState('')

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleShow = (name) => {
    setSearch(name)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
          setCountries(response.data)
      })
    }, 
  [])

  const filteredCountries = countries.filter(country => country.name.toUpperCase().includes(search.toUpperCase()))
  return (
    <div>
      find countries:  <input value={search} onChange={handleSearchChange} />
      <Countries countries={filteredCountries} handleShow={handleShow}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
