import React, { useState, useEffect } from 'react'
import service from './service'
import './index.css'

const Notification = (props) => {
  if (props.content === '') {
    return <></>
  } else if (props.error) {
    return <div className="error">{props.content}</div>
  } else {
    return <div className="message">{props.content}</div>
  }
}

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
  const [ notification, setNotification ] = useState('')
  const [ error, setError ] = useState(false)

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
        .catch(error => {
          setError(true)
          setNotification(`Information of ${selectedPerson.name} has already been removed`)
          setTimeout(() => {
            setNotification('') 
            setError(false)
          },3000)
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

  const updateEntry = (updatedPerson) => {
    if (window.confirm(`${updatedPerson.name} is already added to the phonebook, replace old number with a new one?`)) {
      let updateEntry = persons.filter(person => person.name === updatedPerson.name)[0]
      updatedPerson.id = updateEntry.id
      service.update(updatedPerson)
    }
  }

  const createEntry = (person) => {
    setPersons(persons.concat(person))
    service.create(person)
    setNotification(`Added ${person.name}`)
    setTimeout(() => setNotification(''), 3000)
  }

  const addEntry = (event) => {
    const person = {name: newName, number: newNumber}
    event.preventDefault()
    nameExists() ? updateEntry(person) : createEntry(person)
    setNewName('')
    setNewNumber('')
    setSearch('')
  }

  const matchingPersons = persons.filter(person => person.name.toUpperCase().includes(search.toUpperCase()))
  const personsToList = search ? matchingPersons : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification content={notification} error={error}/>
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
