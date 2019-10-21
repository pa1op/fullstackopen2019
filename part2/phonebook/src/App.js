import React, { useState, useEffect } from 'react'
import service from './service'

const Person = (props) => {
  return <p>{props.person.name} {props.person.number}<button onClick={() => { props.handleDelete(props.person) }} >delete</button></p>
}

const Persons = (props) => {
  return (
    props.personsToList.map((person) => <Person key={person.name} person={person} handleDelete={props.handleDelete}/>)
  )
}

const Filter = (props) => {
  return (
    <p>filter shown name <input value={props.search} onChange={props.handleSearchChange}/></p>
  )
}

const PersonForm = (props) => {
  return (
    <>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange} />
      <br/>
      number: <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
</>
)
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value) 
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleDelete = (selectedPerson) => {
    if (window.confirm("Delete " + selectedPerson.name + "?")) {
      service.remove(selectedPerson)
        .then(() => {
          setPersons(persons.filter(person => person.id !== selectedPerson.id))
      })
    }
  }

  const nameExists = () => {
    const oldNamesList = persons.map((person)=> person.name)
    return oldNamesList.includes(newName)
  }

  useEffect(() => {
    service.getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const addEntry = (event) => {
    const person = {name: newName, number: newNumber}
    event.preventDefault()
    nameExists() ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(person))
    service.create(person)
    setNewName('')
    setNewNumber('')
    setSearch('')
  }

  const matchingPersons = persons.filter(person => person.name.toUpperCase().includes(search.toUpperCase()))
  const personsToList = search ? matchingPersons : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} handleSearchChange={handleSearchChange}/>
      <h2>add a new</h2>
      <form onSubmit={addEntry}>
        <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      </form>
      <h2>Numbers</h2>
      <Persons personsToList={personsToList} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
